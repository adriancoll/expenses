import { getTotalSpentUseCase } from '@/use-cases/expenses/get-total-spent.use-case'
import { useQuery } from '@tanstack/react-query'

export const useGetTotalSpentQuery = () => {
  const query = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpentUseCase,
  })

  return query
}
