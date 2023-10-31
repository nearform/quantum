import { StepsIndicator } from '@/components/StepsIndicator'

interface StepIndicatorDemoProps {
  stepNumber: number
  selectedIndex: number
  className?: string
  childClassName?: string
}

export const StepIndicatorDemo = ({
  stepNumber,
  selectedIndex
}: StepIndicatorDemoProps) => {
  return <StepsIndicator length={stepNumber} selectedIndex={selectedIndex} />
}
