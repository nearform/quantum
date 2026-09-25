import { useState } from 'react'
import { Password, PasswordProps } from '@/index'

const PasswordDemo = ({
  variant,
  size,
  toggleMask,
  disabled,
  value,
  labelText
}: PasswordProps) => {
  const [trackedValue, setTrackedValue] = useState(value)

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTrackedValue(e.currentTarget.value)
  }

  return (
    <Password
      variant={variant}
      size={size}
      value={trackedValue}
      onChange={handleOnChange}
      disabled={disabled}
      toggleMask={toggleMask}
      labelText={labelText}
    />
  )
}
export { PasswordDemo }
