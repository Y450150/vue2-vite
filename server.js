


const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
const resolve = file => path.resolve(__dirname, file)
const devServer = require('./build/setup-dev-server')
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
    renderer = createRenderer(bundle, { template, ...options } )
})

function render(req, res) {
    renderer.renderToString((err, html) => {
        if (err) {
            return console.log(err)
        }
        res.send(html)
    })
}
server.use('/dist', serve('./dist'))
server.get('*', (req, res) => {
    readyPromise.then(() => render(req, res))
})

server.listen(8080, () => {
    console.log('server start')
})