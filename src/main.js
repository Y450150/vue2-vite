// main.js
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './core/antd'
Vue.prototype.$axios = axios

export function createApp() {
  const app = new Vue({
    render: h => h(App)
  })
  return { app }
}