global.fetch = require('node-fetch')
const path = require('path')
const express = require('express')
const dist = './dist'

// This contains a list of static routes (assets)
const { ssr } = require(`${dist}/server/package.json`)

// The manifest is required for preloading assets
const manifest = require(`${dist}/client/ssr-manifest.json`)

// This is the server renderer we just built
const { default: renderPage } = require(`${dist}/server`)
const server = express()

// Serve every static asset route
for (const asset of ssr.assets || []) {
  server.use(
    '/' + asset,
    express.static(path.join(__dirname, `${dist}/client/` + asset)),
  )
}

// Everything else is treated as a "rendering request"
server.get('*', async (request, response) => {
  const url =
    request.protocol + '://' + request.get('host') + request.originalUrl
  // if (!request.originalUrl.includes('/api/v1/')){
  const { html } = await renderPage(url, {
    manifest,
    preload: true,
    // Anything passed here will be available in the main hook
    request,
    response,
    // initialState: { ... } // <- This would also be available
  })
  response.end(html)
  // }
})

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || 'localhost'
console.log(`Server started: http://${host}:${port}`)
server.listen(port)
