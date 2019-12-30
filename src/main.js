import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
