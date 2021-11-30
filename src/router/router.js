
const RouterView = {
    name: "Router",
    render: h => h('router-view')
}

export default [{
    path: '/page',
    component: RouterView,
    children: [{
        path: '/page/svg',
        component: () => import(/* webpackChunkName: "turn_code" */ "../views/turnCode/render.vue"),
    }, {
        path: '/page/chat',
        component: () => import(/* webpackChunkName: "chat" */ "../views/chat/render.vue"),
    }]
}
]