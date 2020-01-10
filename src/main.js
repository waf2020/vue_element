import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios'
// Vue.prototype.$axios = axios;
//网络封装请求
import '../src/network/network.js'

import './assets/iconfont/iconfont.css'


Vue.config.productionTip = false


//全局css样式
import './assets/css/normalize.css'

// 全局element-ui组件

import './components/plugin/element.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
