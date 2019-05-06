<template lang="pug">
div
  //- navbar
  .navbar
    .container
      //- mobile
      .navbar-mobile.w-100
        .dib
          i.fas.fa-bars.dib(@click="navbar = !navbar")
          h4.ml-3.dib Face {{ navbar }}
        .dib.float-right.mt-1.navbar-mobile-search
          i.fas.fa-search(data-toggle='modal', data-target='#exampleModal')
          #exampleModal.modal.fade.mt-4(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
            .modal-dialog(role='document')
              .modal-content
                .modal-body
                  input.search(type="text" placeholder="Search for anything" v-model="searchItem")
                  .dib.float-right
                    button.btn.mr-2(type='button' style="background:#f8cb00;color:white" @click="getSearch", data-dismiss='modal') Search
                    button.btn.btn-secondary(type='button', data-dismiss='modal') Close

          //- div(v-else, style="margin-top:-5px")
          //-   input(type="text", v-model="searchNavItem")
          //-   button.dib.btn-mobileSearch(@click="getMobileSearch") Search
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
              a.ml-4(v-if='!this.user', href='' , data-toggle='modal', data-target='#login') Login {{user}}
                #login.modal.fade(tabindex='-1', role='dialog', aria-labelledby='loginTitle', aria-hidden='true')
                  .modal-dialog.modal-dialog-centered(role='document')
                    .modal-content
                      img(src="../assets/images/bg-login.png" @click="googleLogin" data-dismiss="modal")
              a.ml-4(v-else, href='') My Account
  //- navbar Toggle
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
          li.category-title(v-if='!this.user' @click="MobilegoogleLogin") Login
          li.category-title(v-else @click="MobilegoogleLogin") My Account
  //- Main-content
  .container.zindex-sticky.main
    .row
      .col-0.col-xl-3
        .category.shadow.p-3.mb-5.bg-white.rounded
          p.fz14.c-gray.pb-2 ALL CATEGORY
          #accordionExample.accordion
            #headingOne
              h2.mb-0
                .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseOne', aria-expanded='true', aria-controls='collapseOne')
                  | FACE
            #collapseOne.collapse.show(aria-labelledby='headingOne', data-parent='#accordionExample')
              li
                a(href='#' @click="clg") Creams & gels
              li
                a(href='#' @click="clg") Emulsions
              li
                a(href='#' @click="clg") Toners
            #headingTwo
              h2.mb-0
               .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseTwo', aria-expanded='true', aria-controls='collapseTwo')
                  | BODY
            #collapseTwo.collapse(aria-labelledby='headingTwo', data-parent='#accordionExample')
              li
                a(href='#' @click="clg") Wash
              li
                a(href='#' @click="clg") Oil
              li
                a(href='#' @click="clg") Glide
            #headingThree
              h2.mb-0
                .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseThree', aria-expanded='true', aria-controls='collapseThree')
                  | FOOT
            #collapseThree.collapse(aria-labelledby='headingThree', data-parent='#accordionExample')
              li
                a(href='#' @click="clg") Creams
              li
                a(href='#' @click="clg") Mask
            #headingFour
              h2.mb-0
                .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseFour', aria-expanded='true', aria-controls='collapseFour')
                  | HAND
            #collapseFour.collapse(aria-labelledby='headingFour', data-parent='#accordionExample')
              li
                a(href='#' @click="clg") Soap
              li
                a(href='#' @click="clg") Lotions
      .col-12.col-xl-9
        //- search Bar
        .row.searchBar
          .col-lg-9
            input.search(type="text" placeholder="Search for anything" v-model="searchItem" @keyup.enter="getSearch")
            i.fas.fa-search
          .col-lg-3
            //- search Bar
            button.btn-Cart(style="padding:0")
              .brn-Cart-left.dib(style="width:70%")
                i.fas.fa-shopping-cart
                p MY CART
              .brn-Cart-right.dib(style="width:30%;height:100%;background:#393AB1")
                p {{ cart }}
        //- product Title
        .row.brand-title(style="margin-top:45px")
          .col-lg-12
            h2 {{ category }}
            div.mt-2
              p.dib.mr-5 BRAND:
                span ALL BRANDS
              p.dib.mr-5 SKIN TYPE:
                span FOR OILY SKIN
              p.dib AGE:
                span 30+
        hr.brand-line
        //- product
        .row.product
          .col-6.col-md-4.col-lg-3.mb-4(v-for="(post, index) in posts" :key="post.id" data-toggle='modal', :data-target='["#index-" + index]')
            .shadow
              img.card-img-top(v-lazy='post.photoUrl', alt='Card image cap')
              .card-body
                p.product-title.card-text.text-center
                  | {{ post.title }}
                p.card-text.text-center.mt-2.c-yellow
                  | ${{ post.cost}}
            //- Modal
            .modal.fade.bd-example-modal-lg(:id="['index-' + index]" tabindex='-1', role='dialog', aria-labelledby='myLargeModalLabel', aria-hidden='true')
              .modal-dialog.modal-lg
                .modal-content
                  .p-4
                    .float-left.modal-category
                      h5.mt-1 {{ post.category }}
                    .float-right.modal-close
                      .float-left
                        img(src="../assets/images/img-star.png", alt="")
                        p.modal-views {{ views }} views
                      i.fas.fa-times.float-right.dib
                  .row.pl-4.pr-4.pb-4
                    .col-xl-6
                      img.card-img-top(v-lazy='post.photoUrl', alt='Card image cap')
                    .col-xl-6
                      div
                        h2.mt-3 {{ post.title }}
                      .clearfix.mt-2
                        .float-left
                          p.modal-cost ${{ post.cost }}
                        .float-right
                          p.modal-ml {{ post.ml}}ml {{ currentUser }}
                      button.btn-cart(v-if='!currentUser', data-toggle='modal', data-target='#addCart') Add to cart
                      button.btn-cart(v-else, @click="addCart(index)") Add to cart
                      p.modal-description.mt-4 {{ post.description }}

                  .row.p-4
                    .p-3
                      h5.mb-4 Previews
                    .row.mb-5.p-2
                      .col-2.col-xl-2.text-center.mt-2
                        img(src="../assets/images/img-p1.png", alt="")
                      .col-10.col-xl-10.pl-4
                        h4 Julia Peterson
                        p.mt-2 My skin has always been soft. But now it feels like a babies bottom. I love it and the smell is pleasent and not strong.
                        img.mt-2(src="../assets/images/img-star.png", alt="")
                    .row.mb-5.p-2
                      .col-2.col-xl-2.text-center.mt-2
                        img(src="../assets/images/img-p1.png", alt="")
                      .col-10.col-xl-10.pl-4
                        h4 Julia Peterson
                        p.mt-2 My skin has always been soft. But now it feels like a babies bottom. I love it and the smell is pleasent and not strong.
                        img.mt-2(src="../assets/images/img-star.png", alt="")
                    .row.mb-5.p-2
                      .col-2.col-xl-2.text-center.mt-2
                        img(src="../assets/images/img-p1.png", alt="")
                      .col-10.col-xl-10.pl-4
                        h4 Julia Peterson
                        p.mt-2 My skin has always been soft. But now it feels like a babies bottom. I love it and the smell is pleasent and not strong.
                        img.mt-2(src="../assets/images/img-star.png", alt="")
            #addCart.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
              .modal-dialog(role='document')
                .modal-content
                  .modal-header
                    h5#exampleModalLabel.modal-title Notice
                    button.close(type='button', data-dismiss='modal', aria-label='Close')
                      span(aria-hidden='true') ×
                  .modal-body
                    | Please login to use the shopping cart
                  .modal-footer
                    button.btn.btn-secondary(type='button', data-dismiss='modal') Close

