import { expensesApi } from '@/services/api'
import { Expense, expenseSchema } from '@server/schemas/expense.schema'

export const getExpensesUseCase = async (): Promise<Expense[]> => {
  const res = await expensesApi.$get()

  if (!res.ok) {
    throw new Error('Server error')
  }

  const data = await res.json()

  return expenseSchema.array().parse(data)
}
