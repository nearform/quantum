'use client'

import * as React from 'react'

import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import ArrowLeftIcon from '@/assets/build/arrow-left.icon'
import ArrowRightIcon from '@/assets/build/arrow-right.icon'
// import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'p-4 rounded-lg bg-background-alt dark:bg-background-alt-dark dark:text-foreground-inverse shadow-[0_4px_6px_0px_rgba(0,0,0,0.08)]',
        className
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0',
        month: 'flex flex-col gap-2 sm:flex-row',
        caption: 'flex justify-center py-0.5 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center fill-current',
        nav_button: cn(
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 '
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-0',
        head_row: 'flex',
        head_cell:
          'text-foreground-muted dark:text-foreground-muted-dark px-1 py-2 w-9 font-semibold text-xs h-[34px]',
        row: 'flex w-full',
        cell: 'w-9 p-0 flex flex-col items-center text-center rounded-lg gap-1 text-sm relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent  focus-within:relative focus-within:z-20',
        day: cn(
          'px-1 w-full py-2 h-[34px] flex flex-col text-sm font-bold aria-selected:opacity-100 rounded-lg items-center shrink-0 focus-visible:shadow-blue outline-none'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-accent dark:bg-blue-400 rounded-lg text-foreground-inverse hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: '',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ArrowLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ArrowRightIcon className="h-4 w-4" />
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
