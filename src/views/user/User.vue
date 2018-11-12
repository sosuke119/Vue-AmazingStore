<template lang="pug">
div
  .text-light
    p.c-fff User
    ul.nav.flex-column
      li(v-for="user in users" :key="user.id")
        span
          img.img.rounded-circle.mr-2(:src="user.avatar" height="20")
          span {{ user.name }}
</template>
<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
export default {
  name: 'users',
  data () {
    return {
      users: [],
      usersRef: firebase.database().ref('users'),
      connectedRef: firebase.database().ref('.info/connected'),
      presenceRef: firebase.database().ref('presence')
    }
  },
  mounted () {
    this.addListenrs()
  },
  methods: {
    addListenrs () {
      this.usersRef.on('child_added', snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          // build user object and push to users[]
          let user = snapshot.val()
          user['uid'] = snapshot.key
          user['status'] = 'offline'
          this.users.push(user)
        }
      })
      // presenceRef child_added
      this.presenceRef.on('child_added', snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          // pass to user status methods
          this.addStatusToUser(snapshot.key)
        }
      })
      // presenceRef child_removed
      this.presenceRef.on('child_removed', snapshot => {
        if (this.currentUser.uid !== snapshot.key) {
          // pass to user status methods
          this.addStatusToUser(snapshot.key, false)
        }
      })
      // returns 'connected' to every user connected to our application
      this.connectedRef.on('value', snapshot => {
        console.log('connected user:', snapshot)
        if (snapshot.val() === true) {
          let ref = this.presenceRef.child(this.currentUser.uid)
          ref.set(true)
          ref.onDisconnect().remove()
        }
      })
    },
    // add user status online / offline
    addStatusToUser (userId, connected = true) {
      let index = this.users.findIndex(user => user.uid === userId)
      if (index !== -1) {
        connected === true ? this.users[index].status = 'online' : this.users[index].status = 'offline'
      }
    },
    isOnline (user) {
      return user.status === 'online'
    },
    datachListeners () {
      this.usersRef.off()
      this.presenceRef.off()
      this.connectedRef.off()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  beforeDestroy () {
    this.datachListeners()
  }
}
</script>
<style lang="stylus" scoped>
li
  margin-bottom 10px
</style>
