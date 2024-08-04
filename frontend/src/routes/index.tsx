// router
import { createFileRoute } from '@tanstack/react-router'
// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// hooks
import { useGetTotalSpentQuery } from '@/hooks/expenses/use-get-total-spent-query'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  const { data: total, error, isPending } = useGetTotalSpentQuery()

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <Card className='max-w-[350px]'>
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? 'Loading...' : total}</CardContent>
      </Card>
    </div>
  )
}
