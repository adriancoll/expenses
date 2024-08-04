import { expensesService } from "@/services/expenses.service"

export const getTotalSpent = async () => {
  const res = await expensesService('total-spent')
  const data = await res.json()

  return data.totalSpent
}
