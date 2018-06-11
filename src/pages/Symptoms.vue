<template>
  <div>
    <pageHeader
      @modalNew="Modal_New">>
      <icon slot="title" name="heartbeat" scale="2"></icon>
      <a slot="title"> {{page.title}}</a>
      <a slot="subtitle">{{page.subtitle}}</a>
    </pageHeader>

    <div>
      <table class="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>{{page.columns[0]}}</th>
            <th>{{page.columns[1]}}</th>
          </tr>
        </thead>
        <tbody style="cursor: pointer">
          <tr
          v-for="(dbEntry, index) in dbEntries"
          @click="Modal_Edit(dbEntry, index)">
            <td>{{dbEntry.name}}</td>
            <td>{{dbEntry.description}}</td>
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
import modal from '../components/Symptom-Modal'
import pageHeader from '../components/page-header'
import pageTable from '../components/page-table'

export default {
  name: 'symptoms',
  components: {pageHeader, pageTable, modal},
  data () {
    return {
      page: {
        title: 'Symptoms',
        subtitle: 'List of registered symptoms',
        columns: ['Name', 'Description']
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
          name: '',
          description: ''
        }
      }
    }
  },
  created() {
    this.dbRef = db.ref('Symptoms');
    this.FillTableFromDB();
  },
  methods: {
    Modal_New() {
      this.modal.active=true;
      this.modal.mode.new=true;
      this.dbEntry.fields= {
        name: ''
      }
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
      this.dbRef.on('value', (snapshot) => {
        this.dbEntries=snapshot.val()
      });
    },
    Entry_New() {
      this.dbRef.push(this.dbEntry.fields);
      this.Modal_Close()
    },
    Entry_Remove() {
      this.dbRef.child(this.dbEntry.key).remove();
      this.Modal_Close()
    },
    Entry_Edit() {
      this.dbRef.child(this.dbEntry.key).update(this.dbEntry.fields);
      this.Modal_Close()
    }
  }
}
</script>

<style>

</style>
