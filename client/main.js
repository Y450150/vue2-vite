// main.js
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import { createRouter } from "./router.js";
import "./core/antd";
import * as clarityJs from "../clarity-js/build/clarity.module.js";
// import * as clarityJs from "../clarity-js/src/index.ts";

const { clarity } = clarityJs
clarity.start()
// console.log(clarityJs.)

// Vue.component('pro-layout', ProLayout)
// Vue.component('page-container', PageHeaderWrapper)
// Vue.component('page-header-wrapper', PageHeaderWrapper)

Vue.prototype.$axios = axios;
export function createApp() {
  const router = createRouter();
  const app = new Vue({
    router,
    render: (h) => h(App),
  });

  return { app, router };
}
