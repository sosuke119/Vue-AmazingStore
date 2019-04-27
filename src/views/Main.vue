<template lang="pug">
div
  //- navbar
  .navbar
    .container
      //- mobile
      .navbar-mobile.w-100
        .dib
          i.fas.fa-bars.dib
          h4.ml-3.dib Face
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
  //- Main-content
  .container.zindex-sticky(style="margin-top:-70px")
    .row
      .col-xl-3
        .category.shadow.p-3.mb-5.bg-white.rounded
          p.fz14.c-gray ALL CATEGORY
          ul
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
      .col-xl-9
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
                p 12
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
          .col-6.col-md-4.col-lg-3.mb-4
            .card.shadow
              img.card-img-top(src='../assets/images/product1.png', alt='Card image cap')
              .card-body
                p.card-text.text-center
                  | Missha All Around Safe Block Sebum Zero Sun
                p.card-text.text-center.mt-2.c-yellow
                  | $4.99
          .col-6.col-md-4.col-lg-3.mb-4
            .card.shadow
              img.card-img-top(src='../assets/images/product1.png', alt='Card image cap')
              .card-body
                p.card-text.text-center
                  | Missha All Around Safe Block Sebum Zero Sun
                p.card-text.text-center.mt-2.c-yellow
                  | $4.99
          .col-6.col-md-4.col-lg-3.mb-4
            .card.shadow
              img.card-img-top(src='../assets/images/product1.png', alt='Card image cap')
              .card-body
                p.card-text.text-center
                  | Missha All Around Safe Block Sebum Zero Sun
                p.card-text.text-center.mt-2.c-yellow
                  | $4.99
          .col-6.col-md-4.col-lg-3.mb-4
            .card.shadow
              img.card-img-top(src='../assets/images/product1.png', alt='Card image cap')
              .card-body
                p.card-text.text-center
                  | Missha All Around Safe Block Sebum Zero Sun
                p.card-text.text-center.mt-2.c-yellow
                  | $4.99
          .col-6.col-md-4.col-lg-3.mb-4
            .card.shadow
              img.card-img-top(src='../assets/images/product1.png', alt='Card image cap')
              .card-body
                p.card-text.text-center
                  | Missha All Around Safe Block Sebum Zero Sun
                p.card-text.text-center.mt-2.c-yellow
                  | $4.99
          .col-6.col-md-4.col-lg-3.mb-4
            .card.shadow
              img.card-img-top(src='../assets/images/product1.png', alt='Card image cap')
              .card-body
                p.card-text.text-center
                  | Missha All Around Safe Block Sebum Zero Sun
                p.card-text.text-center.mt-2.c-yellow
                  | $4.99

</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
    }
  },
  mounted () {
    // sidebar-category-list
    let tmp = null
    $('.category-title').click(function () {
      $(tmp).children('ul').slideUp().end().children('.arrow').removeClass('arrow-up')
      $(this).children('ul').slideToggle().end().children('.arrow').addClass('arrow-up')
      tmp = this
    })
    $('.category-title > ul').click(function () {
      return false // 阻止事件冒泡
    })
  },
  methods: {
  }
}
</script>
