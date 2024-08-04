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
      <ExpensesTable />
    </div>
  )
}
