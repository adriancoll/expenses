// hono
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
// data
import { fakeExpenses } from '../data/expenses'
// schemas
import { createExpenseSchema } from '../schemas/expense.schema'
import { wait } from '../../frontend/src/utils/wait'

export const expensesRouter = new Hono()
  .get('/', (c) => c.json(fakeExpenses))
  .get('/total', async (c) => {
    await wait(1000)
    const total: number = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    )
    return c.json({ total }, 201)
  })
  .post('/', zValidator('json', createExpenseSchema), async (c) => {
    const validated = c.req.valid('json')

    fakeExpenses.push({
      id: fakeExpenses.length + 1,
      ...validated,
    })

    return c.json(validated)
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))

    const expense = fakeExpenses.find((expense) => expense.id === +id)

    if (!expense) {
      return c.notFound()
    }

    return c.json(expense)
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))

    const index = fakeExpenses.findIndex((expense) => expense.id === +id)

    if (index === -1) {
      return c.notFound()
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0]

    return c.json({ expense: deletedExpense })
  })
