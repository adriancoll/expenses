// api
import { expensesApi } from '@/services/api'
// schema
import { CreateExpense } from '@server/schemas/expense.schema'

export const createExpenseUseCase = (expense: CreateExpense) => {
  const response = expensesApi.$post({ json: expense })

  return response
}
