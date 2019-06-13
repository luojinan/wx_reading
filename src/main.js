import Vue from 'vue'
import App from './App'

// 引入 store
import store from './store/index'
// Vue 挂载 store
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
