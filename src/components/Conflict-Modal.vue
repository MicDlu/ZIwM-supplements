<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
      <div class="modal-content">

        <div class="box">
          <div class="title">
            <h1>Conflict</h1>
          </div>

          <div class="field">
            <label class="label">Substance 1</label>
            <div class="control">
              <multiselect
                v-model="entry.fields.substance1"
                :options="substances"
                :searchable="true"
                track-by="key"
                label="name">
              </multiselect>
            </div>
          </div>

          <div class="field">
            <label class="label">Substance 2</label>
            <div class="control">
              <multiselect
                v-model="entry.fields.substance2"
                :options="substances"
                :searchable="true"
                track-by="key"
                label="name">
              </multiselect>
            </div>
          </div>

          <div class="field">
            <label class="label">Substance 3</label>
            <div class="control">
              <multiselect
                v-model="entry.fields.symptom"
                :options="symptoms"
                :searchable="true"
                track-by="key"
                label="name">
              </multiselect>
            </div>
          </div>

          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea rows="3" v-model="entry.fields.description" class="textarea" type="text" placeholder="Description"></textarea>
            </div>
          </div>

          <nav class="level">
            <div class="level-left"/>
            <div class="level-right">
              <button v-if="mode.new" @click="$emit('new')" class="button level-item is-success">New</button>
              <button v-if="mode.edit" @click="$emit('edit')" class="button level-item is-success">Edit</button>
              <button v-if="mode.edit" @click="$emit('remove')" class="button level-item is-danger">Remove</button>
            </div>
          </nav>

        </div>

      </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { db } from '../firebase'


export default {
  name: 'conflict-modal',
  components: {Multiselect},
  props: {
    isActivated: false,
    mode: {
      new: false,
      edit: false
    },
    entry: {
      key: '',
      fields: {
        substance1: '',
        substance2: '',
        symptom: '',
        description: ''
      },
      ingredients: null
    }
  },
  created () {
    this.GetSubstancesFromDB()
    this.GetSymptomsFromDB()
  },
  data () {
    return {
      isActive: this.isActivated,
      substances: [],
      symptoms: []
    }
  },
  methods: {
    GetSubstancesFromDB() {
      db.ref('Substances').on('value', (snapshot) => {
        var data = snapshot.val()
        for (let key in data){
          var sub = {
            name: data[key].name,
            key: key
          };
          this.substances.push(sub);
        }
      });
    },
    GetSymptomsFromDB() {
      db.ref('Symptoms').on('value', (snapshot) => {
        var data = snapshot.val()
        for (let key in data){
          var sub = {
            name: data[key].name,
            key: key
          };
          this.symptoms.push(sub);
        }
      });
    }
  },
  watch: {
    isActivated(is) {
      this.isActive = is;
    }
  },
}
</script>

<style>

</style>
