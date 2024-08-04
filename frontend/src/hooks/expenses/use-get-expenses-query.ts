import { getExpensesUseCase } from '@/use-cases/expenses/get-expenses.use-case'
import { useQuery } from '@tanstack/react-query'

export const useGetExpensesQuery = () => {
  const query = useQuery({
    queryKey: ['get-expenses'],
    queryFn: getExpensesUseCase,
  })

  return query
}
