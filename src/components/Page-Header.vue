<template>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          <slot name="title">
            Title
          </slot>
          <button class="button is-rounded is-light" @click="$emit('modalNew')">New</button>
        </h1>
        <h2 class="subtitle">
          <slot name="subtitle">
            Subtitle
          </slot>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'page-header',
  data () {
    return {
      }
    }
  }
</script>

<style>

</style>
