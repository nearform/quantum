'use client'

import * as React from 'react'

import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import ArrowLeftIcon from '@/assets/build/arrow-left.icon'
import ArrowRightIcon from '@/assets/build/arrow-right.icon'
// import { buttonVariants } from '@/components/ui/button'
import { cva } from 'class-variance-authority'
export type CalendarProps = React.ComponentProps<typeof DayPicker>

const calendarVariants = cva([], {
  variants: {
    component: {
      months: ['flex', 'flex-col', 'gap-2'],
      caption: ['flex justify-center py-0.5 relative items-center'],
      caption_label: ['text-sm', 'font-medium'],
      nav: ['h-7 w-7', 'bg-transparent', 'opacity-50', 'hover:opacity-100'],
      nav_button: [
        'h-7',
        'w-7',
        'bg-transparent',
        'p-0 opacity-50',
        'hover:opacity-100'
      ],
      head_cell: [
        'text-foreground-muted',
        'dark:text-foreground-muted-dark',
        'px-1',
        'py-2',
        'w-9',
        'font-semibold',
        'text-xs',
        'h-[34px]'
      ],
      cell: [
        'rounded-lg',
        'overflow-none',
        'w-9',
        'p-0',
        'flex',
        'flex-col',
        'items-center',
        'text-center',
        'gap-1',
        'text-sm',
        'relative',
        '[&:has([aria-selected].day-range-end.day-range-start)]:rounded-lg',
        '[&:has([aria-selected].day-range-end)]:rounded-l-none',
        '[&:has([aria-selected].day-range-start)]:rounded-r-none',
        '[&:has([aria-selected].day-outside)]:bg-accent/50',
        '[&:has([aria-selected])]:bg-accent',
        'dark:[&:has([aria-selected])]:bg-blue-400',
        'focus-within:relative',
        'focus-within:z-20'
      ],
      day: cn([
        'rounded-lg',
        'px-1',
        'w-full',
        'py-2',
        'h-[34px]',
        'flex',
        'flex-col',
        'text-sm',
        'font-bold',
        'aria-selected:opacity-100',
        'items-center',
        'shrink-0',
        'focus-visible:shadow-blue',
        'outline-none'
      ]),
      day_selected: ['text-foreground-inverse'],
      day_outside: [
        'day-outside',
        'text-muted-foreground',
        'opacity-50',
        'aria-selected:bg-accent/50',
        'aria-selected:text-muted-foreground',
        'aria-selected:opacity-30'
      ]
    }
  }
})

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
        months: calendarVariants({ component: 'months' }),
        month: calendarVariants({ component: 'months' }),
        caption: calendarVariants({ component: 'caption' }),
        caption_label: calendarVariants({ component: 'caption_label' }),
        nav: calendarVariants({ component: 'nav' }),
        nav_button: calendarVariants({ component: 'nav_button' }),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-0',
        head_row: 'flex',
        head_cell: calendarVariants({ component: 'head_cell' }),
        row: 'flex w-full',
        cell: calendarVariants({ component: 'cell' }),
        day: calendarVariants({ component: 'day' }),
        day_range_end: 'day-range-end',
        day_range_start: 'day-range-start',
        day_selected: calendarVariants({ component: 'day_selected' }),
        day_outside: calendarVariants({ component: 'day_outside' }),
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent dark:aria-selected:bg-blue-400 rounded-none',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ArrowLeftIcon className="h-5 w-5" />,
        IconRight: ({ ...props }) => <ArrowRightIcon className="h-5 w-5" />
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
