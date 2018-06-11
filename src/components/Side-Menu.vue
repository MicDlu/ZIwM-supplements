<template>
  <aside class="menu">
    <p class="menu-label">
      Lists
    </p>
    <ul class="menu-list">
      <li>
        <router-link to='/products'>
          <icon name="medkit"></icon>
          Products
        </router-link>
      </li>
      <li>
        <router-link to='/producers'>
          <icon name="industry"></icon>
          Producers
        </router-link>
      </li>
      <li>
        <router-link to='/substances'>
          <icon name="list-alt"></icon>
          Substances
        </router-link>
      </li>
      <li>
        <router-link to='/symptoms'>
          <icon name="heartbeat"></icon>
          Symptoms
        </router-link>
      </li>
    </ul>
    <p class="menu-label">
      Relations
    </p>
    <ul class="menu-list">
      <li>
        <router-link to='/conflicts'>
          <icon name="exclamation-triangle"></icon>
          Conflicts
        </router-link>
      </li>
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
