import { z } from 'zod'

export const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  amount: z.number().int().positive(),
})

export const createExpenseSchema = expenseSchema.omit({ id: true })

export type CreateExpense = z.infer<typeof createExpenseSchema>

export type Expense = z.infer<typeof expenseSchema>
