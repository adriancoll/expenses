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
    throw new Error('Server error')
  }

  const data = await res.json()

  console.log({ data })

  return expenseSchema.parse(data)
}
