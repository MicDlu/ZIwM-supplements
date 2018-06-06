<template>
  <multiselect
    v-model="product.ingredients"
    :options="substances"
    :multiple="true"
    :close-on-select="false"
    :searchable="true"
    :hide-selected="false"
    track-by="key"
    label="name">
  </multiselect>
</template>

<script>
import { db } from '../firebase'
import Multiselect from 'vue-multiselect'

 export default {
  name: 'list-ingredients',
  components: { Multiselect },
  props: {
    product: {}
  },
  data () {
    return {
      selected: [],
      substances: []
    }
  },
  created() {
    this.GetSubstancesFromDB();
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
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
