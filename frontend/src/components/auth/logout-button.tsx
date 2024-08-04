import { LogOutIcon } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { cn } from '../lib/utils'

interface Props extends ButtonProps {
  showText?: boolean
}

export const LogoutButton = ({ showText, ...props }: Props) => {
  return (
    <Button
      asChild
      variant='outline'
      size={showText ? 'default' : 'icon'}
      {...props}>
      <a href='/api/auth/logout'>
        <LogOutIcon
          className={cn('size-4', {
            'mr-2': showText,
          })}
        />
        {showText ? 'Logout' : null}
      </a>
    </Button>
  )
}
