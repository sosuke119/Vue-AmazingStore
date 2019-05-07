<template lang="pug">
  .navbar
    .container
      //- mobile
      .navbar-mobile.w-100
        .dib
          i.fas.fa-bars.dib(@click="navbar = !navbar")
          h4.ml-3.dib Face
        .dib.float-right.mt-1.navbar-mobile-search
          i.fas.fa-search(data-toggle='modal', data-target='#exampleModal')
          #exampleModal.modal.fade.mt-4(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
            .modal-dialog(role='document')
              .modal-content
                .modal-body
                  input.search(type="text" placeholder="Search for anything" v-model="searchItem")
                  .dib.float-right
                    button.btn.mr-2(type='button' style="background:#f8cb00;color:white" @click="getSearch", data-dismiss='modal') Search
      //- mobile toggle
      .navbar-mobile-toggle(v-if="navbar")
        .container
          .navbar-mobile-toggle-bar
            i.fas.fa-times.dib(@click="navbar = !navbar")
            h4.ml-3.dib Select Category
            ul(style="margin-top:100px")
              li.category-title FACE
                span.arrow
                ul.in-sidebar
                  li
                    a(href='#' @click="MobileNav") Creams & gels
                  li
                    a(href='#' @click="MobileNav") Emulsions
                  li
                    a(href='#' @click="MobileNav") Toners
              li.category-title BODY
                span.arrow
                ul.in-sidebar
                  li
                    a(href='#' @click="MobileNav") Wash
                  li
                    a(href='#' @click="MobileNav") Oil
                  li
                    a(href='#' @click="MobileNav") Glide
              li.category-title FOOT
                span.arrow
                ul.in-sidebar
                  li
                    a(href='#' @click="MobileNav") Creams
                  li
                    a(href='#' @click="MobileNav") Mask
              li.category-title HANDS
                span.arrow
                ul.in-sidebar
                  li
                    a(href='#' @click="MobileNav") Soap
                  li
                    a(href='#' @click="MobileNav") Lotions
              li.category-title(v-if='!this.currentUser' @click="MobilegoogleLogin") Login
              li.category-title(v-else @click="MobilegoogleLogin") My Account
      //- web
      .navbar-web.w-100.mt-4
        .row.pt-2
          .col-lg-3
            h4 AmazingStore
          .col-lg-3
            i.fas.fa-map-marker-alt.dib
            p.dib.ml-2 My City: Taiwan
          .col-lg-3
            i.fas.fa-phone.dib
            p.dib.ml-2 0902 - 223 - 720
          .col-lg-3
            div.float-right
              a.ml-4(v-if='!this.currentUser', href='' , data-toggle='modal', data-target='#login') Login {{currentUser}}
                #login.modal.fade(tabindex='-1', role='dialog', aria-labelledby='loginTitle', aria-hidden='true')
                  .modal-dialog.modal-dialog-centered(role='document')
                    .modal-content
                      img(src="../../assets/images/bg-login.png" @click="googleLogin" data-dismiss="modal")
              a.ml-4(v-else, href='') My Account
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase/app'
import db from '../../db/firebaseInit'
import $ from 'jquery'
export default {
  data () {
    return {
      searchItem: '',
      navbar: false
    }
  },
  updated () {
    // mobile-toggle
    let tmp = null
    $('.category-title').click(function () {
      $(tmp).children('ul').slideUp().end().children('.arrow').removeClass('arrow-up')
      $(this).children('ul').slideToggle().end().children('.arrow').addClass('arrow-up')
      tmp = this
    })
    $('.category-title > ul').click(function () {
      return false // 阻止事件冒泡
    })
    // mobile-toggle-active
    $('.category-title').click(function () {
      $('.category-title').removeClass('active')
      $(this).addClass('active')
    })
  },
  methods: {
    getSearch () {
      // 1.篩選posts
      let filteredItems = this.currentFilterPosts.filter(post => {
        return (post.title + '').toUpperCase().match(this.searchItem.toUpperCase())
      })
      // 2.清空posts
      this.$store.dispatch('setPosts', [])
      // 3.篩選完的.currentPosts push
      filteredItems.forEach(item => {
        this.currentPosts.push(item)
      })
    },
    MobileNav (event) {
      let posts = []
      // 關閉Mobile navbar
      setTimeout(() => {
        this.navbar = !this.navbar
      }, 500)
      // 取得Nav text
      this.category = event.target.innerText
      this.$store.dispatch('setPosts', []) // 清空 posts list
      // 刷新 post list
      db.collection('posts').where('category', '==', this.category).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.data().post_id,
            'title': doc.data().title,
            'description': doc.data().description,
            'photoUrl': doc.data().photoUrl,
            'cost': doc.data().cost,
            'ml': doc.data().ml,
            'sale': doc.data().sale,
            'category': doc.data().category
          }
          posts.push(data)
        })
        this.$store.dispatch('setPosts', posts)
      })
    },
    MobilegoogleLogin () {
      let self = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        self.navbar = !self.navbar
        // Vuex setUser
        self.$store.dispatch('setUser', result.user.displayName)
      }).catch(function (error) {
        console.log('login error' + error)
        console.log(error)
      })
    },
    googleLogin () {
      let self = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // - Vuex SetUser
        self.$store.dispatch('setUser', result.user.displayName)
      }).catch(function (error) {
        console.log('login error' + error)
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentPosts', 'currentFilterPosts'])
  }
}
</script>
