import { hc } from 'hono/client'
import { ApiRoutes } from '@server/app'

export const { api } = hc<ApiRoutes>('/')

export const expensesApi = api.expenses
export const authApi = api.auth
