import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import EditMeetupDetailsDialog from './components/meetup/edit/EditMeetupDetailsDialog.vue'
import EditMeetupDate from './components/meetup/edit/EditMeetupDate.vue'
import EditMeetupTime from './components/meetup/edit/EditMeetupTime.vue'
import RegisterDialog from './components/meetup/registration/RegisterDialog.vue'
import AlertCmp from './components/shared/Alert.vue'

Vue.use(Vuetify, { theme: {
  primary: '#7cb342',
  secondary: '#424242',
  accent: '#cddc39',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDate)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTime)
Vue.component('app-register-dialog', RegisterDialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    console.log('gkjsdjgksjdk')
    firebase.initializeApp({
      apiKey: 'AIzaSyCjXtcTTu67IIfUCnsDDfCrh44XPb9llAk',
      authDomain: 'meetups-bfd68.firebaseapp.com',
      databaseURL: 'https://meetups-bfd68.firebaseio.com',
      projectId: 'meetups-bfd68',
      storageBucket: 'meetups-bfd68.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
