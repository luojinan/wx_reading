import Vue from 'vue'
import App from './App'
// 引入需要挂载到全局的方法
import {promisify} from '@/common/utils/promisify'

// 引入 store
import store from './store/index'
// Vue 挂载 store
Vue.prototype.$store = store
// 把工具方法挂载到全局（promisify）
Vue.prototype.$promisify = promisify

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
