import Vue from 'vue'
import Router from 'vue-router'
import router from './router/router.js'

Vue.use(Router)

const routes = [
    ...router
]

export function createRouter() {
    return new Router({
        mode: 'history',
        routes
    })
}