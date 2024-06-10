import { useState } from 'react'
import { Password, PasswordProps } from '@/index'

const PasswordDemo = ({
  variant,
  toggleMask,
  disabled,
  value
}: PasswordProps) => {
  const [trackedValue, setTrackedValue] = useState(value)

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTrackedValue(e.currentTarget.value)
  }

  return (
    <Password
      variant={variant}
      value={trackedValue}
      onChange={handleOnChange}
      disabled={disabled}
      toggleMask={toggleMask}
    />
  )
}
export { PasswordDemo }
