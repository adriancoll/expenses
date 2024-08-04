import { Button } from '@/components/ui/button'
import { EmptyView } from '@/components/ui/empty'
import { Separator } from '@/components/ui/separator'
// use-case
import { getExpenseByIdUseCase } from '@/use-cases/expenses/get-expense-by-id.use-case'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses/$expenseId')({
  component: ExpenseDetailPage,
  loader: async ({ params }) => {
    return getExpenseByIdUseCase(params.expenseId)
  },
  errorComponent: ({ error }) => {
    return (
      <div className='h-screen'>
        <EmptyView
          title='Expense cannot be loaded'
          description={error.message}
        />
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    )
  },
})

function ExpenseDetailPage() {
  const expense = Route.useLoaderData()

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon'>
          <Link to='/expenses'>
            <ChevronLeftIcon className='size-4' />
          </Link>
        </Button>

        <h1 className='text-2xl font-bold'>Expense Detail </h1>
      </div>

      <Separator />

      <div className='space-y-4'>
        <div className='space-y-2'>
          {Object.entries(expense).map(([key, value]) => (
            <div key={key}>
              <strong className='capitalize'>{key}</strong>: {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
