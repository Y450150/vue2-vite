import { createApp } from './main'

export default context => {

    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        // 设置服务器端 router 的位置
        router.push(context.url)
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            resolve(app)
        }, reject)
    })
}