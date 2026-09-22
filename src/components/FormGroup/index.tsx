import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Label } from '../Label'

/**
 * A field is three things that have to agree with each other: a label, a
 * control, and a message below it. Getting them to agree is entirely id
 * plumbing -- the label's `htmlFor` has to match the control's `id`, the
 * message's `id` has to appear in the control's `aria-describedby`, and the
 * control has to be marked `aria-invalid` when the message is an error. That
 * is what `FormGroup` does; the layout is the smaller half of the job.
 *
 * The plumbing is done by cloning the children rather than by having the
 * children read a context, so the group works with anything that takes the
 * props every form control already takes -- our `Input` and `Select`, a bare
 * `<input>`, a control from somewhere else. The only requirement is that they
 * are direct children, which is the arrangement the design file draws.
 */
const formGroupVariants = cva('grid', {
  variants: {
    orientation: {
      // One column, so the children simply stack in source order.
      vertical: ['grid-cols-1', 'gap-y-2'],
      // The label takes as much width as its text and the control takes the
      // rest; the message sits under the control rather than under the label,
      // which is the indent the design shows. There is no `gap-x` because an
      // empty first column would still occupy it -- the label carries its own
      // trailing space instead, so a group with no label has none.
      horizontal: ['grid-cols-[auto_minmax(0,1fr)]', 'items-center', 'gap-y-1']
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
})

interface FormGroupContextValue {
  /** Shown by `FieldDescription` unless it is given children of its own. */
  description?: React.ReactNode
  /** Shown by `FieldError` unless it is given children of its own. */
  error?: React.ReactNode
  descriptionId: string
  errorId: string
}

const FormGroupContext = React.createContext<FormGroupContextValue | null>(null)

/**
 * The group's messages and the ids they are published under. `null` outside a
 * `FormGroup`, which is what lets `FieldError` and `FieldDescription` be
 * rendered on their own.
 *
 * Useful for a control the group cannot reach -- one nested inside a wrapper
 * of your own, say -- which can take `errorId` from here and put it in its own
 * `aria-describedby`.
 */
const useFormGroup = () => React.useContext(FormGroupContext)

const messageVariants = cva(['text-xs'], {
  variants: {
    tone: {
      description: ['text-foreground-muted', 'dark:text-foreground-muted-dark'],
      // `feedback-red` is 5.74:1 on the light page background but only 3.66:1
      // on the dark one, so dark mode takes `red-300` instead. That is the
      // weight rather than the more obvious `red-400` because a field can sit
      // on any of the three surfaces: `red-400` is 4.14:1 on
      // `background-alt-dark` and would fail 1.4.3 inside a dark card, where
      // `red-300` is 5.98:1 at its worst and 12.18:1 at its best.
      error: ['font-medium', 'text-feedback-red', 'dark:text-red-300']
    }
  },
  defaultVariants: {
    tone: 'description'
  }
})

interface FieldMessageProps extends React.ComponentPropsWithoutRef<'p'> {}

/**
 * The hint under the control. Takes its text from the group's `description`,
 * or from its own children when you would rather write it inline.
 */
const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldMessageProps
>(({ className, children, ...props }, ref) => {
  const group = useFormGroup()
  const content = children ?? group?.description

  if (!content) return null

  return (
    <p
      ref={ref}
      id={group?.descriptionId}
      className={cn(messageVariants({ tone: 'description' }), className)}
      {...props}
    >
      {content}
    </p>
  )
})
FieldDescription.displayName = 'FieldDescription'

/**
 * The validation message under the control, and the thing that puts the group
 * in its error state: a `FormGroup` whose `error` is set marks its control
 * `aria-invalid` whether or not a `FieldError` is there to render it.
 *
 * `role="alert"` is what announces a message that appears after the page has
 * loaded -- an element carrying it is read out when it enters the DOM, and
 * this one is not rendered at all until there is something to say. The
 * `aria-describedby` link the group sets up covers the other direction: a
 * message that was already on screen is read when focus reaches the control.
 */
const FieldError = React.forwardRef<HTMLParagraphElement, FieldMessageProps>(
  ({ className, children, ...props }, ref) => {
    const group = useFormGroup()
    const content = children ?? group?.error

    if (!content) return null

    return (
      <p
        ref={ref}
        id={group?.errorId}
        role="alert"
        className={cn(messageVariants({ tone: 'error' }), className)}
        {...props}
      >
        {content}
      </p>
    )
  }
)
FieldError.displayName = 'FieldError'

interface FormGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'id'>,
    VariantProps<typeof formGroupVariants> {
  /** Given to the control and to the label's `htmlFor`. Generated when omitted. */
  controlId?: string
  /** Hint text, rendered wherever `<FieldDescription />` is placed. */
  description?: React.ReactNode
  /**
   * Validation message, rendered wherever `<FieldError />` is placed. Setting
   * it marks the control invalid.
   */
  error?: React.ReactNode
  /** Marks the control invalid independently of `error`. */
  invalid?: boolean
  /** Passed to the control, for the whole field to be disabled in one place. */
  disabled?: boolean
  /** Passed to the control, for the whole field to be required in one place. */
  required?: boolean
}

/**
 * `disabled` and `required` are real attributes rather than styling, so they
 * are only forwarded to something that can hold them. React renders an unknown
 * attribute on a host element verbatim and warns about it, so
 * `<div disabled="true">` is both a console warning and markup a browser
 * ignores. A component is trusted with them -- what it does with them is its
 * own business.
 */
const ATTRIBUTE_HOLDERS = new Set([
  'button',
  'fieldset',
  'input',
  'select',
  'textarea'
])

const takesFormAttributes = (element: React.ReactElement) =>
  typeof element.type !== 'string' || ATTRIBUTE_HOLDERS.has(element.type)

type Slot = 'label' | 'description' | 'error' | 'control'

const slotOf = (node: React.ReactNode): Slot | null => {
  if (!React.isValidElement(node)) return null
  if (node.type === Label || node.type === 'label') return 'label'
  if (node.type === FieldDescription) return 'description'
  if (node.type === FieldError) return 'error'
  return 'control'
}

/**
 * Wraps a label, a control and its messages into one field, wiring them
 * together and laying them out in either orientation.
 *
 * ```tsx
 * <FormGroup orientation="vertical" error="Pick a date in the future">
 *   <Label>Start date</Label>
 *   <Input type="date" variant="error" onClear={clear} />
 *   <FieldError />
 * </FormGroup>
 * ```
 *
 * The label, the messages and the control are recognised by what they are, so
 * they can be written in any order -- though writing them in the order they
 * appear is what makes the vertical layout need no placement rules at all.
 * Anything that is not a `Label`, a `FieldDescription` or a `FieldError` is
 * taken to be the control; only the first one is wired, since an id can only
 * belong to one element.
 *
 * Nothing is overwritten. A child that already has an `htmlFor`, an
 * `aria-describedby`, an `aria-invalid`, a `disabled` or a `required` keeps
 * it, and its own `className` is applied after the group's. A control that
 * already has an `id` keeps that too, and the label and the messages are built
 * around it -- `controlId` is the one way to override it, since a group asked
 * for a specific id has been asked by the only party above both of them.
 */
const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      className,
      orientation = 'vertical',
      controlId,
      description,
      error,
      invalid,
      disabled,
      required,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const horizontal = orientation === 'horizontal'

    const items = React.Children.toArray(children)
    const slots = items.map(slotOf)
    const controlIndex = slots.indexOf('control')

    /**
     * A control that arrived with an `id` keeps it, and the rest of the field
     * is built around that instead: the label points at the id the control
     * actually has, and the messages are published under ids derived from it.
     * Overwriting it would break whatever put it there -- a form library's
     * `register`, or an `aria-controls` elsewhere on the page.
     */
    const ownControlId =
      controlIndex === -1
        ? undefined
        : (items[controlIndex] as React.ReactElement<{ id?: string }>).props.id

    const fieldId = controlId ?? ownControlId ?? generatedId
    const descriptionId = `${fieldId}-description`
    const errorId = `${fieldId}-error`

    /**
     * A message element with children of its own renders them instead of the
     * group's, so "is there a message" is a question about both. Reading the
     * child's props during render rather than having it register itself keeps
     * `aria-invalid` correct on the very first render, including on the
     * server, where an effect would not have run.
     */
    const contentOf = (slot: Slot, fallback: React.ReactNode) => {
      const index = slots.indexOf(slot)
      if (index === -1) return undefined
      const own = (items[index] as React.ReactElement<React.PropsWithChildren>)
        .props.children
      return own ?? fallback
    }

    const shownDescription = contentOf('description', description)
    const shownError = contentOf('error', error)
    const isInvalid = invalid ?? Boolean(error || shownError)

    const describedBy = (existing?: string) =>
      [
        existing,
        shownDescription ? descriptionId : undefined,
        shownError ? errorId : undefined
      ]
        .filter(Boolean)
        .join(' ') || undefined

    let controlWired = false

    const wire = (element: React.ReactElement, slot: Slot) => {
      const own = element.props as Record<string, unknown> & {
        className?: string
      }

      if (slot === 'label') {
        return React.cloneElement(element, {
          htmlFor: own.htmlFor ?? fieldId,
          className: cn(
            horizontal && 'col-start-1 row-start-1 pe-3',
            disabled && 'opacity-70',
            own.className
          )
        } as Partial<typeof own>)
      }

      if (slot !== 'control') {
        return React.cloneElement(element, {
          className: cn(horizontal && 'col-start-2', own.className)
        } as Partial<typeof own>)
      }

      // Every control is wrapped in horizontal mode rather than given the
      // placement classes directly: a control's `className` does not
      // necessarily land on its outermost element -- `Input` puts it on the
      // `<input>` inside its border -- so it is not a reliable way to position
      // one in a grid.
      const place = (node: React.ReactNode) =>
        horizontal ? (
          <div
            key={element.key}
            className={cn(
              'min-w-0',
              controlWired ? 'col-start-2' : 'col-start-2 row-start-1'
            )}
          >
            {node}
          </div>
        ) : (
          node
        )

      if (controlWired) return place(element)
      controlWired = true

      const wiring: Record<string, unknown> = {
        // Already the control's own id unless `controlId` overrode it.
        id: fieldId,
        'aria-describedby': describedBy(own['aria-describedby'] as string)
      }

      if (isInvalid && own['aria-invalid'] === undefined) {
        wiring['aria-invalid'] = true
      }

      if (takesFormAttributes(element)) {
        if (disabled !== undefined && own.disabled === undefined) {
          wiring.disabled = disabled
        }
        if (required !== undefined && own.required === undefined) {
          wiring.required = required
        }
      }

      return place(React.cloneElement(element, wiring as Partial<typeof own>))
    }

    const context = React.useMemo(
      () => ({ description, error, descriptionId, errorId }),
      [description, error, descriptionId, errorId]
    )

    return (
      <FormGroupContext.Provider value={context}>
        <div
          ref={ref}
          className={cn(formGroupVariants({ orientation }), className)}
          {...props}
        >
          {items.map((child, index) => {
            const slot = slots[index]
            return slot === null
              ? child
              : wire(child as React.ReactElement, slot)
          })}
        </div>
      </FormGroupContext.Provider>
    )
  }
)
FormGroup.displayName = 'FormGroup'

export {
  FormGroup,
  FormGroupProps,
  FieldDescription,
  FieldError,
  FieldMessageProps,
  useFormGroup
}
