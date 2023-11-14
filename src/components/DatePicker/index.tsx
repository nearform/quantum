'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import { Calendar } from './Calendar'
import { Button } from '../Button'
import { CalendarIcon } from 'lucide-react'

const datePickerVariants = cva(
  [
    'bg-gray-50',
    'border',
    'border-gray-300',
    'text-gray-900',
    'text-sm',
    'rounded-lg',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'block',
    'w-full',
    'ps-10',
    'p-2.5',
    'dark:bg-gray-700',
    'dark:border-gray-600',
    'dark:placeholder-gray-400',
    'dark:text-white',
    'dark:focus:ring-blue-500',
    'dark:focus:border-blue-500',
    '[&>*]::-webkit-calendar-picker-indicator:opacity-0'
  ],
  {
    variants: {
      size: {
        lg: 'text-lg',
        md: 'text-md',
        sm: 'text-sm',
        xs: 'text-xs',
        xl: 'text-xl'
      },
      state: {
        default: [],
        hover: [],
        focused: [],
        filled: [],
        error: [],
        success: [],
        disabled: []
      }
    }
  }
)

interface DatePickerProps {
  className?: string
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'xl'
}
const DatePicker = React.forwardRef<
  any,
  DatePickerProps
>(({ className, size, ...props }, ref) => {
//   (
//     <input type="date"
//     // ref={ref}
//     className={cn(datePickerVariants({ size }), className)}
//     {...props} />
// )

  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"primary"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date || <span>Pick a date</span>}
          {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )

  })

export { DatePicker, DatePickerProps }