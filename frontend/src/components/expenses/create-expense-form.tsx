import { FC } from 'react'
// components
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// rhf
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// schemas
import {
  CreateExpense,
  createExpenseSchema,
} from '@server/schemas/expense.schema'
// sonner
import { toast } from 'sonner'
// router
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { createExpenseUseCase } from '@/use-cases/expenses/create-expense.use-case'

export const CreateExpenseForm: FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 1. Define your form.
  const form = useForm<CreateExpense>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: '',
      amount: 0,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: CreateExpense) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast.promise(createExpenseUseCase(values), {
      loading: 'Creating expense...',
      success: 'Expense created successfully',
      error: 'Failed to create expense',

      finally: () => {
        navigate({ to: '/expenses' })
        queryClient.invalidateQueries({
          queryKey: ['get-expenses'],
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Cinema tickets' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='2 tickets for the new Spiderman movie'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={0}
                  defaultValue={0}
                  onChange={(ev) => {
                    // This is a workaround for the issue with number inputs in React Hook Form.
                    onChange(+ev.currentTarget.value)
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create expense</Button>
      </form>
    </Form>
  )
}
