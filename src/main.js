import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase/app'
// eslint-disable-next-line
import auth from 'firebase/auth'

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyBx_5ACm2ZPXpAtaNt5jIKUsWCRJ5WGlXg',
  authDomain: 'vuexslack-b18d4.firebaseapp.com',
  databaseURL: 'https://vuexslack-b18d4.firebaseio.com',
  projectId: 'vuexslack-b18d4',
  storageBucket: 'vuexslack-b18d4.appspot.com',
  messagingSenderId: '526928907061'
}
firebase.initializeApp(config)
window.firebase = firebase

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  // dispatch user
  store.dispatch('setUser', user)

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  // recursion - this function calls itself on auth state change
  unsubscribe()
})
