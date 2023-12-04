'use client'

import * as React from 'react'

import { Calendar } from '@/index'

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return <Calendar mode="single" selected={date} onSelect={setDate} />
}
