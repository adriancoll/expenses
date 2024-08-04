// hono
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
// routes
import { expensesRouter } from './routes/expenses'
import { serve } from 'bun'

const app = new Hono()

app.use(logger())

app.route('/api/expenses', expensesRouter)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
