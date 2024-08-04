import { expensesApi } from '@/services/api'

/**
 * Get the total amount spent
 * @returns {Number} - The total amount spent
 */
export const getTotalSpentUseCase = async (): Promise<number> => {
  try {
    const res = await expensesApi['total'].$get()

    if (!res.ok) {
      throw new Error('Server error')
    }

    const data = await res.json()

    return +data.total
  } catch (error) {
    console.error(error)
    throw new Error('Error getting total spent')
  }
}
