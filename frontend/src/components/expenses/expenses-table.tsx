// common
import { FC } from 'react'
// hooks
// ui
import {
  Table,
  TableBody,
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
import { DeleteExpenseAlertDialog } from './delete-expense-alert-dialog'
import { ScrollArea } from '../ui/scroll-area'
import { formatCurrency } from '@/utils/format-currentcy'

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

  console.log({ expenses })

  const totalFormatted = isTotalPending
    ? 'Loading...'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(total!)

  return (
    <ScrollArea className='h-[80vh]'>
      <Table>
        <TableHeader className='sticky top-0 bg-secondary/50 backdrop-blur-sm'>
          <TableRow>
            <TableHead className='w-[100px]'>Expense id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='overflow-y-auto h-[100px]'>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className='font-medium'>{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className='text-right'>
                {formatCurrency(expense.amount)}
              </TableCell>
              <TableCell className='text-right flex gap-2 items-center justify-end'>
                <Button variant='secondary' asChild size='icon'>
                  <Link
                    to='/expenses/$expenseId'
                    params={{ expenseId: String(expense.id) }}>
                    <Eye className='size-4' />
                  </Link>
                </Button>
                <DeleteExpenseAlertDialog expense={expense} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className='sticky bottom-0 bg-secondary/50 backdrop-blur-sm'>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right'>{totalFormatted}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ScrollArea>
  )
}
