// router
import { createFileRoute } from '@tanstack/react-router'
// hooks
import { useGetCurrentUserQuery } from '@/hooks/auth/use-get-current-user-query'
// ui
import { Loader } from 'lucide-react'
import { LogoutButton } from '@/components/auth/logout-button'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { data: profile, error, isPending } = useGetCurrentUserQuery()

  if (isPending) {
    return <Loader className='size-4 animate-spin' />
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className='p-2 space-y-4'>
      <h1>Hello, {profile.family_name}</h1>

      <LogoutButton />
    </div>
  )
}
