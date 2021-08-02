// main.js
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import dir from './router/zhichu.js'
import { createRouter } from './router.js'
import './core/antd'
Vue.prototype.$axios = axios
console.log(dir)
export function createApp() {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  
  return { app, router }
}