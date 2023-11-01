import ProgressDefault from '@/assets/build/progressdefault.icon'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

interface StepProps {
  idx?: string
  selected: 'true' | 'false'
  className?: string
}

const stepVariant = cva([
  'text-inherit',
  'fill-current',
  'data-[selected=true]:text-primary-700',
  'dark:data-[selected=true]:text-white'
])

const Step = ({ idx, selected, className }: StepProps) => {
  return (
    <ProgressDefault
      key={idx}
      data-selected={selected}
      className={cn(stepVariant(), className)}
    />
  )
}

export { Step, StepProps }
