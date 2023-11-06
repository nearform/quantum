import ProgressDefault from '@/assets/build/progress-default.icon'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

interface StepProps {
  selected: 'true' | 'false'
  className?: string
}

const stepVariant = cva([
  'text-inherit',
  'fill-current',
  'data-[selected=true]:text-primary-700',
  'dark:text-accent-alt-dark',
  'dark:data-[selected=true]:text-white'
])

const Step = ({ selected, className }: StepProps) => {
  return (
    <ProgressDefault
      data-selected={selected}
      className={cn(stepVariant(), className)}
    />
  )
}

export { Step, type StepProps }
