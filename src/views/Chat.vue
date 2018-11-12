<template lang="pug">
div
  .container-fluid
    .row
      //- Sidebar
      .col-md-2.sidebar
        div
          span
            img.rounded-circle.mr-2(:src="currentUser.photoURL", alt="", height="30")
            span.text-light {{ currentUser.displayName }}
          hr(style="border: 1px solid #333;")
          // Button trigger modal
          button.btn.btn-add(type='button', data-toggle='modal', data-target='#exampleModal') Add Channel
          hr(style="border: 1px solid #333;")
          .mt-4
            p.c-fff Channel
            ul.pl-0(style="background:#2c2944;")
              li.mb-2.c-gray(v-for="channel in channels", :class="{'active': setActiveChannel(channel)}", @click="changeChannel(channel)") {{channel.name}}
          hr(style="border: 1px solid #333;")
          .mt-4
            User
          hr(style="border: 1px solid #333;")
          button.btn.btn-outline-light(@click="logout") Login Out
      //- Message
      .col-md-10.content
        Message
    //- Modal
    #exampleModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Add Channel
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            form
              .form-group
                input#new_channel.form-control(v-model='new_channel', type='text', name='new_channel', placeholder='Channel name')
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') Cancle
            button.btn.btn-primary(type='button', @click="addChannel") Add Channel
</template>
<script>
// eslint-disable-next-line
import database from 'firebase/database'
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
import Message from './message/Messages'
import User from './user/User'
export default {
  name: 'Chat',
  components: {
    Message, User
  },
  data () {
    return {
      new_channel: '',
      errors: [],
      channelsRef: firebase.database().ref('channels'),
      channels: [],
      channel: null,
      presenceRef: firebase.database().ref('presence')
    }
  },
  mounted () {
    this.addListeners()
  },
  computed: {
    ...mapGetters(['currentUser', 'currentChannel']),
    hasErrors () {
      return this.errors.length > 0
    }
  },
  methods: {
    logout () {
      this.presenceRef.child(this.currentUser.uid).remove()
      firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    },
    addChannel () {
      this.errors = []
      let key = this.channelsRef.push().key
      console.log('newly creating channel key: ', key)
      let newChannel = { id: key, name: this.new_channel }
      this.channelsRef.child(key).update(newChannel).then(() => {
        this.new_channel = ''
        // eslint-disable-next-line
        $('#exampleModal').modal('hide')
      }).catch((error) => {
        this.errors.push(error.message)
        // eslint-disable-next-line
        $('#exampleModal').modal('hide')
      })
    },
    addListeners () {
      console.log('addListeners On')
      this.channelsRef.on('child_added', snapshot => {
        // console.log('listening channelsRef on child_added: ', snapshot.val())
        this.channels.push(snapshot.val())
        // set current channel
        if (this.channels.length > 0) {
          // set the first one as current channel
          this.channel = this.channels[0]
          this.$store.dispatch('setCurrentChannel', this.channel)
        }
      })
    },
    setActiveChannel (channel) {
      return channel.id === this.currentChannel.id
    },
    changeChannel (channel) {
      // eslint-disable-next-line
      $('.message').text('')
      this.$store.dispatch('setCurrentChannel', channel)
    },
    datachListeners () {
      this.channelsRef.off()
    }
  },
  beforeDestory () {
    this.datachListeners()
  }
}
</script>
<style lang="stylus" scoped>
.c-fff
  color #fff
.c-gray
  color gray
.sidebar
  position fixed
  display block
  float left
  height 100%
  background #2C2944
  padding-top 2em
  overflow-y hidden
  z-index 10
.content
  width 100%
  right 0
  display block
  float right
  padding-left 18%
.btn-add
  background none
  border 1px solid white
  color white
.active
  color white
  font-size 20px
  font-weight bold
li
  list-style none
  cursor pointer
</style>
