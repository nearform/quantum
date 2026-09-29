import { useState } from 'react'
import { DateInput, DateInputProps } from '@/index'

const DateInputDemo = ({ value = null, ...props }: DateInputProps) => {
  const [date, setDate] = useState<Date | null>(value)

  return (
    <DateInput
      {...props}
      value={date}
      onValueChange={(next, details) => {
        props.onValueChange?.(next, details)
        setDate(next)
      }}
    />
  )
}
export { DateInputDemo }
