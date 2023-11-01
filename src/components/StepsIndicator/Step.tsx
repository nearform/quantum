import ProgressDefault from '@/assets/build/progressdefault.icon'
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
  'w-5 h-5',
  'content-center justify-center'
])

const Step = ({ selected, className }: StepProps) => {
  return (
    <ProgressDefault
      data-selected={selected}
      className={cn(stepVariant(), className)}
    />
  )
}

export { Step, StepProps }
