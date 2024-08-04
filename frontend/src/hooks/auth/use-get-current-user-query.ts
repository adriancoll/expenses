import { getCurrentUserUseCase } from '@/use-cases/auth/get-current-user.use-case'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCurrentUserQueryOption = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUserUseCase,
  retry: 0,
  staleTime: Infinity,
})

export const useGetCurrentUserQuery = () => {
  const query = useQuery(getCurrentUserQueryOption)

  return query
}
