import { createVuePlugin } from 'vite-plugin-vue2'

const path = require('path')

const config = {
  define: {
    'process.env': process.env
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [createVuePlugin()],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }]
  },
  server: {
    port: 8088,
    cors: true
  }
}
export default config
