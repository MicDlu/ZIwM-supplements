<template>
  <div class="fullsize">
    <sidemenu class="sidemenu"></sidemenu>
    <router-view class="app-content"></router-view>
  </div>
</template>

<script>
import sidemenu from './components/Side-Menu';

export default {
  name: 'app',
  components: {sidemenu},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
@import './../node_modules/bulma/css/bulma.css';
.app-content {
  margin-left: 200px;
}
.fullsize {
  position: fixed;
  height: 100%;
  width: 100%;
}
.sidemenu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px 15px 50px;
  width: 200px;
  min-width: 45px;
  max-height: 100vh;
  height: 100%;
  z-index: 1024 - 1;
  color: #eee;
  background-color: hsl(0, 0%, 85%);
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
