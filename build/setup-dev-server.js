const webpack = require('webpack')
const MFS = require('memory-fs')
const path = require('path')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, filePath) => {
    return fs.readFileSync(path.join(clientConfig.output.path, filePath), 'utf-8')
}

module.exports = function devServer(app, cb) {

    let bundle, ready, clientManifest

    const readyPromise = new Promise(resolve => ready = resolve)

    const update = () => {
        if (bundle && clientManifest) {
            ready()
            cb(bundle, { clientManifest })
        }
    }

    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    const clientCompiler = webpack(clientConfig)
    const devMiddleWare = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })
    app.use(devMiddleWare)

    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return console.log(stats.errors)
        try {
            clientManifest = JSON.parse(readFile(
                devMiddleWare.fileSystem,
                'vue-ssr-client-manifest.json'
            ))
        } catch (error) {
            console.log(error)
        }

        update()
    })
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) return console.log(err)
        stats = stats.toJson()
        if (stats.errors.length) return console.log(stats.errors)
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        update()
    })

    return readyPromise
}

