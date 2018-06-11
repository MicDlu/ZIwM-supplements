<template>
  <div>
    <pageHeader
      @modalNew="Modal_New">>
      <icon slot="title" name="exclamation-triangle" scale="2"></icon>
      <a slot="title"> {{page.title}}</a>
      <a slot="subtitle">{{page.subtitle}}</a>
    </pageHeader>

    <div>
      <table class="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>{{page.columns[0]}}</th>
            <th>{{page.columns[1]}}</th>
            <th>{{page.columns[2]}}</th>
          </tr>
        </thead>
        <tbody style="cursor: pointer">
          <tr
          v-for="(dbEntry, index) in dbEntries"
          @click="Modal_Edit(dbEntry, index)">
            <td>{{dbEntry.substance1.name}}</td>
            <td>{{dbEntry.substance2.name}}</td>
            <td>{{dbEntry.symptom.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <modal
      :isActivated="modal.active"
      :mode="modal.mode"
      :entry="dbEntry"
      @close="Modal_Close()"
      @new="Entry_New()"
      @edit="Entry_Edit()"
      @remove="Entry_Remove()">
    </modal>

  </div>
</template>

<script>
import { db } from '../firebase'
import modal from '../components/Conflict-Modal'
import pageHeader from '../components/page-header'

export default {
  name: 'products',
  components: {pageHeader, modal},
  data () {
    return {
      page: {
        title: 'Conflicts',
        subtitle: 'List of substances in conflict',
        columns: ['Substance 1','Substance 2','Symptom']
      },
      modal: {
        active: false,
        mode: {
          new: false,
          edit: false
        }
      },
      dbEntries: [],
      dbEntry: {
        key: '',
        fields: {
          substance1: '',
          substance2: '',
          symptom: ''
        }
      }
    }
  },
  created() {
    this.dbRoot = db.ref();
    this.FillTableFromDB();
  },
  methods: {
    Modal_New() {
      this.modal.active=true;
      this.modal.mode.new=true;
      this.dbEntry.fields= {
        substance1: '',
        substance2: '',
        symptom: ''
      },
      this.dbEntry.key = this.dbRoot.child('Conflicts').push().key;
    },
    Modal_Edit(entry, key) {
      this.modal.active=true;
      this.modal.mode.edit=true;
      this.dbEntry.fields=entry;
      this.dbEntry.key = key;
    },
    Modal_Close() {
      this.modal.active=false;
      this.modal.mode.new=false;
      this.modal.mode.edit=false;
    },
    FillTableFromDB() {
      this.dbRoot.child('Conflicts').on('value', (snapshot) => {
        this.dbEntries=snapshot.val()
      });
    },
    Entry_New() {
      this.Entry_Edit()
    },
    Entry_Remove() {
      var updates = {};
      updates['/Conflicts/' + this.dbEntry.key] = null
      this.dbRoot.update(updates);
      this.Modal_Close()
    },
    Entry_Edit() {
      var updates = {};
      updates['/Conflicts/' + this.dbEntry.key] = this.dbEntry.fields
      this.dbRoot.update(updates);
      this.Modal_Close()
    }
  }
}
</script>

<style>

</style>
