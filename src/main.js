import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/css/main.styl'
require('firebase/auth')

Vue.use(VueLazyload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
