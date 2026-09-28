'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cva } from 'class-variance-authority'
import { format as formatDate, isValid, parse, startOfDay } from 'date-fns'
import type { Matcher } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { BsCalendar3 } from '@/assets'

import { Calendar } from '../Calendar'
import { formVariants } from '../Input'

const calendarTriggerVariants = cva([
  'flex',
  'h-6',
  'w-6',
  'shrink-0',
  '-mr-1',
  'items-center',
  'justify-center',
  'self-center text-inherit',
  'rounded-xs',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-current',
  'disabled:cursor-not-allowed',
  '[&>svg]:h-4',
  '[&>svg]:w-4'
])

const dateInputVariants = cva(
  [
    'flex',
    'flex-grow',
    'min-w-0',
    'items-center',
    'outline-hidden',
    'bg-transparent',
    'disabled:cursor-not-allowed'
  ],
  {
    variants: {
      variant: {
        primary: ['text-foreground', 'dark:text-foreground-dark'],
        error: ['text-feedback-error', 'dark:text-feedback-error-dark'],
        success: ['text-green-700', 'dark:text-feedback-success-dark']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

const ISO_FORMAT = 'yyyy-MM-dd'

const parseDate = (
  text: string,
  pattern: string,
  min?: Date,
  max?: Date
): Date | null => {
  const trimmed = text.trim()
  if (!trimmed) {
    return null
  }
  const date = parse(trimmed, pattern, new Date())
  if (!isValid(date) || date.getFullYear() < 1000) {
    return null
  }
  if (min && date < startOfDay(min)) {
    return null
  }
  if (max && date > startOfDay(max)) {
    return null
  }
  return date
}

const sameDay = (a: Date | null, b: Date | null) =>
  a === b || (!!a && !!b && a.toDateString() === b.toDateString())

interface DateInputProps extends Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'size' | 'type' | 'value' | 'defaultValue' | 'min' | 'max'
> {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
  format?: string
  formatHint?: string
  min?: Date
  max?: Date
  variant?: 'primary' | 'error' | 'success'
  size?: 'sm' | 'default' | 'lg'
  formClassName?: string
  labelText?: string
  helpText?: string
  calendarLabel?: string
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      id,
      name,
      className,
      formClassName,
      variant = 'primary',
      size,
      value,
      defaultValue = null,
      onValueChange,
      format = 'dd/MM/yyyy',
      formatHint,
      min,
      max,
      labelText,
      helpText,
      calendarLabel = 'Choose date',
      disabled,
      placeholder,
      onChange,
      onBlur,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const selected = isControlled ? value : internalValue

    const [text, setText] = React.useState(() =>
      selected ? formatDate(selected, format) : ''
    )
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      setText(current => {
        const parsed = parseDate(current, format, min, max)
        if (selected) {
          return sameDay(parsed, selected)
            ? current
            : formatDate(selected, format)
        }
        return parsed ? '' : current
      })
    }, [selected, format, min, max])

    const commit = (date: Date | null) => {
      if (sameDay(date, selected)) {
        return
      }
      if (!isControlled) {
        setInternalValue(date)
      }
      onValueChange?.(date)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
      commit(parseDate(event.target.value, format, min, max))
      onChange?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const parsed = parseDate(text, format, min, max)
      if (parsed) {
        setText(formatDate(parsed, format))
      }
      onBlur?.(event)
    }

    const handleSelect = (date: Date | undefined) => {
      const next = date ?? null
      setText(next ? formatDate(next, format) : '')
      commit(next)
      setOpen(false)
    }

    const hint = formatHint ?? format.toUpperCase()

    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const helpTextId = `${inputId}-helptext`
    const formatHintId = `${inputId}-format`
    const describedBy = [
      ariaDescribedby,
      formatHintId,
      helpText ? helpTextId : undefined
    ]
      .filter(Boolean)
      .join(' ')

    const disabledDays: Matcher[] = []
    if (min) {
      disabledDays.push({ before: startOfDay(min) })
    }
    if (max) {
      disabledDays.push({ after: startOfDay(max) })
    }

    const field = (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div className={cn(formVariants({ variant, size }), formClassName)}>
            <input
              id={inputId}
              type="text"
              autoComplete="off"
              className={cn(dateInputVariants({ variant }), className)}
              ref={ref}
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder ?? hint}
              aria-describedby={describedBy}
              aria-invalid={ariaInvalid ?? (variant === 'error' || undefined)}
              {...props}
            />
            <span id={formatHintId} className="sr-only">
              {hint}
            </span>
            <PopoverPrimitive.Trigger
              type="button"
              disabled={disabled}
              aria-label={calendarLabel}
              className={calendarTriggerVariants()}
            >
              <BsCalendar3 aria-hidden="true" />
            </PopoverPrimitive.Trigger>
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            aria-label={calendarLabel}
            className="z-50 outline-hidden"
            onOpenAutoFocus={event => event.preventDefault()}
          >
            <Calendar
              mode="single"
              autoFocus
              selected={selected ?? undefined}
              onSelect={handleSelect}
              defaultMonth={selected ?? undefined}
              startMonth={min}
              endMonth={max}
              disabled={disabledDays}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
        {name && (
          <input
            type="hidden"
            name={name}
            value={selected ? formatDate(selected, ISO_FORMAT) : ''}
          />
        )}
      </PopoverPrimitive.Root>
    )

    if (!labelText && !helpText) {
      return field
    }

    return (
      <div className="flex flex-col gap-3">
        {labelText && (
          <label
            htmlFor={inputId}
            className="text-m text-foreground dark:text-foreground-dark"
          >
            {labelText}
          </label>
        )}
        {field}
        {helpText && (
          <span
            id={helpTextId}
            className="text-sm text-foreground-muted dark:text-foreground-muted-dark"
          >
            {helpText}
          </span>
        )}
      </div>
    )
  }
)

DateInput.displayName = 'DateInput'

export { DateInput, DateInputProps }
