import { useGetCurrentUserQuery } from './use-get-current-user-query'

export const useIsAuthenticated = () => {
  const { error, isPending, status } = useGetCurrentUserQuery()

  if (error || isPending) return false

  return status == 'success'
}
