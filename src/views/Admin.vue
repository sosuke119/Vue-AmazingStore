<template lang="pug">
div
  h2 QQ
  .row
    .col-6
      form.p-4(@submit.prevent="")
        p id {{id}}
        input(type="text" id="id" v-model="id")
        p title {{ title}}
        input(type="text" v-model="title")
        p category {{category}}
        input(type="text" v-model="category")
        p description {{description}}
        input(type="text" v-model="description")
        p photoUrl {{photoUrl}}
        input(type="text" v-model="photoUrl")
        p cost {{cost}}
        input(type="text" v-model="cost")
        p ml {{ml}}
        input(type="text" v-model="ml")
        p sale {{sale}}
        input(type="text" v-model="sale")
        br
        button.mt-2(@click="addPosts") AddPost

    .col-6
      .card.shadow(v-for="(post, index) in posts" :key="post.id" data-toggle='modal', :data-target='["#index-" + index]')
        .card-body
          p.product-title.card-text.text-center
            | {{ post.title }} {{ post.id }}
          p.card-text.text-center.mt-2.c-yellow
            | ${{ post.cost}} |
            | {{  post.category}}
</template>
<script>
import db from '../db/firebaseInit'
// - import $ from 'jquery'
export default {
  data () {
    return {
      id: '',
      title: '',
      description: '',
      photoUrl: '',
      cost: '',
      ml: '',
      sale: '',
      posts: []
    }
  },
  created () {
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
  methods: {
    addPosts () {
      db.collection('posts').add({
        'post_id': this.id,
        'title': this.title,
        'description': this.description,
        'photoUrl': this.photoUrl,
        'cost': this.cost,
        'ml': this.ml,
        'sale': this.sale,
        'category': this.category
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
