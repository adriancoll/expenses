import { expensesApi } from '@/services/api'
import { Expense, expenseSchema } from '@server/schemas/expense.schema'

export const getExpenseByIdUseCase = async (
  expenseId: string
): Promise<Expense> => {
  const res = await expensesApi[':id{[0-9]+}'].$get({
    param: {
      id: expenseId,
    },
  })

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Expense with id #${expenseId} not found`)
    }

    throw new Error(res.statusText)
  }

  const data = await res.json()

  console.log({ data })

  return expenseSchema.parse(data)
}
