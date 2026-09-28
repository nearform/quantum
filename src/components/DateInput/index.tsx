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

const withinBounds = (date: Date, min?: Date, max?: Date) => {
  const day = startOfDay(date)
  return !(min && day < startOfDay(min)) && !(max && day > startOfDay(max))
}

type DateInputInvalidReason = 'format' | 'range'

interface ReadDate {
  date: Date | null
  reason: DateInputInvalidReason | null
}

const readDate = (
  text: string,
  pattern: string,
  min?: Date,
  max?: Date
): ReadDate => {
  const trimmed = text.trim()
  if (!trimmed) {
    return { date: null, reason: null }
  }
  const date = parse(trimmed, pattern, new Date())
  if (!isValid(date) || date.getFullYear() < 1000) {
    return { date: null, reason: 'format' }
  }
  return withinBounds(date, min, max)
    ? { date, reason: null }
    : { date: null, reason: 'range' }
}

const describeRange = (pattern: string, min?: Date, max?: Date) => {
  if (min && max) {
    return `Enter a date from ${formatDate(min, pattern)} to ${formatDate(max, pattern)}`
  }
  if (min) {
    return `Enter a date on or after ${formatDate(min, pattern)}`
  }
  if (max) {
    return `Enter a date on or before ${formatDate(max, pattern)}`
  }
  return ''
}

const validOrNull = (date: Date | null | undefined) =>
  date && isValid(date) ? date : null

const sameDay = (a: Date | null, b: Date | null) =>
  a === b || (!!a && !!b && a.toDateString() === b.toDateString())

interface DateInputValueDetails {
  text: string
  invalid: boolean
  reason: DateInputInvalidReason | null
}

interface DateInputProps extends Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'size' | 'type' | 'value' | 'defaultValue' | 'min' | 'max'
> {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null, details: DateInputValueDetails) => void
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
  invalidMessage?: string
  rangeMessage?: string
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
      invalidMessage = 'Enter a valid date',
      rangeMessage,
      disabled,
      readOnly,
      form,
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
    const selected = validOrNull(isControlled ? value : internalValue)
    const selectedDay = selected ? startOfDay(selected).getTime() : null

    const [text, setText] = React.useState(() =>
      selected ? formatDate(selected, format) : ''
    )
    const [open, setOpen] = React.useState(false)
    const [showInvalid, setShowInvalid] = React.useState(false)

    const minTime = validOrNull(min)?.getTime()
    const maxTime = validOrNull(max)?.getTime()
    const lower = minTime === undefined ? undefined : new Date(minTime)
    const upper = maxTime === undefined ? undefined : new Date(maxTime)

    const { reason } = readDate(text, format, lower, upper)
    const invalid = reason !== null

    const commit = (
      date: Date | null,
      nextText: string,
      nextReason: DateInputInvalidReason | null
    ) => {
      if (sameDay(date, selected) && nextReason === reason) {
        return
      }
      if (!isControlled) {
        setInternalValue(date)
      }
      onValueChange?.(date, {
        text: nextText,
        invalid: nextReason !== null,
        reason: nextReason
      })
    }

    React.useEffect(() => {
      setText(current => {
        const parsed = readDate(current, format, lower, upper).date
        if (selected) {
          return sameDay(parsed, selected)
            ? current
            : formatDate(selected, format)
        }
        return parsed ? '' : current
      })
    }, [selectedDay, format, minTime, maxTime])

    React.useEffect(() => {
      if (selected && !withinBounds(selected, lower, upper)) {
        commit(null, formatDate(selected, format), 'range')
        setShowInvalid(true)
      }
    }, [selectedDay, format, minTime, maxTime])

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const validityMessage =
      reason === 'range'
        ? (rangeMessage ?? describeRange(format, lower, upper))
        : reason === 'format'
          ? invalidMessage
          : ''

    React.useEffect(() => {
      inputRef.current?.setCustomValidity(validityMessage)
    }, [validityMessage])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextText = event.target.value
      const next = readDate(nextText, format, lower, upper)
      setText(nextText)
      commit(next.date, nextText, next.reason)
      if (next.reason === null) {
        setShowInvalid(false)
      }
      onChange?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const { date } = readDate(text, format, lower, upper)
      if (date) {
        setText(formatDate(date, format))
      }
      setShowInvalid(invalid)
      onBlur?.(event)
    }

    const handleSelect = (next: Date) => {
      const nextText = formatDate(next, format)
      setText(nextText)
      commit(next, nextText, null)
      setShowInvalid(false)
      setOpen(false)
    }

    const flagged = showInvalid && invalid
    const shownVariant = flagged ? 'error' : variant

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
    if (lower) {
      disabledDays.push({ before: startOfDay(lower) })
    }
    if (upper) {
      disabledDays.push({ after: startOfDay(upper) })
    }

    const field = (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div
            className={cn(
              formVariants({ variant: shownVariant, size }),
              formClassName
            )}
          >
            <input
              id={inputId}
              type="text"
              autoComplete="off"
              className={cn(
                dateInputVariants({ variant: shownVariant }),
                className
              )}
              ref={setRefs}
              form={form}
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder ?? hint}
              aria-describedby={describedBy}
              aria-invalid={
                ariaInvalid ?? (shownVariant === 'error' || undefined)
              }
              {...props}
            />
            <span id={formatHintId} className="sr-only">
              {hint}
            </span>
            <PopoverPrimitive.Trigger
              type="button"
              disabled={disabled || readOnly}
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
              required
              autoFocus
              selected={selected ?? undefined}
              onSelect={handleSelect}
              defaultMonth={selected ?? undefined}
              startMonth={lower}
              endMonth={upper}
              disabled={disabledDays}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
        {name && (
          <input
            type="hidden"
            name={name}
            form={form}
            disabled={disabled}
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

export {
  DateInput,
  DateInputProps,
  DateInputValueDetails,
  DateInputInvalidReason
}
