<template lang="pug">
div
  .mt-3.mb-5.message
    div(v-for="message in messages")
      .media
        img.align-self-start.mr-3(:src="message.user.avatar" height="50")
        .media-body
          h6.mt-0
            a(href="#") {{ message.user.name }}
            | {{ message.timestamp | fromNow}}
          p(:class="{'self_message': selfMessage(message.user)}") {{ message.content }}

</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'single-message',
  props: ['messages'],
  methods: {
    selfMessage (user) {
      return user.id === this.currentUser.uid
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  filters: {
    fromNow (value) {
      return moment(value).fromNow()
    }
  }
}
</script>
<style lang="stylus" scoped>
.media-body
  a
    margin-right 5px
.self_message
  padding 0 10px
</style>
