import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueRouter from 'vue-router'
import router from './router/index'
import ECharts from 'vue-echarts';
import 'echarts';
Vue.prototype.axios = axios

Vue.use(VueRouter)



Vue.config.productionTip = false
Vue.component('chart', ECharts)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
