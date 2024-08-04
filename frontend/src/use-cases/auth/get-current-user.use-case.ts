import { authApi } from '@/services/api'

export const getCurrentUserUseCase = async () => {
  const res = await authApi.me.$get()

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Server error')
  }

  const data = await res.json()

  return data
}
