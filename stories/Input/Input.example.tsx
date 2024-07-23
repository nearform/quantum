import { useState } from 'react'
import { Input, InputProps } from '@/index'

const InputDemo = (props: Omit<InputProps, 'onChange' | 'onClear'>) => {
  const [value, setValue] = useState('')
  const handleOnClear = () => {
    setValue('')
  }
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  return (
    <Input
      value={value}
      onClear={handleOnClear}
      onChange={handleOnChange}
      {...props}
    />
  )
}
export { InputDemo }
