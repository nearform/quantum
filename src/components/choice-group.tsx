import * as React from 'react'
import { cva } from 'class-variance-authority'

import { assertsInvalid, cn, type AriaInvalid } from '@/lib/utils'
import { FieldError } from './FormGroup'
import { Label } from './Label'

/**
 * The parts a group of checkboxes and a group of radios have in common: the
 * `<fieldset>` and `<legend>` that give the options one name, the hint under
 * that name, the validation message under the options, and the row that pairs
 * one control with its own label and hint.
 *
 * Not exported from the package. `CheckboxGroup` and `RadioGroup` are the two
 * components this exists for, and a third group shape would be a third
 * component rather than a configuration of this one.
 */

/**
 * Hint text, on the group and on a single option.
 *
 * The same weights as `FieldDescription`, deliberately not that component:
 * a field's hint stands down while its error is showing, because the two share
 * one line under one control. A group's hint is instructions for reading the
 * options -- "Select all that apply" -- it sits above them rather than under
 * them, and an error appearing below is not a reason to take the instructions
 * away.
 */
const choiceHintVariants = cva([
  'text-xs',
  'text-foreground-muted',
  'dark:text-foreground-muted-dark'
])

/**
 * How the options sit relative to each other. Vertical is the default because
 * it is the arrangement that stays readable at any label length; horizontal
 * wraps rather than overflowing, so a group that outgrows its container
 * becomes two rows instead of a scrollbar.
 *
 * `items-end` on a vertical group with its labels on the left is what lines
 * the controls up in a column: without it each row is only as wide as its own
 * label and the controls sit at a different x per row. It is scoped to that
 * one combination -- on a horizontal group the same class would align the rows
 * along their baseline-ish bottom edge instead, which is not the same request.
 */
const choiceGroupItemsVariants = cva('flex', {
  variants: {
    orientation: {
      vertical: ['flex-col', 'gap-3'],
      horizontal: ['flex-row', 'flex-wrap', 'gap-x-6', 'gap-y-3']
    },
    labelPosition: {
      left: '',
      right: ''
    }
  },
  compoundVariants: [
    { orientation: 'vertical', labelPosition: 'left', class: 'items-end' }
  ],
  defaultVariants: {
    orientation: 'vertical',
    labelPosition: 'right'
  }
})

interface ChoiceGroupContextValue {
  /** Whether the group's controls should be marked `aria-invalid`. */
  invalid: boolean
  labelPosition: 'left' | 'right'
  /**
   * Whether the group as a whole is disabled. Published because an option's
   * label has to dim with its control, and a radio disabled by its group is
   * disabled by Radix's own context rather than by a prop the item can see.
   */
  disabled?: boolean
}

const ChoiceGroupContext = React.createContext<ChoiceGroupContextValue | null>(
  null
)

/**
 * Read by `CheckboxGroupItem` and by `Radio`, so a single option picks up the
 * group's invalid state and label side without either being passed down by
 * hand. `null` outside a group, where a control is on its own and both
 * questions are the caller's.
 */
const useChoiceGroup = () => React.useContext(ChoiceGroupContext)

/**
 * What an option's `aria-invalid` should end up as, given the group's state
 * and whatever the caller asked for.
 *
 * The group wins over `aria-invalid={false}` and only over that, which is the
 * line `FormGroup` already draws: `false` is the attribute's default and reads
 * identically to its absence, so an option carrying it has asserted nothing,
 * and letting it suppress the group's error would render an option that is
 * visibly invalid inside a group showing an error message while telling a
 * screen reader it is fine. Every other value is a real assertion and is kept.
 *
 * Returning the value the attribute will actually carry, rather than a
 * boolean, is what keeps the styling and the announcement in step -- both are
 * derived from this one result.
 */
const resolveAriaInvalid = (own: AriaInvalid, groupInvalid: boolean) =>
  assertsInvalid(own) ? own : groupInvalid || undefined

interface ChoiceGroupFieldsetProps extends React.ComponentPropsWithoutRef<'fieldset'> {
  /** The group's name, rendered as its `<legend>`. */
  legend?: React.ReactNode
  /** Hint under the legend, reached through the fieldset's `aria-describedby`. */
  description?: React.ReactNode
  /** Validation message under the options, reached the same way. */
  error?: React.ReactNode
  /**
   * Dims the legend along with the options. Deliberately not rendered as the
   * `<fieldset disabled>` attribute, which the browser applies to every
   * control inside the element with no way for one of them to opt back in: a
   * group disabled that way could not leave a single option live, and an item
   * that had asked to stay enabled would render as enabled and refuse to be
   * clicked. Every control is given `disabled` in its own right instead.
   */
  disabled?: boolean
}

