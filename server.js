

const fs = require('fs')
const path = require('path')
const express = require('express')
const router = require('./node/router')
const devServer = require('./build/setup-dev-server')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
const server = express()




const serve = (path) => express.static(resolve(path), {
    maxAge: 0
})
const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, {
        basedir: resolve('./dist'),
        ...options
    })
}

let renderer, readyPromise;
const template = fs.readFileSync(resolve('./index.template.html'), 'utf-8')
readyPromise = devServer(server, (bundle, options) => {
    renderer = createRenderer(bundle, { template, ...options })
})

function render(req, res) {

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found ---')
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }
    const context = {
        title: "yvywang",
        url: req.url
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            handleError(err)
            return console.log("renderString err", err)
        }
        res.send(html)
    })
}

server.use('/dist', serve('./dist')); // 部署dist目录
server.use('/api', router) // 部署路由
server.get('*', (req, res) => {
    readyPromise.then(() => render(req, res)).catch(err => {
        return console.log("renderPromise server get err", err)
    })
})

server.listen(8080, () => {
    console.log('server start')
})

var ws = require("nodejs-websocket")
const mockPath = path.resolve(__dirname, './node/mock/chat.json')
const clientList = []

ws.createServer(function (conn) {
    console.log("New connection")
    clientList.push(conn)
    conn.on("text", function (str) {
        var data = JSON.parse(fs.readFileSync(mockPath, 'utf-8'))
        data.push(JSON.parse(str))
        data = JSON.stringify(data)
        fs.writeFileSync(mockPath, data)
        clientList.forEach(conn => conn.send(data))
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8888)