</template>
<script>
import db from '../db/firebaseInit'
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  data () {
    return {
      navbar: false,
      posts: [],
      filteredPosts: [],
      myCart: [],
      category: 'All',
      user: '',
      searchItem: '',
      searchNavItem: '',
      showMobileNavSearch: false
    }
  },
  created () {
    this.getPosts()
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
    addCart (id) {
      console.log(this.posts[id])
      this.myCart.push(this.posts[id])
    },
    getPosts () {
      db.collection('posts').get().then((querySnapshot) => {
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
          this.posts.push(data)
          this.filteredPosts.push(data)
        })
      })
    },
    getMobileSearch () {
      // 1.篩選posts 2.清空posts 3.篩選完的posts push
      let filteredItems = this.filteredPosts.filter(post => {
        return (post.title + '').toUpperCase().match(this.searchNavItem.toUpperCase())
      })
      this.posts = []
      filteredItems.forEach(item => {
        this.posts.push(item)
      })
    },
    getSearch () {
      // 1.篩選posts 2.清空posts 3.篩選完的posts push
      let filteredItems = this.filteredPosts.filter(post => {
        return (post.title + '').toUpperCase().match(this.searchItem.toUpperCase())
      })
      this.posts = []
      filteredItems.forEach(item => {
        this.posts.push(item)
      })
    },
    MobileNav (event) {
      // 關閉Mobile navbar
      setTimeout(() => {
        this.navbar = !this.navbar
      }, 500)

      // 取得Nav text
      console.log(event.target.innerText)
      this.category = event.target.innerText
      this.posts = [] // 清空 posts list
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
          this.posts.push(data)
        })
      })
    },
    clg (event) {
      // 取得Nav text
      console.log(event.target.innerText)
      this.category = event.target.innerText
      this.posts = [] // 清空 posts list
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
          this.posts.push(data)
        })
      })
    },
    MobilegoogleLogin () {
      let self = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        self.user = result.user.displayName
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
        self.user = result.user.displayName
        // - Vuex SetUser
        self.$store.dispatch('setUser', result.user.displayName)
      }).catch(function (error) {
        console.log('login error' + error)
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    cart () {
      return this.myCart.length
    },
    views () {
      // random math
      var x = Math.floor((Math.random() * 100000) + 1)
      return x
    }
  }
}
</script>
