// main.js
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { createRouter } from './router.js'
import './core/antd'
Vue.prototype.$axios = axios
export function createApp() {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  
  return { app, router }
}