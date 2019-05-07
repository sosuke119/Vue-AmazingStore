import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    posts: [],
    filterposts: []
  },
  mutations: {
    SET_USER (state, user) {
      state.currentUser = user
    },
    SET_POSTS (state, post) {
      state.posts = post
    },
    SET_FILTERPOSTS (state, post) {
      state.filterposts = post
    }
  },
  actions: {
    setUser (state, user) {
      state.commit('SET_USER', user)
    },
    setPosts (state, posts) {
      state.commit('SET_POSTS', posts)
    },
    setFilterPosts (state, posts) {
      state.commit('SET_FILTERPOSTS', posts)
    }
  },
  getters: {
    currentUser: state => state.currentUser,
    currentPosts: state => state.posts,
    currentFilterPosts: state => state.filterposts
  }
})
