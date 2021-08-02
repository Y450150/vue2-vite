import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2';

const path = require('path')

export default defineConfig(
    {
        plugins: [createVuePlugin()],
        resolve: {
            alias: [
                { find: '@ant-design/icons-vue', replacement: path.resolve(__dirname, './custom_package/icons-vue/icons.js') }
            ],
        },
    }
)