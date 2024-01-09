import { Radio, RadioGroup, RadioGroupProps } from '@/components/'
import { ControlLabel } from '@/components/ControlLabel'

import { useState } from 'react'
export const RadioGroupDemo = ({
  defaultValue,
  disabled,
  loop,
  id,
  ...props
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
      {...props}
    >
      <ControlLabel htmlFor={`${id}-hello`} label="Hello">
        <Radio id={`${id}-hello`} value="hello" />
      </ControlLabel>
      <ControlLabel htmlFor={`${id}-world`} label="World">
        <Radio id={`${id}-world`} value="world" />
      </ControlLabel>
      <ControlLabel htmlFor={`${id}-goodbye`} label="Goodbye">
        <Radio id={`${id}-goodbye`} value="goodbye" />
      </ControlLabel>
      <ControlLabel htmlFor={`${id}-friend`} label="Friend">
        <Radio id={`${id}-friend`} value="friend" />
      </ControlLabel>
    </RadioGroup>
  )
}
