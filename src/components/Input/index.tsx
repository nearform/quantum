import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BsX, BsSearch } from '@/assets'

/**
 * The design draws the leading icon at 16x16, so the size is set here rather
 * than left to the icon that is passed in. `react-icons` renders at `1em`,
 * which ties every glyph to whatever font size the field inherits -- a search
 * icon and a caller's own icon then come out at different sizes in the same
 * form, and both move when the surrounding text does.
 */
const leftSideVariants = cva([
  'flex',
  'shrink-0',
  'items-center',
  'text-inherit',
  '[&>svg]:h-4',
  '[&>svg]:w-4'
])

/**
 * The clear control is a 24x24 target around a 12x12 glyph: the cross is drawn
 * at 12, and 24 is the smallest target WCAG 2.5.8 accepts. The negative margin
 * is half the difference between the two -- the padding the target gains on
 * the right is taken back out of the field's own padding, so the target grows
 * around the cross rather than pushing it inwards, and the cross stays exactly
 * where the design puts it.
 */
const rightSideVariants = cva([
  'flex',
  'h-6',
  'w-6',
  'shrink-0',
  '-mr-1.5',
  'items-center',
  'justify-center',
  'self-center text-inherit',
  'rounded-xs',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-current',
  '[&>svg]:h-3',
  '[&>svg]:w-3'
])

const formVariants = cva(
  [
    'flex',
    'border',
    'rounded-brandControl',
    'overflow-hidden',
    'px-3',
    'items-center',
    'gap-1.5',
    // Brand disabled fields keep the 1px border and swap to a solid
    // midnight-10 fill with midnight-30 text. Opacity would wash that text
    // into a different colour than the one the brand specifies.
    '[&:has(:disabled)]:bg-brandMidnight-10',
    '[&:has(:disabled)]:text-brandMidnight-30',
    '[&:has(:disabled)]:cursor-not-allowed',
    '[&:has(:disabled)]:hover:border-brandGrey-30',
    'dark:[&:has(:disabled)]:bg-brandDark-raised',
    'dark:[&:has(:disabled)]:text-brandMidnight-50',
    'dark:[&:has(:disabled)]:hover:border-brandDark-border'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-brandGrey-30',
          'bg-white',
          'text-brandMidnight-100',
          'dark:border-brandDark-border',
          'dark:bg-brandDark-surface',
          'dark:text-white',
          'hover:border-brandGrey-80',
          'hover:focus-within:border-brandBlue-100',
          'dark:hover:focus-within:border-brandBlue-80',
          'focus-within:border-brandBlue-100',
          'focus-within:ring-[3px]',
          'focus-within:ring-brandBlue-10',
          'dark:focus-within:border-brandBlue-80',
          'dark:focus-within:ring-0',
          'dark:focus-within:outline-solid',
          'dark:focus-within:outline-2',
          'dark:focus-within:outline-offset-2',
          'dark:focus-within:outline-brandGreen-100'
        ],
        error: [
          'border-feedback-danger',
          'text-feedback-danger',
          'bg-feedback-danger10',
          'hover:border-feedback-danger',
          'focus-within:shadow-red'
        ],
        success: [
          'border-feedback-success',
          'text-feedback-success',
          'bg-feedback-success10',
          'hover:border-feedback-success',
          'focus-within:shadow-green'
        ]
      },
      /**
       * `sm` and `default` are the two heights the design file specifies, and
       * the field had neither: its height was a 12px padding plus whatever
       * line box the inherited font produced, which was 40px when #264 was
       * filed and is 52px today. The design has no size that follows the text
       * like that.
       *
       * So they are heights rather than a padding that adds up to one. A
       * disabled field keeps this height and its 1px border; dropping the
       * border used to leave it 4px shorter than every other field.
       *
       * The two of them match `Select`'s `sm` and `lg` to the pixel, which is
       * what lets a select and an input sit next to each other in a row. The
       * names do not match, and cannot: 42px is the size the design calls
       * regular, so it is the default here, and `Select` had already spent
       * `lg` on it.
       *
       * `lg` is not in the design file. It is 48px because that is the height
       * of a large `Button` -- both of its variants, which is what the
       * compound variants in `Button` are there to line up -- so a large field
       * and the button that submits it are the same height.
       */
      size: {
        sm: ['h-[37px]'],
        default: ['h-10'],
        lg: ['h-[48px]']
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

const inputVariants = cva(
  [
    'flex',
    'flex-grow',
    'items-center',
    'outline-hidden',
    'bg-transparent',
    'disabled:text-brandMidnight-30',
    'disabled:placeholder:text-brandMidnight-30',
    'dark:disabled:text-brandMidnight-50',
    'dark:disabled:placeholder:text-brandMidnight-50'
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-brandMidnight-100',
          'dark:text-white',
          'placeholder:text-brandMidnight-30'
        ],
        error: ['text-feedback-danger', 'placeholder:text-feedback-danger'],
        success: ['text-feedback-success', 'placeholder:text-feedback-success']
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {})

/**
 * `size` is the field's height rather than the HTML attribute of that name,
 * which is omitted. The attribute asks for a width in characters, and the
 * `<input>` here is `flex-grow` inside the field, so it was already being
 * overruled by the layout before it could mean anything.
 */
interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  variant: 'primary' | 'error' | 'success'
  size?: 'sm' | 'default' | 'lg'
  type: InputType
  formClassName?: string
  leftSideClassName?: string
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
  labelText?: string
  helpText?: string
  clearLabel?: string
  onClear: () => void
}

const convertTypeToLeftComponent = (type: InputType) => {
  const mapping: Partial<Record<InputType, React.ReactNode>> = {
    search: <BsSearch aria-hidden="true" />
  }
  return mapping[type] ?? null
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      id,
      className,
      formClassName,
      leftSideClassName,
      variant,
      size,
      leftSideChild,
      rightSideChild,
      labelText,
      helpText,
      clearLabel = 'Clear input',
      onClear,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const helpTextId = `${inputId}-helptext`
    const describedBy =
      [ariaDescribedby, helpText ? helpTextId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const leftSideComponent = leftSideChild ?? convertTypeToLeftComponent(type)
    const rightSideComponent = rightSideChild ?? (
      <BsX strokeWidth={0.6} aria-hidden="true" />
    )

    const field = (
      <div className={cn(formVariants({ variant, size }), formClassName)}>
        {leftSideComponent && (
          <div className={cn(leftSideVariants(), leftSideClassName)}>
            {leftSideComponent}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          aria-describedby={describedBy}
          {...props}
        />
        <button
          type="button"
          onClick={onClear}
          aria-label={clearLabel}
          disabled={props.disabled}
          className={rightSideVariants()}
        >
          {rightSideComponent}
        </button>
      </div>
    )

    if (!labelText && !helpText) {
      return field
    }

    return (
      <div className="flex flex-col gap-3">
        {labelText && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-label font-medium text-brandMidnight-100 dark:text-white',
              props.disabled &&
                'text-brandMidnight-30 dark:text-brandMidnight-50'
            )}
          >
            {labelText}
          </label>
        )}
        {field}
        {helpText && (
          <span
            id={helpTextId}
            className="text-caption text-brandMidnight-50 dark:text-brandMidnight-30"
          >
            {helpText}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, InputProps, formVariants }
