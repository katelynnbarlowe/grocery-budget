import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import ListService from './backend/services' // not passing down
//global.jQuery = require('jquery');
//import bootstrap from 'bootstrap'

import '../assets/sb-admin-2.scss'

Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(ListService); // not passing down
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({
  el: '#wrapper',
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  ListService, // not passing down
  components: {App},
  render: h => h(App)
})