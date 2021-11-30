import { createVuePlugin } from 'vite-plugin-vue2';

const path = require('path')

const config = (
    {
        define: {
            'process.env': process.env,
        },
        plugins: [createVuePlugin()],
        resolve: {
            alias: [
            ],
        },
    }
)
export default config