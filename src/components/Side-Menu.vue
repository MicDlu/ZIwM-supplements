<template>
  <aside class="menu">
    <p class="menu-label">
      Lists
    </p>
    <ul class="menu-list">
      <li><router-link to='/products'>Products</router-link></li>
      <li><router-link to='/producers'>Producers</router-link></li>
      <li><router-link to='/substances'>Substances</router-link></li>
      <li><router-link to='/symptoms'>Symptoms</router-link></li>
    </ul>
    <p class="menu-label">
      Relations
    </p>
    <ul class="menu-list">
      <li><router-link to='/conflicts'>Conflicts</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'side-menu',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
