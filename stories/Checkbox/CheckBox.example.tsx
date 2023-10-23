import { Checkbox } from '@/components/Checkbox'

export const CheckboxDemo = ({
  checked
}: {
  checked: boolean
}): JSX.Element => {
  return <Checkbox checked={checked} />
}
