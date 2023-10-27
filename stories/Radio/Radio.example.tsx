import { Label } from '@/components/Label'
import { Radio, RadioGroup } from '@/components/Radio'
import { useState } from 'react'
export const RadioGroupDemo = ({
  defaultValue,
  disabled,
  loop
}: {
  defaultValue?: string
  disabled?: boolean
  loop?: boolean
}): JSX.Element => {
  const [value, setValue] = useState(defaultValue)
  const handleValueChange = (newValue: string) => {
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      loop={loop}
    >
      <RadioWithLabel value="hello" />
      <RadioWithLabel value="world" />
      <RadioWithLabel value="goodbye" />
      <RadioWithLabel value="friend" />
    </RadioGroup>
  )
}
const RadioWithLabel = ({ value }: { value: string }) => {
  return (
    <span className="flex items-center space-x-1">
      <Radio value={value} />
      <Label htmlFor={value}>{value}</Label>
    </span>
  )
}
