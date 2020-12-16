import Vue from 'vue'
import store from './store'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import VueRouter from 'vue-router'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.component('Paginate', Paginate)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

