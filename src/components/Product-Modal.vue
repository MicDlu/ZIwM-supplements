<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
      <div class="modal-content">

        <div class="box">
          <div class="title">
            <h1>Product</h1>
          </div>

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input v-model="entry.fields.name" class="input" type="text" placeholder="Name">
            </div>
          </div>

          <!-- <div class="field">
            <label class="label">Producer</label>
            <div class="control">
              <input v-model="entry.fields.producer" class="input" type="text" placeholder="Producer">
            </div>
          </div> -->

          <div class="field">
            <label class="label">Producer</label>
            <div class="control">
              <multiselect
                v-model="entry.fields.producer"
                :options="producers"
                :searchable="true"
                track-by="key"
                label="name">
              </multiselect>
            </div>
          </div>

          <div class="field">
            <label class="label">Code</label>
            <div class="control">
              <input v-model="entry.fields.code" class="input" type="text" placeholder="Code">
            </div>
          </div>

          <div class="field">
            <label class="label">Ingredients</label>
            <div class="control">
              <ingredients
                :isActivated="isActivated"
                :product="entry">
              </ingredients>
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
import ingredients from './List-Ingredients'
import Multiselect from 'vue-multiselect'
import { db } from '../firebase'


export default {
  name: 'product-modal',
  components: {ingredients, Multiselect},
  props: {
    isActivated: false,
    mode: {
      new: false,
      edit: false
    },
    entry: {
      key: '',
      fields: {
        name: '',
        producer: '',
        code: ''
      },
      ingredients: null
    }
  },
  created () {
    this.GetProducersFromDB()
  },
  data () {
    return {
      isActive: this.isActivated,
      producers: [],
      selected: null
    }
  },
  methods: {
    GetProducersFromDB() {
      db.ref('Producers').on('value', (snapshot) => {
        var data = snapshot.val()
        for (let key in data){
          var sub = {
            name: data[key].name,
            key: key
          };
          this.producers.push(sub);
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
