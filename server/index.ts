import app from './app'

Bun.serve({
  fetch: app.fetch,
})

console.log('Server started at 3000')