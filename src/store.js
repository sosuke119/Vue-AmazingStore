import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    SET_USER (state, user) {
      state.currentUser = user
    }
  },
  actions: {
    setUser (state, user) {
      state.commit('SET_USER', user)
    }
  },
  getters: {
    currentUser: state => state.currentUser
  }
})
