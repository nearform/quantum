import { StepIndicator } from '@/components/StepsIndicator'

export const StepIndicatorDemo = ({ orientation }) => {
  const numberOfSteps = 9
  const items = Array(numberOfSteps)
    .fill(undefined)
    .map((el, i) => ({
      selected: false
    }))
  return <StepIndicator length={2} index={1} orientation={orientation} />
}
