<template>
  <div>
    <pageHeader
      @modalNew="Modal_New">>
      <icon slot="title" name="medkit" scale="2"></icon>
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
            <td>{{dbEntry.name}}</td>
            <td v-if="dbEntry.producer">{{dbEntry.producer.name}}</td>
            <td v-else>-</td>
            <td>{{dbEntry.code}}</td>
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
import modal from '../components/Product-Modal'
import pageHeader from '../components/page-header'
import pageTable from '../components/page-table'

export default {
  name: 'products',
  components: {pageHeader, pageTable, modal},
  data () {
    return {
      page: {
        title: 'Products',
        subtitle: 'List of registered supplements',
        columns: ['Name','Producer','Code']
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
          producer: '',
          code: ''
        },
        ingredients: null
      }
    }
  },
  created() {
    this.dbRoot = db.ref();
    this.dbRef = db.ref('Products');
    this.FillTableFromDB();
  },
  methods: {
    Modal_New() {
      this.modal.active=true;
      this.modal.mode.new=true;
      this.dbEntry.fields= {
        name: '',
        producer: '',
        code: ''
      },
      this.dbEntry.key = this.dbRoot.child('products').push().key;
      this.dbEntry.ingredients=[]
    },
    Modal_Edit(entry, key) {
      this.modal.active=true;
      this.modal.mode.edit=true;
      this.dbEntry.fields=entry;
      this.dbEntry.key = key;
      this.GetIngredientsFromDB(key)
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
    GetIngredientsFromDB(entryKey) {
      this.dbRoot.child('Ingredients').child(entryKey).once('value', (snapshot) => {
        //this.dbEntry.ingredients = snapshot.val()
        var obj = snapshot.val()
        var arr = [];
        for (let key in obj){
          var element = {
            name: obj[key],
            key: key
          };
          arr.push(element);
        }
        this.dbEntry.ingredients = arr
      });

    },
    Entry_New() {
      this.Entry_Edit()
    },
    Entry_Remove() {
      var updates = {};
      updates['/Products/' + this.dbEntry.key] = null
      updates['/Ingredients/' + this.dbEntry.key] = null
      this.dbRoot.update(updates);
      this.Modal_Close()
    },
    Entry_Edit() {
      var updates = {};
      updates['/Products/' + this.dbEntry.key] = this.dbEntry.fields
      updates['/Ingredients/' + this.dbEntry.key] = this.changeIngredients(this.dbEntry.ingredients)
      this.dbRoot.update(updates);
      this.Modal_Close()
    },
    changeIngredients(value) {
      var collection = {};
      for (let el in value) {
        collection[value[el].key] = value[el].name;
      }
      return collection
    }
  }
}
</script>

<style>

</style>
