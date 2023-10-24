import { Check } from '@/assets'
import { Checkbox } from '@/components/Checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

export const CheckboxDemo = ({
  checked
}: {
  checked: CheckboxProps['checked']
}): JSX.Element => {
  return <Checkbox checked={checked} />
}
