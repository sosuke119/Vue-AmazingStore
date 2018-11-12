<template lang="pug">
div
  // Button trigger modal
  button.btn.btn-primary(type='button', data-toggle='modal', data-target='#exampleModal') Add Channel

  .mt-4
    button.list-group-item.list-group-item-action(type='button')
  // Modal
  #exampleModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
    .modal-dialog(role='document')
      .modal-content
        .modal-header
          h5#exampleModalLabel.modal-title Modal title
          button.close(type='button', data-dismiss='modal', aria-label='Close')
            span(aria-hidden='true') ×
        .modal-body
          | ...
        .modal-footer
          button.btn.btn-secondary(type='button', data-dismiss='modal') Cancle
          button.btn.btn-primary(type='button') Add Channel

</template>
<script>
import $ from 'jquery'
// eslint-disable-next-line
import database from 'firebase/database'
import firebase from 'firebase/app'
export default {
  name: 'channels',
  data () {
    return {
      new_channel: '',
      errors: [],
      channelRef: firebase.database().ref('channels')
    }
  },
  methods: {
    addChannel () {
      this.errors = []
      let key = this.channelRef.push().key
      console.log('newly creating channel key: ', key)
      let newChannel = { id: key, name: this.new_channel }
      this.channelsRef.child(key).update(newChannel).then(() => {
        this.new_channel = ''
        $('#channelModal').modal('hide')
      }).catch((error) => {
        this.errors.push(error.message)
      })
    }
  },
  computed: {
    hasErrors () {
      return this.errors.length > 0
    }
  }
}
</script>
