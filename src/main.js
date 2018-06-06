import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Routes from './Routes'


Vue.use(Router);

const router = new Router({
  routes: Routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
