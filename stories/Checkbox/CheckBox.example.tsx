import { Check } from '@/assets'
import { Checkbox } from '@/components/Checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

export const CheckboxDemo = ({
  checked
}: {
  checked: CheckboxProps['checked']
}): JSX.Element => {
  return <Checkbox checked={checked} />
  // if (checked === 'indeterminate') {
  //   return <Checkbox checked={checked} />
  // } else {
  //   if (checked === 'true') {
  //     return <Checkbox checked={true} />
  //   }
  //   return <Checkbox checked={false} /> //Using CheckedState wasn't UI friendly on the Storybook
  // }
}
