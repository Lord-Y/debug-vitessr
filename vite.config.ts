import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSSR(),
    vue(), // react()
  ],
  // optimizeDeps: {
  //   exclude: [
  //     './src/plugins/env.json',
  //     'src/plugins/env.json',
  //   ],
  // },
  build: {
    // minify: 'esbuild',
    // target: "esN",
    // rollupOptions: {
    //   external: [
    //     './src/plugins/env.json',
    //     'src/plugins/env.json',
    //   ],
    // }
  },
  // assetsInclude: ['**/env.json']
})
