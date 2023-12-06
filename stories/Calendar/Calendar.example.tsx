import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import * as React from 'react'
import { Calendar, CalendarProps } from '@/index'

export function CalendarDemo({
  mode = 'single',
  numberOfMonths = 1
}: CalendarProps) {
  if (mode === 'single' || mode === 'default') {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return <Calendar mode={mode} selected={date} onSelect={setDate} />
  } else if (mode === 'multiple') {
    const [days, setDays] = React.useState<Date[] | undefined>()
    return <Calendar mode={mode} selected={days} onSelect={setDays} />
  } else if (mode === 'range') {
    const today = new Date()
    const defaultSelected: DateRange = {
      from: today,
      to: addDays(today, 7)
    }
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
    return (
      <Calendar
        mode={mode}
        selected={range}
        onSelect={setRange}
        numberOfMonths={numberOfMonths}
        showOutsideDays={false}
      />
    )
  }
}
