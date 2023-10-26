import { Label } from '@/components/Label'
import { Radio, RadioGroup } from '@/components/Radio'
import { useState } from 'react'
export const RadioGroupDemo = ({
  defaultValue,
  orientation
}: {
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical' | undefined
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
      orientation={'vertical'}
    >
      <span className="flex" />
      <RadioWithLabel value="hello" />
      <RadioWithLabel value="world" />
      <RadioWithLabel value="goodbye" />
      <RadioWithLabel value="friend" />
      <span />
    </RadioGroup>
  )
}
const RadioWithLabel = ({ value }: { value: string }) => {
  return (
    <span className="space-x-1">
      <Radio value={value} />
      <Label htmlFor={value}>{value}</Label>
    </span>
  )
}
