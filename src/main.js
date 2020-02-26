import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/network/network.js'





//引入字体图标的css
import './assets/iconfont/iconfont.css'


Vue.config.productionTip = false


//全局css样式
import './assets/css/normalize.css'
import './assets/css/main.css'

// 全局element-ui组件
//挨个导入element-ui组件太麻烦，直接一次导入把
//import './components/plugin/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入树状表格
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
