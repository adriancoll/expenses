import { expensesApi } from '@/services/api'

export const deleteExpenseUseCase = async (expenseId: string) => {
  const res = await expensesApi[':id{[0-9]+}'].$delete({
    param: {
      id: expenseId,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to delete expense')
  }

  const deletedExpense = await res.json()

  return deletedExpense
}
