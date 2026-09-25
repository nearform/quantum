import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  ChoiceGroupContext,
  ChoiceGroupFieldset,
  choiceGroupItemsVariants,
  type ChoiceGroupFieldsetProps
} from '../choice-group'

interface CheckboxGroupContextValue {
  /** The values of the boxes that are currently ticked. */
  value: string[]
  toggle: (value: string, checked: boolean) => void
  /** Shared by every box in the group, so the set submits as one field. */
  name?: string
}

const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextValue | null>(null)

/**
 * The group's selection, for a `CheckboxGroupItem` to read. `null` outside a
 * group, where an item is an ordinary checkbox that keeps its own state.
 */
const useCheckboxGroup = () => React.useContext(CheckboxGroupContext)

interface CheckboxGroupProps extends Omit<
  ChoiceGroupFieldsetProps,
  'defaultValue' | 'onChange'
> {
  /** Ticked values. Supply it for a controlled group, with `onValueChange`. */
  value?: string[]
  /** Ticked values at first render, for a group that keeps its own state. */
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** Given to every box, so the group submits as one multi-valued field. */
  name?: string
  /** Lays the options out in a column or in a wrapping row. */
  orientation?: 'vertical' | 'horizontal'
  /** Which side of its control each label sits on. */
  labelPosition?: 'left' | 'right'
  /**
   * Marks the options invalid independently of `error`, and wins over it in
   * both directions -- the same split `FormGroup` draws, for the same reason:
   * `error` is what the group says, `invalid` is what it claims about itself.
   */
  invalid?: boolean
}

/**
 * A set of checkboxes that belong to one question.
 *
 * ```tsx
 * <CheckboxGroup
 *   legend="How should we contact you?"
 *   description="Select all that apply"
 *   name="contact"
 *   defaultValue={['email']}
 * >
 *   <CheckboxGroupItem value="email" label="Email" />
 *   <CheckboxGroupItem value="phone" label="Phone" description="Weekdays only" />
 * </CheckboxGroup>
 * ```
 *
 * The group owns the selection and the items read it, rather than each box
 * holding a boolean of its own: "which of these are ticked" is one piece of
 * state and one `onValueChange`, and a group that submits under one `name` is
 * one field on the server too.
 *
 * There is no `required`. A checkbox group's rule is almost always "at least
 * one", and HTML's `required` on a checkbox means that box in particular, so
 * forwarding it to the options would demand every one of them; `aria-required`
 * on each box says the same thing to a screen reader. The rule belongs to the
 * form, and what it produces is an `error`.
 */
const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      name,
      orientation = 'vertical',
      labelPosition = 'right',
      invalid,
      error,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? [])
    const controlled = value !== undefined
    const selection = controlled ? value : uncontrolled

    const toggle = React.useCallback(
      (itemValue: string, checked: boolean) => {
        const next = checked
          ? selection.includes(itemValue)
            ? selection
            : [...selection, itemValue]
          : selection.filter(current => current !== itemValue)

        if (!controlled) setUncontrolled(next)
        onValueChange?.(next)
      },
      [controlled, onValueChange, selection]
    )

    const selectionContext = React.useMemo(
      () => ({ value: selection, toggle, name }),
      [selection, toggle, name]
    )

    const isInvalid = invalid ?? Boolean(error)
    const groupContext = React.useMemo(
      () => ({ invalid: isInvalid, labelPosition, disabled }),
      [isInvalid, labelPosition, disabled]
    )

    return (
      <ChoiceGroupFieldset
        ref={ref}
        error={error}
        disabled={disabled}
        className={className}
        {...props}
      >
        <ChoiceGroupContext.Provider value={groupContext}>
          <CheckboxGroupContext.Provider value={selectionContext}>
            <div
              className={cn(
                choiceGroupItemsVariants({ orientation, labelPosition })
              )}
            >
              {children}
            </div>
          </CheckboxGroupContext.Provider>
        </ChoiceGroupContext.Provider>
      </ChoiceGroupFieldset>
    )
  }
)
CheckboxGroup.displayName = 'CheckboxGroup'

export { CheckboxGroup, useCheckboxGroup, type CheckboxGroupProps }
