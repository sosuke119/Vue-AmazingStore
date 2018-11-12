<template lang="pug">
  div
    h2.text-light #SLACK#
    hr(style="border: 1px solid #333;")
    span
      img.rounded-circle.mr-2(:src="currentUser.photoURL", alt="", height="30")
      span.text-light {{ currentUser.displayName }}
    hr(style="border: 1px solid #333;")
    channels
    hr(style="border: 1px solid #333;")
    button.btn.btn-outline-light(@click="logout") Login Out
</template>
<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
import Channels from '@/sidebar/Channels'
export default {
  name: 'Chat',
  components: {
    Channels
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    logout () {
      firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    }
  }
}
</script>
