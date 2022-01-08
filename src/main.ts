import App from './App.vue'
import routes from './router/routes'
import viteSSR from 'vite-ssr'
import { runtimeConfig } from './plugins/runtimeConfig'
import { createHead } from '@vueuse/head'

export default viteSSR(App, { routes }, (context) => {
    const { app } = context
    const head = createHead()
    app.use(head)
    app.use(runtimeConfig)
})
