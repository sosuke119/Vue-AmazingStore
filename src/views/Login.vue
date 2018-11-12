<template lang="pug">
div
  .jumbotron.bg-primary.text-white.text-center
    h2.lead.display-3 VueSlack
    p Realtime comment
  //- show loading state
  .alert.alert-info(v-if="loading") Processing ..
  //- show errors
  .alert.alert-danger(v-if="hasErrors")
    div(v-for="error in errors") {{ error }}
  .container-fluid
    .row.mt-5
      .col.text-center
        .btn.btn-outline-danger.btn-lg(@click="loginWithGoogle") Login with Google
</template>
<script>
// eslint no-unused-vars: "database"
import firebase from 'firebase/app'
// eslint-disable-next-line
import database from 'firebase/database'
export default {
  name: 'Login',
  data () {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    }
  },
  computed: {
    hasErrors () {
      return this.errors.length > 0
    }
  },
  methods: {
    loginWithGoogle () {
      this.loading = true // loading set to true
      this.errors = [] // clear old errors
      console.log('login with google')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          this.saveUserToUsersRef(res.user) // pass user to save in db
          this.$store.dispatch('setUser', res.user)
          this.$router.push('/')
        })
        .catch(error => {
          this.errors.push(error.message)
          this.loading = false // set loading to false
        })
    },
    saveUserToUsersRef (user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
      })
    }
  }
}
</script>
<style lang="stylus">
  .btn, .jumbotron
    border-radius 0
</style>
