import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Expense } from '@server/schemas/expense.schema'
import { FC } from 'react'
import { useDeleteExpenseMutation } from '@/hooks/expenses/use-delete-expense-mutation'
import { Trash2Icon } from 'lucide-react'

interface Props {
  expense: Expense
}

export const DeleteExpenseAlertDialog: FC<Props> = ({ expense }) => {
  const { deleteExpense } = useDeleteExpenseMutation({ id: String(expense.id) })

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant='destructive' size='icon'>
          <Trash2Icon className='size-4 ' />{' '}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            expense data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteExpense}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
