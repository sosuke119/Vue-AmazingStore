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
        .dib.float-right.mt-1
          i.fas.fa-search
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
              a(href="") Blog
              a.ml-4(href="") My Account
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
                a(href='#') Creams & gels
              li
                a(href='#') Patches
              li
                a(href='#') Emulsions
              li
                a(href='#') Toners
              li
                a(href='#') Face cleansing
          li.category-title BODY
            span.arrow
            ul.in-sidebar
              li
                a(href='#') Creams & gels
              li
                a(href='#') Patches
              li
                a(href='#') Emulsions
              li
                a(href='#') Toners
              li
                a(href='#') Face cleansing
          li.category-title FOOT
            span.arrow
            ul.in-sidebar
              li
                a(href='#') Creams & gels
              li
                a(href='#') Patches
              li
                a(href='#') Emulsions
              li
                a(href='#') Toners
              li
                a(href='#') Face cleansing
          li.category-title HANDS
            span.arrow
            ul.in-sidebar
              li
                a(href='#') Creams & gels
              li
                a(href='#') Patches
              li
                a(href='#') Emulsions
              li
                a(href='#') Toners
              li
                a(href='#') Face cleansing
  //- Main-content
  .container.zindex-sticky.main
    .row
      .col-0.col-xl-3
        .category.shadow.p-3.mb-5.bg-white.rounded
          p.fz14.c-gray ALL CATEGORY
          ul
            li.category-title FACE
              span.arrow
              ul.in-sidebar
                li
                  a(href='#' @click="clg") Creams & gels
                li
                  a(href='#') Patches
                li
                  a(href='#') Emulsions
                li
                  a(href='#') Toners
                li
                  a(href='#') Face cleansing
            li.category-title BODY
              span.arrow
              ul.in-sidebar
                li
                  a(href='#') Creams & gels
                li
                  a(href='#') Patches
                li
                  a(href='#') Emulsions
                li
                  a(href='#') Toners
                li
                  a(href='#') Face cleansing
            li.category-title FOOT
              span.arrow
              ul.in-sidebar
                li
                  a(href='#') Creams & gels
                li
                  a(href='#') Patches
                li
                  a(href='#') Emulsions
                li
                  a(href='#') Toners
                li
                  a(href='#') Face cleansing
            li.category-title HANDS
              span.arrow
              ul.in-sidebar
                li
                  a(href='#') Creams & gels
                li
                  a(href='#') Patches
                li
                  a(href='#') Emulsions
                li
                  a(href='#') Toners
                li
                  a(href='#') Face cleansing
      .col-12.col-xl-9
        //- search Bar
        .row.searchBar
          .col-lg-9
            input.search(type="text" placeholder="Enter your name")
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
          .col-lg-9
            h2 Creams & gels
            div.mt-2
              p.dib.mr-5 BRAND:
                span ALL BRANDS
              p.dib.mr-5 SKIN TYPE:
                span FOR OILY SKIN
              p.dib AGE:
                span 30+
          .col-lg-3
            p Showing 30 of 392
        hr.brand-line
        //- product
        .row.product
          .col-6.col-md-4.col-lg-3.mb-4(v-for="(post, index) in posts" :key="post.id" data-toggle='modal', :data-target='["#index-" + index]')
            .shadow
              img.card-img-top(:src='post.photoUrl', alt='Card image cap')
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
                      img.card-img-top(:src='post.photoUrl', alt='Card image cap')
                    .col-xl-6
                      div
                        h2.mt-3 {{ post.title }}
                      .clearfix.mt-2
                        .float-left
                          p.modal-cost ${{ post.cost }}
                        .float-right
                          p.modal-ml {{ post.ml}}ml
                      button.btn-cart(@click="addCart(index)") Add to cart
                      p.modal-description.mt-4 {{ post.description }}
                  //- .row.p-4
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
</template>
<script>
import db from '../db/firebaseInit'
import $ from 'jquery'
export default {
  data () {
    return {
      navbar: false,
      posts: [],
      myCart: [],
      category: ''
    }
  },
  created () {
    // get data
    this.getPosts()
  },
  mounted () {
  },
  updated () {
    // mobile-toggle
    let tmp = null
    $('.category-title').click(function () {
      $(tmp).children('ul').slideUp().end().children('.arrow').removeClass('arrow-up')
      $(this).children('ul').slideToggle().end().children('.arrow').addClass('arrow-up')
      tmp = this
    })
    // $('.category-title > ul').click(function () {
    //   return false // 阻止事件冒泡
    // })
    // mobile-toggle-active
    $('.category-title').click(function () {
      $('.category-title').removeClass('active')
      $(this).addClass('active')
    })
  },
  methods: {
    addCart (id) {
      alert(id)
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
        })
      })
    },
    getSearch () {
      db.collection('posts').where('post_id', '==', '3').get().then((querySnapshot) => {
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
    }
  },
  computed: {
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
