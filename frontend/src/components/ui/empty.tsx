import { PropsWithChildren, type FC } from 'react'

interface Props extends PropsWithChildren {
  title: string
  description: string
}

export const EmptyView: FC<Props> = ({ title, description, children }) => {
  return (
    <div className='flex h-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
        {children}
      </div>
    </div>
  )
}
