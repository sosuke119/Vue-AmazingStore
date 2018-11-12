<template lang="pug">
div
  .messageform
    div
      .input-group.mb-3
        input.form-control.mt-3#message(name="message" v-model.trim="message" placeholder="write something" @keyup.enter="sendMessage" autofocus)
        .input-group-append
          button.btn.btn-primary.mt-3(@click="sendMessage") Send
</template>
<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
export default {
  name: 'message-form',
  data () {
    return {
      message: '',
      errors: []
    }
  },
  methods: {
    sendMessage () {
      let newMessage = {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      }
      // use some validation
      if (this.currentChannel !== null) {
        if (this.message.length > 0) {
          this.$parent.messageRef.child(this.currentChannel.id).push().set(newMessage).then(() => {
            this.$nextTick(() => {
              // eslint-disable-next-line
              $('html,body').scrollTop($(document).height())
            })
          }).catch((error) => {
            this.errors.push(error.message)
          })
          this.message = ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['currentChannel', 'currentUser'])
  }
}
</script>
<style lang="stylus" scoped>
.messageform
  position fixed
  right 0
  bottom 0
  width 83.4%
  z-index 100
  color white
  text-align center
  margin-bottom -16px
  margin-left 18%
input, button
  height 50px
</style>
