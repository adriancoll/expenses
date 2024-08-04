import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTotalSpent } from './use-cases/get-total-spent'

function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    getTotalSpent().then(setTotalSpent) 
  }, [])

  return (
    <Card className='m-auto max-w-[350px]'>
      <CardHeader>
        <CardTitle>The spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  )
}

export default App
