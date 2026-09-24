import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { assertsInvalid, cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BsCircleFill } from '@/assets'
import { ChoiceItem, resolveAriaInvalid, useChoiceGroup } from '../choice-group'

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode
  /** Hint for this option alone, announced with the radio it belongs to. */
  description?: React.ReactNode
}

/**
 * The border colour is a variant rather than a set of `aria-[invalid=true]:`
 * rules layered over the default one, for the reason `Checkbox` spells out:
 * layered, which rule a selected invalid radio draws would be decided by the
 * order Tailwind emits two equally specific variants in.
 */
const radioVariant = cva(
  [
    [
      'h-5 w-5',
      'rounded-full',
      'border',
      'bg-white',
      'disabled:cursor-not-allowed',
      'disabled:border-brandMidnight-30',
      'disabled:bg-brandMidnight-10',
      'disabled:data-[state=checked]:border-brandMidnight-30',
      'disabled:data-[state=checked]:bg-brandMidnight-30',
      'dark:disabled:border-brandMidnight-50',
      'dark:disabled:bg-brandDark-raised',
      'dark:disabled:data-[state=checked]:border-brandMidnight-50',
      'dark:disabled:data-[state=checked]:bg-brandMidnight-50',
      'dark:disabled:data-[state=checked]:text-brandMidnight-100',
      'text-white',
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
      'data-[state=checked]:border-brandMidnight-100'
    ],
    [
      'dark:bg-brandDark-surface',
      'dark:data-[state=checked]:bg-brandGreen-100',
      'dark:data-[state=checked]:border-brandGreen-100',
      'dark:data-[state=checked]:text-brandMidnight-100'
    ]
  ],
  {
    variants: {
      /** Driven by the radio's own `aria-invalid`. See `Checkbox`. */
      invalid: {
        true: ['border-feedback-danger', 'dark:border-feedback-dangerDark'],
        false: [
          'border-brandMidnight-100',
          'data-[state=checked]:border-brandMidnight-100',
          'dark:border-brandMidnight-30',
          'dark:data-[state=checked]:border-brandGreen-100'
        ]
      }
    },
    defaultVariants: {
      invalid: false
    }
  }
)

/**
 * One radio in a `RadioGroup`, with the label and hint that belong to it.
 *
 * Without a `label` it renders as the bare control it always has, for the
 * `ControlLabel` pairing the stories used to show; with one it brings its own
 * label, and the hint is wired to the control rather than left as text beside
 * it.
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    {
      className,
      label,
      description,
      id,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ownAriaInvalid,
      ...props
    },
    ref
  ) => {
    const group = useChoiceGroup()
    const generatedId = React.useId()
    const controlId = id ?? generatedId
    const descriptionId = `${controlId}-description`

    // One resolved value behind both the attribute and the border, so an
    // option cannot announce one state and render the other.
    const ariaInvalid = resolveAriaInvalid(
      ownAriaInvalid,
      Boolean(group?.invalid)
    )
    const describedBy =
      [ariaDescribedBy, description ? descriptionId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    return (
      <ChoiceItem
        controlId={controlId}
        descriptionId={descriptionId}
        label={label}
        description={description}
        disabled={props.disabled ?? group?.disabled}
        labelPosition={group?.labelPosition ?? 'right'}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={controlId}
          className={cn(
            radioVariant({ invalid: assertsInvalid(ariaInvalid) }),
            className
          )}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <BsCircleFill
              size="8"
              className="text-inherit stroke-current stroke-1 fill-current"
            />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      </ChoiceItem>
    )
  }
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroupItem as Radio, RadioGroupItemProps }
