export default [{
    path: '/page/chat',
    component: () => import(/* webpackChunkName: "chat" */ "../views/chat/render.vue"),
}]