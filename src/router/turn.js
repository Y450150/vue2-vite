
import svg from './turn/svg.js'

const RouterView = {
    name: "test",
    render: h => h('router-view')
}

export default [{
    path: '/page',
    component: RouterView,
    children: [...svg]
}
]