<template lang="pug">
div
  navbar
  //- Main-content
  .main.container.zindex-sticky
    //- mobile myCart - user not login
    .mobile-cart.d-flex.justify-content-center.align-items-center(v-if="!this.currentUser" ,data-toggle='modal', data-target='#myCart')
      i.fas.fa-cart-plus.dib
      p.dib.ml-2 {{ cart}}
    #myCart.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Notice
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | Please login to use the My Cart
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') Close
    //- mobile myCart - user login
    .mobile-cart.d-flex.justify-content-center.align-items-center(v-if="this.currentUser" ,data-toggle='modal', data-target='#myCart2')
      i.fas.fa-cart-plus.dib
      p.dib.ml-2 {{ cart}}
    #myCart2.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title MY CART
          .modal-body.p-2.pl-2.pr-2
            .row
              .col-12.pt-2(v-for="(cart, index) in myCart" :key="cart.id" :id="['index-' + index]")
                .shadow.pt-1.pb-1.card
                  .row.d-flex.align-items-center
                    .col-2
                      img.card-img-top.mt-2(v-lazy='cart.photoUrl', alt='Card image cap')
                    .col-6.p-1
                      p.product-title.card-text.text-center
                        | {{ cart.title }}
                    .col-2.p-1
                      p.card-text.text-center.c-yellow
                        | ${{ cart.cost }}
                    .col-2.p1
                      i.fas.fa-times(:id="[index]" @click="removeCart")
            div
              h5.d-flex.justify-content-center(v-if="myCartTotal === 0") What do you want to buy?
              h5.pt-4.pr-2.float-right(v-else) Total
                span ${{ myCartTotal}}
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') Close
            button.btn.btn-primary(v-if="myCartTotal !== 0",type='button' @click="Checkout" data-dismiss='modal', data-toggle='modal', data-target='#checkOutCart') 結帳
    #checkOutCart.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Notice
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | Successful checkout, thanks you !
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') Close
    //- main Content
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
                a(href='#' @click="Nav") Creams & gels
              li
                a(href='#' @click="Nav") Emulsions
              li
                a(href='#' @click="Nav") Toners
            #headingTwo
              h2.mb-0
               .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseTwo', aria-expanded='true', aria-controls='collapseTwo')
                  | BODY
            #collapseTwo.collapse(aria-labelledby='headingTwo', data-parent='#accordionExample')
              li
                a(href='#' @click="Nav") Wash
              li
                a(href='#' @click="Nav") Oil
              li
                a(href='#' @click="Nav") Glide
            #headingThree
              h2.mb-0
                .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseThree', aria-expanded='true', aria-controls='collapseThree')
                  | FOOT
            #collapseThree.collapse(aria-labelledby='headingThree', data-parent='#accordionExample')
              li
                a(href='#' @click="Nav") Creams
              li
                a(href='#' @click="Nav") Mask
            #headingFour
              h2.mb-0
                .category-title.pt-1.pb-1(data-toggle='collapse', data-target='#collapseFour', aria-expanded='true', aria-controls='collapseFour')
                  | HAND
            #collapseFour.collapse(aria-labelledby='headingFour', data-parent='#accordionExample')
              li
                a(href='#' @click="Nav") Soap
              li
                a(href='#' @click="Nav") Lotions
      .col-12.col-xl-9
        //- search Bar
        .row.searchBar
          .col-lg-9
            input.search(type="text" placeholder="Search for anything" v-model="searchItem" @keyup.enter="getSearch")
            i.fas.fa-search
          .col-lg-3
            //- search button User Not Login
            button.btn-Cart(v-if="!currentUser", style="padding:0", data-toggle='modal', data-target='#myCart')
              .brn-Cart-left.dib(style="width:70%")
                i.fas.fa-shopping-cart
                p MY CART
              .brn-Cart-right.dib(style="width:30%;height:100%;background:#393AB1")
                p {{ cart }}
            //- search button User Login
            button.btn-Cart(v-if="currentUser", style="padding:0", data-toggle='modal', data-target='#myCart2')
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
          .col-6.col-md-4.col-lg-3.mb-4(v-for="(post, index) in currentPosts" :key="post.id" data-toggle='modal', :data-target='["#index-" + index]')
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
                    .col-xl-6.d-flex.justify-content-center
                      img.card-img-top.modal-main-img(v-lazy='post.photoUrl', alt='Card image cap')
                    .col-xl-6
                      div
                        h2.mt-3 {{ post.title }}
                      .clearfix.mt-2
                        .float-left
                          p.modal-cost ${{ post.cost }}
                        .float-right
                          p.modal-ml {{ post.ml}}ml
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
            #addCart.modal.fade(tabindex='-1', role='dialog', aria-hidden='true')
              .modal-dialog
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
import { mapGetters } from 'vuex'
import navbar from '@/views/components/navbar'
export default {
  components: { navbar },
  data () {
    return {
      myCart: [],
      category: 'All',
      searchItem: ''
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    addCart (id) {
      this.myCart.push(this.currentPosts[id])
    },
    getPosts () {
      let posts = []
      let filterPosts = []
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
          posts.push(data)
          filterPosts.push(data) // 篩選用的
        })
        // Set Vuex
        this.$store.dispatch('setPosts', posts)
        this.$store.dispatch('setFilterPosts', filterPosts)
      })
    },
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
    Nav (event) {
      let posts = []
      this.category = event.target.innerText // 取得Nav text
      this.$store.dispatch('setPosts', []) // 清空posts
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
    removeCart (event) {
      this.myCart.splice(event.target.id, 1)
    },
    Checkout () {
      this.myCart.splice(0, this.myCart.length)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentPosts', 'currentFilterPosts']),
    cart () {
      return this.myCart.length
    },
    views () {
      // random math
      var x = Math.floor((Math.random() * 100000) + 1)
      return x
    },
    myCartTotal () {
      var sun = 0
      for (var i = 0; i < this.myCart.length; i++) {
        sun += this.myCart[i].cost
      }
      console.log(sun)
      return sun
    }
  }
}
</script>
