import type { Expense } from "../types/expense";

export const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: 'Rent',
    description: 'Monthly rent',
    amount: 1000,
  },
  {
    id: 2,
    title: 'Food',
    description: 'Groceries',
    amount: 100,
  },
  {
    id: 3,
    title: 'Internet',
    description: 'Monthly internet bill',
    amount: 50,
  },
]
