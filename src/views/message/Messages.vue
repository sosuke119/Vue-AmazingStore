<template lang="pug">
div
  SingleMessage(:messages='messages')
  MessageForm
</template>
<script>
/* eslint-disable */
import SingleMessage from './SingleMessage'
import MessageForm from './MessageForm'
// import database from 'firebase/database'
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
export default {
  name: 'message',
  components: {
    SingleMessage, MessageForm
  },
  data () {
    return {
      messageRef: firebase.database().ref('messages'),
      messages: [],
      channel: ''
    }
  },
  methods: {
    addListeners () {
      // listen to child added events on current channel
      this.messageRef.child(this.currentChannel.id).on('child_added', snapshot => {
        this.messages.push(snapshot.val())
        this.$nextTick(() => {
          $('html, body').scrollTop($(document).height())
        })
      })
    },
    detachListeners () {
      if (this.channel !== null) {
        this.messageRef.child(this.channel.id).off()
      }
    }
  },
  computed: {
    ...mapGetters(['currentChannel'])
  },
  watch: {
    currentChannel () {
      
      // if current channel changes, watch for its message
      this.message = []
      this.addListeners()
      this.channel = this.currentChannel
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>
