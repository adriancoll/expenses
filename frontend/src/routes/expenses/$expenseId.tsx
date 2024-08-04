// ui
import { DeleteExpenseAlertDialog } from '@/components/expenses/delete-expense-alert-dialog'
import { Button } from '@/components/ui/button'
import { EmptyView } from '@/components/ui/empty'
import { ArrowLeftIcon, ChevronLeftIcon } from 'lucide-react'
// use-case
import { getExpenseByIdUseCase } from '@/use-cases/expenses/get-expense-by-id.use-case'
// router
import { createFileRoute, Link } from '@tanstack/react-router'
import { formatCurrency } from '@/utils/format-currentcy'

export const Route = createFileRoute('/expenses/$expenseId')({
  component: ExpenseDetailPage,
  loader: async ({ params }) => {
    return getExpenseByIdUseCase(params.expenseId)
  },
  errorComponent: ({ error }) => {
    return (
      <div className='h-screen'>
        <EmptyView title='Expense cannot be loaded' description={error.message}>
          <div className='flex items-center gap-4 mt-4'>
            <Button variant='outline' asChild size='icon'>
              <Link to='/expenses'>
                <ChevronLeftIcon className='size-4' />
              </Link>
            </Button>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        </EmptyView>
      </div>
    )
  },
})

function ExpenseDetailPage() {
  const expense = Route.useLoaderData()

  return (
    <div className='py-4'>
      <div className='flex items-center justify-between mb-6'>
        <Button asChild variant='ghost'>
          <Link to='/expenses'>
            <ArrowLeftIcon className='size-4 mr-2' />
            Back
          </Link>
        </Button>
        <DeleteExpenseAlertDialog expense={expense} />
      </div>
      <div className='bg-card h-full rounded-lg shadow-sm'>
        <div className='flex items-center justify-between mb-4'>
          <div className='text-2xl font-bold'>Expense #{expense.id}</div>
          <div className='text-4xl font-bold text-primary'>
            {formatCurrency(expense.amount)}
          </div>
        </div>
        <div className='mb-4'>
          <h2 className='text-lg font-medium mb-2'>{expense.title}</h2>
          <p className='text-muted-foreground'>{expense.description}</p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-muted-foreground'></div>
        </div>
      </div>
    </div>
  )
}
