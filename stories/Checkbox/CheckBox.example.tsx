import { Checkbox } from '@/components/Checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'
import { useState } from 'react'
export const CheckboxDemo = ({
  checked
}: {
  checked: CheckboxProps['checked']
}): JSX.Element => {
  const [check, setCheck] = useState<typeof checked>(checked)
  const handleOnCheckChanged = () => {
    if (check !== 'indeterminate') {
      setCheck(!check)
    }
  }
  return <Checkbox checked={check} onCheckedChange={handleOnCheckChanged} />
}
