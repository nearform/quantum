import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'
import {
  ChoiceGroupContext,
  ChoiceGroupFieldset,
  choiceGroupItemsVariants
} from '../choice-group'

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** The group's name, rendered as its `<legend>`. */
  legend?: React.ReactNode
  /** Hint under the legend, announced when focus enters the group. */
  description?: React.ReactNode
  /** Validation message under the options, announced the same way. */
  error?: React.ReactNode
  /**
   * Marks the options invalid independently of `error`, and wins over it in
   * both directions -- the same split `FormGroup` and `CheckboxGroup` draw.
   */
  invalid?: boolean
  /** Which side of its control each label sits on. */
  labelPosition?: 'left' | 'right'
  /** Classes for the `<fieldset>` the group renders. */
  className?: string
}

/**
 * A set of radios that belong to one question, of which exactly one can be
 * chosen.
 *
 * ```tsx
 * <RadioGroup legend="Delivery" defaultValue="standard" name="delivery">
 *   <Radio value="standard" label="Standard" description="3-5 working days" />
 *   <Radio value="express" label="Express" description="Next working day" />
 * </RadioGroup>
 * ```
 *
 * `orientation` now lays the options out as well as setting which arrow keys
 * move between them -- it used to do only the second, which meant a horizontal
 * group was a column you navigated with the left and right arrows. The two
 * were never independent in practice: a reader arrows in the direction the
 * options are drawn.
 *
 * `className` lands on the `<fieldset>`, which is the group's outermost
 * element and the one to size or space. Spacing between the options is
 * `orientation`'s job.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      legend,
      description,
      error,
      invalid,
      labelPosition = 'right',
      orientation = 'vertical',
      className,
      ...props
    },
    ref
  ) => {
    const isInvalid = invalid ?? Boolean(error)
    const groupContext = React.useMemo(
      () => ({ invalid: isInvalid, labelPosition, disabled: props.disabled }),
      [isInvalid, labelPosition, props.disabled]
    )

    return (
      <ChoiceGroupFieldset
        legend={legend}
        description={description}
        error={error}
        disabled={props.disabled}
        className={className}
      >
        <ChoiceGroupContext.Provider value={groupContext}>
          <RadioGroupPrimitive.Root
            className={cn(
              choiceGroupItemsVariants({ orientation, labelPosition })
            )}
            orientation={orientation}
            {...props}
            ref={ref}
          />
        </ChoiceGroupContext.Provider>
      </ChoiceGroupFieldset>
    )
  }
)
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export { RadioGroup, type RadioGroupProps }