/**
 * The fieldset around a set of options, with its legend and its two messages.
 *
 * Both messages are published to the group rather than to the controls
 * inside it: a screen reader announces a fieldset's description when focus
 * first enters the group, which is where "Select all that apply" and "Choose
 * at least one" are useful, and announcing either of them again on every
 * option would be five copies of one sentence. The per-control half of the
 * error is `aria-invalid`, which `useChoiceGroup()` hands to the options.
 */
const ChoiceGroupFieldset = React.forwardRef<
  HTMLFieldSetElement,
  ChoiceGroupFieldsetProps
>(
  (
    {
      legend,
      description,
      error,
      disabled,
      className,
      children,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const id = React.useId()
    const descriptionId = `${id}-description`
    const errorId = `${id}-error`

    // The caller's own tokens first: the group's own messages are the most
    // specific thing said about it, and the most specific thing reads last.
    const describedBy =
      [
        ariaDescribedBy,
        description ? descriptionId : undefined,
        error ? errorId : undefined
      ]
        .filter(Boolean)
        .join(' ') || undefined

    return (
      <fieldset
        ref={ref}
        // `min-inline-size: min-content` is a fieldset UA style that Tailwind's
        // preflight leaves alone, and it stops the element from shrinking
        // inside a flex or grid parent -- a group of long labels then pushes
        // the layout wider instead of wrapping.
        className={cn('min-w-0 border-0 p-0', className)}
        aria-describedby={describedBy}
        {...props}
      >
        {/*
          The legend has to be the fieldset's own first child. Nested one
          element deeper -- inside the wrapper that would make this spacing
          easier to write -- it stops being the fieldset's caption and becomes
          a run of bold text that names nothing, and the group goes unlabelled
          with nothing on screen to show for it. `Label asChild` is what keeps
          its type identical to the labels on the options below it.
        */}
        {legend && (
          <Label asChild>
            <legend
              className={cn(
                'p-0',
                description ? 'mb-1' : 'mb-3',
                disabled && 'opacity-70'
              )}
            >
              {legend}
            </legend>
          </Label>
        )}
        {description && (
          <p id={descriptionId} className={cn(choiceHintVariants(), 'mb-3')}>
            {description}
          </p>
        )}
        {children}
        {error && (
          <FieldError id={errorId} className="mt-2">
            {error}
          </FieldError>
        )}
      </fieldset>
    )
  }
)
ChoiceGroupFieldset.displayName = 'ChoiceGroupFieldset'

interface ChoiceItemProps {
  /** The control's id, which the label's `htmlFor` points at. */
  controlId: string
  /** Where the hint is published, if there is one. */
  descriptionId: string
  label?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  labelPosition: 'left' | 'right'
  /** The checkbox or radio itself. */
  children: React.ReactNode
}

/**
 * One option: the control, its label, and the hint that belongs to that option
 * alone.
 *
 * The hint is wired to the control with `aria-describedby` by whoever renders
 * this, rather than being left as text that happens to sit nearby. A hint that
 * distinguishes one option from another -- "Delivered the next working day" --
 * is the difference between the two choices, and a reader who only hears the
 * labels has not been told what they are choosing between.
 *
 * `items-start` rather than centring: the control is a fixed 20px and the
 * label is however many lines its text needs, so centring a two-line label
 * would drift the control into the gap between the lines.
 */
const ChoiceItem: React.FC<ChoiceItemProps> = ({
  controlId,
  descriptionId,
  label,
  description,
  disabled,
  labelPosition,
  children
}) => {
  if (!label && !description) return <>{children}</>

  const text = (
    <div
      className={cn(
        'grid gap-0.5',
        labelPosition === 'left' && 'justify-items-end'
      )}
    >
      {label && (
        <Label
          htmlFor={controlId}
          align={labelPosition === 'left' ? 'right' : 'left'}
          // The library's disabled label treatment, applied here rather than
          // left to `Label`'s own `peer-disabled:`, which needs the control to
          // be the label's previous sibling -- here it is a sibling of this
          // wrapper. The hint below is deliberately not dimmed with it: at 70%
          // `foreground-muted` is 3.5:1, and on a disabled option the hint is
          // usually the reason it is disabled, which is the one line that has
          // to stay readable.
          className={cn(disabled && 'opacity-70')}
        >
          {label}
        </Label>
      )}
      {description && (
        <p
          id={descriptionId}
          className={cn(
            choiceHintVariants(),
            labelPosition === 'left' && 'text-right'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )

  return (
    <div className="flex items-start gap-2">
      {labelPosition === 'left' && text}
      {children}
      {labelPosition === 'right' && text}
    </div>
  )
}

export {
  ChoiceGroupContext,
  ChoiceGroupFieldset,
  ChoiceItem,
  choiceGroupItemsVariants,
  resolveAriaInvalid,
  useChoiceGroup,
  type ChoiceGroupFieldsetProps
}
