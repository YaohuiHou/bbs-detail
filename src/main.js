import Vue from 'vue'
import App from './App'
import store from './store'
import common from './public/common.js'
import W from '../node_modules/w.js'
import truckhome from '../node_modules/truckhome-1.1.js'
Vue.mixin(common)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
