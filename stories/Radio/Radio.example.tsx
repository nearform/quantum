import { Label } from '@/components/Label'
import { Radio, RadioGroup, RadioGroupProps } from '@/components/Radio'
import { useState } from 'react'
export const RadioGroupDemo = ({
  defaultValue,
  disabled,
  loop
}: RadioGroupProps): JSX.Element => {
  const [value, setValue] = useState(defaultValue)
  const handleValueChange = (newValue: string) => {
    setValue(newValue)
  }
  return (
    <RadioGroup
      defaultValue={value}
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
    <div className="flex items-center space-x-2">
      <Radio value={value} />
      <Label htmlFor={value}>{value}</Label>
    </div>
  )
}
