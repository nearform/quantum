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
      'rounded',
      'border',
      'bg-background-alt',
      // The same dimming `Radio` has always had. Without it a disabled box was
      // indistinguishable from a live one -- only its label dimmed, which
      // reads as the label being disabled rather than the control.
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'focus-visible:outline-hidden',
      'focus-visible:shadow-brandGreen',
      'dark:focus-visible:shadow-brandGreen-10'
    ],
    [
      'data-[state=checked]:bg-border',
      'data-[state=checked]:text-foreground-inverse',
      'data-[state=indeterminate]:bg-border',
      'data-[state=indeterminate]:text-foreground-inverse'
    ],
    [
      'dark:data-[state=unchecked]:bg-background-alt-dark',
      'dark:data-[state=checked]:bg-border-dark'
    ]
  ],
  {
    variants: {
      /**
       * Driven by the box's own `aria-invalid` rather than by a prop of its
       * own, so the box that announces itself as invalid is the box that looks
       * it and the two cannot drift apart.
       *
       * `red-400` in dark mode: `feedback-error` is 3.66:1 on the dark page
       * background, and a border owes 3:1 under 1.4.11 on every surface a
       * group can sit on. Not `FieldError`'s `red-300`, which the message
       * takes because text owes 4.5:1 -- at 20px across, that weight reads as
       * pale grey rather than as red, and the border's whole job is to say
       * "this one". `red-400` is 4.14:1 at its worst, which is the dark
       * surface a card puts under it.
       */
      invalid: {
        true: ['border-feedback-error', 'dark:border-red-400'],
        false: [
          'border-border',
          'data-[state=checked]:border-border',
          'dark:data-[state=unchecked]:border-border-dark',
          'dark:data-[state=checked]:border-border-dark'
        ]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
)

interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {}

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
