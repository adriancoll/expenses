import { CreateExpenseForm } from '@/components/expenses/create-expense-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpensePage,
})

function CreateExpensePage() {
  return (
    <div className='p-2'>
      <CreateExpenseForm />
    </div>
  )
}
