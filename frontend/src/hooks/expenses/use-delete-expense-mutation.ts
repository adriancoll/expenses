// use-cases
import { deleteExpenseUseCase } from '@/use-cases/expenses/delete-expense.use-case'
// query
import { useMutation, useQueryClient } from '@tanstack/react-query'
// router
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

interface Params {
  id: string
}

export const useDeleteExpenseMutation = (params: Params) => {
  const { id } = params

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const deleteExpenseMutation = useMutation({
    mutationKey: ['delete-expense', id],
    mutationFn: deleteExpenseUseCase,
    onMutate: () => {
      toast.promise(Promise.resolve(), {
        loading: 'Deleting expense...',
        success: () => {
          navigate({ to: '/expenses' })
          return 'Expense deleted successfully'
        },
        error: 'Failed to delete expense',
        finally: async () => {
          await queryClient.refetchQueries({
            queryKey: ['get-expenses', 'get-total-spent', id],
          })
        },
      })
    },
  })

  const deleteExpense = () => {
    deleteExpenseMutation.mutate(String(id))
  }

  return Object.assign({}, deleteExpenseMutation, {
    deleteExpense,
  })
}
