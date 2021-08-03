
import svg from './svg.js'
import chat from './chat.js'
const RouterView = {
    name: "Router",
    render: h => h('router-view')
}

export default [{
    path: '/page',
    component: RouterView,
    children: [...svg, ...chat]
}
]