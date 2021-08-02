import Vue from 'vue'
import Router from 'vue-router'
import turn from './router/turn.js'

Vue.use(Router)

const routes = [
    ...turn
]

export function createRouter() {
    return new Router({
        mode: 'history',
        routes
    })
}