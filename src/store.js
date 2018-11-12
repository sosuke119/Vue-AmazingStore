import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    currentChannel: null
  },
  mutations: {
    SET_USER (state, user) {
      state.currentUser = user
    },
    SET_CURRENT_CHANNEL (state, channel) {
      state.currentChannel = channel
    }
  },
  actions: {
    setUser (state, user) {
      state.commit('SET_USER', user)
    },
    setCurrentChannel (state, channel) {
      state.commit('SET_CURRENT_CHANNEL', channel)
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    currentChannel: state => state.currentChannel
  }
})
