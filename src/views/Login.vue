<template lang="pug">
div
  .container
    button.btn.btn-primary(type='button', data-toggle='modal', data-target='#exampleModal')
      | Launch demo modal
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
            button.btn.btn-secondary(type='button', data-dismiss='modal') Close
            button.btn.btn-primary(type='button', data-toggle='modal', data-target='#exampleModal2')
              | Launch demo modal
    #exampleModal2.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
      .modal-dialog(role='document')
        .modal-content
          .modal-header
            h5#exampleModalLabel.modal-title Modal title
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | ...
          .modal-footer
            button.btn.btn-secondary(type='button', data-dismiss='modal') Close
            button.btn.btn-primary(type='button') Save changes

</template>

<script>

// import { config } from '../db/firebaseInit'
// import firebase from 'firebase/app'
// export default {
//   name: 'register',
//   data: function() {
//     return {
//       email: '',
//       password: ''
//     };
//   },
//   methods: {
//     register: function(e) {
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(this.email, this.password)
//         .then(
//           user => {
//             // console.log(user);
//             alert(`Account Created for ${user.email}`)
//             this.$router.go({ path: this.$router.path })
//           },
//           err => {
//             alert(err.message)
//           }
//         );
//     },
//     googleLogin () {
//       let self = this
//       var provider = new firebase.auth.GoogleAuthProvider()
//       firebase.auth().signInWithPopup(provider).then(function(result) {
//         console.log('login success' + result)
//         console.log(result)
//         self.$router.push('/main')
//         // this.$router.push('/')
//       }).catch(function(error) {
//         console.log('login error' + error)
//         console.log(error)
//       })
//     }
//   }
// };
// </script>
</script>
