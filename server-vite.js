

/**
 *      vite 暂不支持  vue2 ssr 
 *      暂时用 csr 代替
 */


const express = require('express')
// const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
const { createServer: createViteServer } = require('vite')

const resolve = file => path.resolve(__dirname, file)

function renderToString(vite) {
    return async (req, res) => {
        try {
            const url = req.originalUrl
            // 读取 模板
            let template = fs.readFileSync(resolve('index.template.vite.html'), 'utf-8')
            // 模板编译，应用注册到 vite hmr中
            template = await vite.transformIndexHtml(url, template)

            // 加载服务器入口，vite.ssrLoadModule 将自动转换
            const { render } = await vite.ssrLoadModule('/src/entry-server.js')

            // 渲染应用的 html  如函数调用了相应 framework 的 SSR API。
            const appHtml = await render(url)

            // 注入应用渲染的 HTML 到模板中。
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (err) {
            console.log(err)
        }
    }
}


async function createServer() {
    const server = express()

    const vite = await createViteServer({
        server: { middlewareMode: true }
    })
    server.use(vite.middlewares)
    server.get('*', renderToString(vite))

    server.listen(8080, () => {
        console.log('server start')
    })
}
createServer()

