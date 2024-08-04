import { Button } from '@/components/ui/button'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { PlusIcon } from 'lucide-react'

export const Route = createRootRoute({
  component: Root,
})

function NavBar() {
  return (
    <div className='p-2 flex gap-2 w-auto items-center justify-start'>
      <Link to='/' className='[&.active]:font-semibold [&.active]:underline'>
        Home
      </Link>{' '}
      <Link
        to='/expenses'
        className='[&.active]:font-semibold [&.active]:underline'>
        Expenses
      </Link>
      <Link
        to='/about'
        className='[&.active]:font-semibold [&.active]:underline'>
        About
      </Link>
      <Button asChild className='ml-auto'>
        <Link to='/create-expense' className='[&.active]:font-semibold'>
          <PlusIcon className='size-4 mr-2' />
          Create expense
        </Link>
      </Button>
    </div>
  )
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className='container my-4'>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  )
}
