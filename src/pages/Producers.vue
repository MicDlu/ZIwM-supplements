<template>
  <div>
    <pageHeader
      @modalNew="Modal_New">>
      <icon slot="title" name="industry" scale="2"></icon>
      <a slot="title"> {{page.title}}</a>
      <a slot="subtitle">{{page.subtitle}}</a>
    </pageHeader>

    <pageTable
      :page="page"
      :dbEntries="dbEntries"
      @modalEdit="Modal_Edit">
    </pageTable>

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
import modal from '../components/Producer-Modal'
import pageHeader from '../components/page-header'
import pageTable from '../components/page-table'

export default {
  name: 'producers',
  components: {pageHeader, pageTable, modal},
  data () {
    return {
      page: {
        title: 'Producers',
        subtitle: 'List of registered producers of supplements',
        columns: ['Name']
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
          name: ''
        }
      }
    }
  },
  created() {
    this.dbRef = db.ref('Producers');
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
