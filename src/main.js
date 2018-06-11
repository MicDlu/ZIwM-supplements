import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Routes from './Routes'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.use(Router);
Vue.component('icon', Icon)

const router = new Router({
  routes: Routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
