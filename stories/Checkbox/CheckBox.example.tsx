import { Checkbox, CheckboxProps } from '@/components/Checkbox'
import { useState } from 'react'
export const CheckboxDemo = ({
  checked,
  className
}: {
  checked: CheckboxProps['checked']
  className?: string
}): JSX.Element => {
  const [check, setCheck] = useState<typeof checked>(checked)
  const handleOnCheckChanged = () => {
    if (check !== 'indeterminate') {
      setCheck(!check)
    }
  }
  return (
    <Checkbox
      checked={check}
      onCheckedChange={handleOnCheckChanged}
      className={className}
    />
  )
}
