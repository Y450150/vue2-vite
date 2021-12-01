import { BasicLayout } from '../layout'
const RouterView = {
    name: "Router",
    render: h => h('router-view')
}
export default [{
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/home',
    children: [{
        path: '/image',
        name: 'image',
        meta: { title: 'SVG转编', icon: 'profile', hideHeader: true, permission: ['profile'] },
        hideChildrenInMenu: true,
        component: async () => await import(/* webpackChunkName: "turn_code" */ "../views/turnCode/render.vue"),
    }, {
        path: '/chat',
        name: 'chat',
        meta: { title: 'wechat', icon: 'profile', permission: ['profile'] },
        component: async () => await import(/* webpackChunkName: "chat" */ "../views/chat/render.vue"),
    }, {
        path: '/home',
        component: async () => await import(/* webpackChunkName: "home" */ "../views/home/render.vue"),
    }]
}]
