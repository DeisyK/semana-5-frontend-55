import Vue from 'vue'
//import './plugins/axios'
import axios from "axios"
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'

const base =  axios.create({
  // baseURL : 'http://localhost:3000/'
  // baseURL : 'http://51.195.41.15:81/'
  baseURL : 'http://missionmarket55.xyz:81/'
})
Vue.prototype.$http = base;

Vue.config.productionTip = false

const axiosConfig ={
  baseURL: 'http://localhost:3000/',
  timeout: 30000,
};

Vue.prototype.$axios = axios.create(axiosConfig)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
