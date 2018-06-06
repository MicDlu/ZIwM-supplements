<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
      <div class="modal-content">

        <div class="box">
          <div class="title">
            <h1>Substance</h1>
          </div>

          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input v-model="entry.fields.name" class="input" type="text" placeholder="Name">
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
export default {
  name: 'substance-modal',
  props: {
    isActivated: false,
    mode: {
      new: false,
      edit: false
    },
    entry: {
      key: '',
      fields: {
        name: ''
      }
    }
  },
  created () {
  },
  data () {
    return {
      isActive: this.isActivated
    }
  },
  methods: {
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
