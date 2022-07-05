import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import './assets/css/gobal.css'


// import Pages from '@/components/Conpoll/Page/Pages.vue'
// Vue.component('Pages', Pages)

import Header from './components/Conpoll/Header/Header.vue'
Vue.component('Header', Header)
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts
// import TreeTable from 'vue-table-with-tree-grid'
// Vue.component('tree-table', TreeTable)
import axios from 'axios'
Vue.use(VXETable)
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/"
// 获取token并保存
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 全局过滤器·把时间戳转换成日期格式
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
