import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { assertsInvalid, cn } from '@/lib/utils'
import { BsCheck, BsDash } from '@/assets'
import { cva } from 'class-variance-authority'

/**
 * The border colour is a variant rather than a set of `aria-[invalid=true]:`
 * rules layered over the default one, because layering them would leave the
 * outcome to the cascade: `data-[state=checked]:border-border` and an
 * `aria-[invalid=true]:` rule have the same specificity, so which one a ticked
 * invalid box actually draws would come down to the order Tailwind happens to
 * emit the two variants in. A variant emits one of the two sets and not the
 * other, so there is nothing to resolve.
 */
const checkboxVariants = cva(
  [
    [
      'peer',
      'h-5 w-5',
      'p-0.5',
      'shrink-0',
      'gap-0',
      'rounded-brandXs',
      'border',
      'bg-white',
      // A solid midnight-30 treatment, the same one the label uses. Opacity
      // would wash the box into a different colour than that text.
      'disabled:cursor-not-allowed',
      'disabled:border-brandMidnight-30',
      'disabled:bg-brandMidnight-10',
      'disabled:data-[state=checked]:border-brandMidnight-30',
      'disabled:data-[state=checked]:bg-brandMidnight-30',
      'disabled:data-[state=checked]:text-white',
      'disabled:data-[state=indeterminate]:border-brandMidnight-30',
      'disabled:data-[state=indeterminate]:bg-brandMidnight-30',
      'disabled:data-[state=indeterminate]:text-white',
      'dark:disabled:border-brandMidnight-50',
      'dark:disabled:bg-brandDark-raised',
      'dark:disabled:data-[state=checked]:border-brandMidnight-50',
      'dark:disabled:data-[state=checked]:bg-brandMidnight-50',
      'dark:disabled:data-[state=checked]:text-brandMidnight-100',
      'dark:disabled:data-[state=indeterminate]:border-brandMidnight-50',
      'dark:disabled:data-[state=indeterminate]:bg-brandMidnight-50',
      'dark:disabled:data-[state=indeterminate]:text-brandMidnight-100',
      'focus-visible:outline-hidden',
      'focus-visible:border-brandBlue-100',
      'focus-visible:ring-[3px]',
      'focus-visible:ring-brandBlue-10',
      'dark:focus-visible:border-brandBlue-80',
      'dark:focus-visible:ring-0',
      'dark:focus-visible:outline-solid',
      'dark:focus-visible:outline-2',
      'dark:focus-visible:outline-offset-2',
      'dark:focus-visible:outline-brandGreen-100'
    ],
    [
      'data-[state=checked]:bg-brandMidnight-100',
      'data-[state=checked]:border-brandMidnight-100',
      'data-[state=checked]:text-white',
      'data-[state=indeterminate]:bg-brandMidnight-100',
      'data-[state=indeterminate]:border-brandMidnight-100',
      'data-[state=indeterminate]:text-white'
    ],
    [
      'dark:data-[state=unchecked]:bg-brandDark-surface',
      'dark:data-[state=checked]:bg-brandGreen-100',
      'dark:data-[state=checked]:text-brandMidnight-100',
      'dark:data-[state=indeterminate]:bg-brandGreen-100',
      'dark:data-[state=indeterminate]:text-brandMidnight-100'
    ]
  ],
  {
    variants: {
      /**
       * Driven by the box's own `aria-invalid` rather than by a prop of its
       * own, so the box that announces itself as invalid is the box that looks
       * it and the two cannot drift apart.
       *
       * `red-400` in dark mode: `feedback-red` is 3.66:1 on the dark page
       * background, and a border owes 3:1 under 1.4.11 on every surface a
       * group can sit on. Not `FieldError`'s `red-300`, which the message
       * takes because text owes 4.5:1 -- at 20px across, that weight reads as
       * pale grey rather than as red, and the border's whole job is to say
       * "this one". `red-400` is 4.14:1 at its worst, which is the dark
       * surface a card puts under it.
       */
      invalid: {
        true: ['border-feedback-danger', 'dark:border-feedback-dangerDark'],
        false: [
          'border-brandMidnight-100',
          'data-[state=checked]:border-brandMidnight-100',
          'dark:data-[state=unchecked]:border-brandMidnight-30',
          'dark:data-[state=checked]:border-brandGreen-100',
          'dark:data-[state=indeterminate]:border-brandGreen-100'
        ]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
)

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      checkboxVariants({ invalid: assertsInvalid(props['aria-invalid']) }),
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-inherit')}
    >
      {(props.checked === true || props.checked === undefined) && (
        <BsCheck className="text-inherit stroke-current stroke-1 fill-current" />
      )}
      {props.checked === 'indeterminate' && (
        <BsDash className="text-inherit stroke-current stroke-1 fill-current" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, type CheckboxProps }
