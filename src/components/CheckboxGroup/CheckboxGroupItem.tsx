import * as React from 'react'

import { Checkbox, type CheckboxProps } from '../Checkbox'
import { ChoiceItem, resolveAriaInvalid, useChoiceGroup } from '../choice-group'
import { useCheckboxGroup } from './CheckboxGroup'

interface CheckboxGroupItemProps extends Omit<
  CheckboxProps,
  'checked' | 'defaultChecked' | 'value'
> {
  /** What this box contributes to the group's value when it is ticked. */
  value: string
  label?: React.ReactNode
  /** Hint for this option alone, announced with the box it belongs to. */
  description?: React.ReactNode
}

/**
 * One box in a `CheckboxGroup`, with the label and hint that belong to it.
 *
 * Whether it is ticked comes from the group, so `checked` is not a prop here;
 * `onCheckedChange` still is, for the caller who wants to know about this one
 * box as well as about the group. Rendered outside a group it is an ordinary
 * uncontrolled checkbox that happens to come with its label wired up.
 */
const CheckboxGroupItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxGroupItemProps
>(
  (
    {
      value,
      label,
      description,
      disabled,
      id,
      name,
      onCheckedChange,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ownAriaInvalid,
      ...props
    },
    ref
  ) => {
    const group = useCheckboxGroup()
    const choiceGroup = useChoiceGroup()
    const generatedId = React.useId()
    const controlId = id ?? generatedId
    const descriptionId = `${controlId}-description`

    const isDisabled = disabled ?? choiceGroup?.disabled
    // `Checkbox` derives its border from this same attribute, so resolving it
    // here keeps what the box announces and what it draws in step.
    const ariaInvalid = resolveAriaInvalid(
      ownAriaInvalid,
      Boolean(choiceGroup?.invalid)
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
        disabled={isDisabled}
        labelPosition={choiceGroup?.labelPosition ?? 'right'}
      >
        <Checkbox
          ref={ref}
          id={controlId}
          value={value}
          name={name ?? group?.name}
          disabled={isDisabled}
          checked={group ? group.value.includes(value) : undefined}
          onCheckedChange={checked => {
            group?.toggle(value, checked === true)
            onCheckedChange?.(checked)
          }}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid}
          {...props}
        />
      </ChoiceItem>
    )
  }
)
CheckboxGroupItem.displayName = 'CheckboxGroupItem'

export { CheckboxGroupItem, type CheckboxGroupItemProps }
