// api
import { expensesApi } from '@/services/api'
// schema
import { CreateExpense, Expense } from '@server/schemas/expense.schema'

export const createExpenseUseCase = async (
  expense: CreateExpense
): Promise<Expense> => {
  const response = await expensesApi.$post({ json: expense })

  if (!response.ok) {
    throw new Error('Failed to create expense')
  }

  const data = await response.json()

  return data
}
