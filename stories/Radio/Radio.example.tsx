import { Radio, RadioGroup } from '@/components/Radio'
import { useState } from 'react'

export const RadioGroupDemo = (): JSX.Element => {
  return (
    <RadioGroup defaultValue="hello">
      <Radio value="hello" />
      <Radio value="world" />
      <Radio value="goodbye" />
      <Radio value="friend" />
    </RadioGroup>
  )
}
