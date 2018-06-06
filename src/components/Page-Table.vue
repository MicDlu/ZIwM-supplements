<template>
  <div>
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th v-for="(column) in page.columns">{{column}}</th>
        </tr>
      </thead>
      <tbody style="cursor: pointer">
        <tr
        v-for="(dbEntry, index) in dbEntries"
        @click="$emit('modalEdit', dbEntry, index)">
          <td v-for="(record) in dbEntry">{{record}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'page-table',
  props: {
    page: {},
    dbEntries: {}
  },
  data () {
    return {
      }
    }
  }
</script>

<style>

</style>
