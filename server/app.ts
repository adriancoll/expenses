import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRouter } from './routes/expenses'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app
  .basePath('/api')
  .get('/', (c) => c.text('Up and running! ✨'))
  .route('/expenses', expensesRouter)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes
