// query options
import { getCurrentUserQueryOption } from '@/hooks/auth/use-get-current-user-query'
// router
import { createFileRoute, Outlet } from '@tanstack/react-router'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}

const Component = () => {
  const { user } = Route.useRouteContext()

  if (!user) {
    return <Login />
  }

  return <Outlet />
}

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context

    try {
      const data = await queryClient.fetchQuery(getCurrentUserQueryOption)

      return { user: data }
    } catch (error) {
      return { user: null }
    }
  },
  component: Component,
})
