// router
import { createFileRoute } from '@tanstack/react-router'
// ui
import { ExpensesTable } from '@/components/expenses/expenses-table'

export const Route = createFileRoute('/expenses/')({
  component: ExpensesPage,
})

function ExpensesPage() {
  return (
    <div className='p-2'>
      <div className='mb-4'>
        <h1 className='font-bold text-2xl leading-tight'>Expenses</h1>
        <p className='font-sm'>Here you can see all the expenses</p>
      </div>
      <ExpensesTable />
    </div>
  )
}
