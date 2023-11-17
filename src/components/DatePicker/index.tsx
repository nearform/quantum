'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import { Calendar } from './Calendar'
import { Button } from '../Button'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"


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

  const [date, setDate] = React.useState<Date>()

  // return (
  //   <Popover>
  //     <PopoverTrigger asChild>
  //       <input
  //         // variant={"input"}
  //         className={cn(
  //           "w-[280px] justify-start text-left font-normal",
  //           !date && "text-muted-foreground"
  //         )}
  //         value={date ? format(date, "PPP") : 'Pick a date'}
  //       />
  //         {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
  //         {/* {<span>Pick a date</span>} */}

  //     </PopoverTrigger>
  //     <PopoverContent className="w-auto p-0">
  //       <Calendar
  //         mode="single"
  //         selected={date}
  //         onSelect={setDate}
  //         initialFocus
  //       />
  //     </PopoverContent>
  //   </Popover>
  // )

  return (
    <div className="relative max-w-sm">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
      </div>
      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
    </div>
  )

  })

export { DatePicker, DatePickerProps }