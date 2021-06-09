import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueRouter from 'vue-router'
import router from './router/index'
Vue.prototype.axios = axios

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
