// common
import { FC } from 'react'
// hooks
// ui
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// schemas
import { useGetTotalSpentQuery } from '@/hooks/expenses/use-get-total-spent-query'
import { useGetExpensesQuery } from '@/hooks/expenses/use-get-expenses-query'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import { Eye } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const ExpensesTable: FC = () => {
  const { data: total, isPending: isTotalPending } = useGetTotalSpentQuery()
  const {
    data: expenses,
    isPending: isExpensesPending,
    error: expensesError,
  } = useGetExpensesQuery()

  if (isExpensesPending) {
    return <Skeleton className='w-full h-[300px]' />
  }

  if (expensesError) {
    return <div>Error: {expensesError.message}</div>
  }

  const totalFormatted = isTotalPending
    ? 'Loading...'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(total!)

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Expense id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>description</TableHead>
          <TableHead className='text-right'>Amount</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className='font-medium'>{expense.id}</TableCell>
            <TableCell>{expense.title}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell className='text-right'>{expense.amount}</TableCell>
            <TableCell className='text-right'>
              <Button variant='secondary' asChild size='icon'>
                <Link to='/expenses/$expenseId' params={{ expenseId: String(expense.id) }}>
                  <Eye className='size-4' />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className='text-right'>{totalFormatted}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
