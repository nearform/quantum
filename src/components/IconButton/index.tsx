import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { buttonVariants } from '@/components/Button'
import { cn } from '@/lib/utils'

/**
 * An icon button is a `Button` with the label taken out, so it takes its
 * colours from `buttonVariants` rather than restating them. That import is
 * the point rather than an economy: the two sit beside each other in a
 * toolbar, so a variant that gained a hover state or a focus ring in one and
 * not the other would be visible in the gap between them.
 *
 * `size: null` is how cva is told to skip a variant *and* its default, so
 * `Button`'s padding and text sizes are left off entirely and the square
 * below is the only thing setting the box.
 *
 * Which is the other half of the borrowing: a `Button`'s height is arithmetic
 * -- padding plus line box plus border, with compound variants putting
 * `secondary`'s 2px back -- and there is no line box here to add up, because
 * there is no text. So the height is set outright, as `Input` sets its own,
 * and `border-box` absorbs `secondary`'s border rather than a compound
 * variant having to. The numbers are `Button`'s, measured: an icon button
 * belongs in a row with one.
 */
const iconButtonVariants = cva(['shrink-0', '[&>svg]:shrink-0'], {
  variants: {
    /**
     * The box is square and matches the `Button` of the same name, so the two
     * line up in a row. `xs` and `sm` are the same 36px box there as well --
     * what separates them is the size of what is inside, `text-xs` against
     * `text-sm` in `Button` and a 14px icon against a 16px one here.
     *
     * The icon is sized from here rather than left to the caller, so a row of
     * them agrees without each one repeating an `h-4 w-4` and an icon drawn
     * at some other size cannot set the row's height. `[&>svg]` is the same
     * selector `Input` and `Password` size their own icons with. Being a
     * selector it also outranks a class on the icon itself, so the override
     * is `[&>svg]:h-6 [&>svg]:w-6` in the button's `className`, which
     * `tailwind-merge` takes as replacing this rather than joining it.
     */
    size: {
      lg: ['h-12', 'w-12', '[&>svg]:h-5', '[&>svg]:w-5'],
      md: ['h-10', 'w-10', '[&>svg]:h-4', '[&>svg]:w-4'],
      sm: ['h-9', 'w-9', '[&>svg]:h-4', '[&>svg]:w-4'],
      xs: ['h-9', 'w-9', '[&>svg]:h-3.5', '[&>svg]:w-3.5']
    },
    shape: {
      // `Button`'s own corner, so a square icon button beside a text one is
      // the same shape.
      rounded: 'rounded-lg',
      circle: 'rounded-full'
    }
  },
  defaultVariants: {
    size: 'md',
    shape: 'rounded'
  }
})

/**
 * Whether the unnamed-button warning has already gone out in this pass.
 *
 * `StrictMode` invokes a component body twice in development to surface impure
 * renders, and both invocations reach the `console.error` below, so one button
 * prints the message twice.
 *
 * `useRef` is the obvious guard and does not work: React rebuilds the hook
 * state for the second invocation, so the ref arrives fresh with `current`
 * false and both passes warn. Measured rather than assumed --
 * `__tests__/icon-button-strict-mode.test.tsx` mounts one under `StrictMode`
 * and counts, and it counts two without this. `useEffect` would dedupe and is
 * worse: effects do not run on the server, so the warning would vanish from
 * every server render and from the rest of this suite, which is where it is
 * most likely to be seen.
 *
 * So a module-level flag, cleared on a microtask rather than never. Both of
 * `StrictMode`'s invocations are synchronous and land in the same pass, so
 * they collapse into one message, while a re-render in some later task warns
 * again. That last part is the reason for the microtask: a warning that fires
 * once per session and then goes quiet cannot be told apart from a warning you
 * have fixed.
 */
let warnedThisPass = false

const warnUnnamed = () => {
  if (warnedThisPass) return
  warnedThisPass = true
  queueMicrotask(() => {
    warnedThisPass = false
  })

  console.error(
    'IconButton: `label` is required and cannot be empty. This button has ' +
      'rendered with no accessible name, and a screen reader will announce ' +
      'it as "button" and nothing more. Pass a label saying what the button ' +
      'does -- "Delete article", not "bin".'
  )
}

interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'title'>,
    VariantProps<typeof iconButtonVariants> {
  /** The icon. It is the whole of the button's content. */
  icon: React.ReactNode
  /**
   * What the button does, in words -- "Close", "Add to basket", not "cross"
   * or "plus". Required, because there is no text for a screen reader to fall
   * back on.
   */
  label: string
  variant?: VariantProps<typeof buttonVariants>['variant']
}

/**
 * A button whose content is an icon and nothing else: the close on a dialog,
 * the actions at the end of a table row, a toolbar.
 *
 * `label` is required and has no default, which is the one way this differs
 * from every other prop here. An icon button with no accessible name is a
 * control a screen reader announces as "button" and nothing more, and unlike
 * a missing colour it is invisible to everyone who is not affected by it.
 * There is no name that could be guessed from an icon, so the type asks for
 * one rather than inventing it (WCAG 4.1.2).
 *
 * The icon is left out of the accessibility tree by `aria-label` itself,
 * which replaces an element's contents when the name is computed, so the icon
 * needs no `aria-hidden` of its own. What the icon must not carry is a
 * `title`, which would put a browser tooltip on it that the button's own
 * `Tooltip` did not put there. That one is unreachable from here: `icon` is a
 * `ReactNode`, so there is nothing to type-check.
 *
 * `title` is off the button as well, which is the one prop of a `<button>`
 * this component takes away. It is not that it competes for the name --
 * `title` is the last resort in the naming order, behind both `aria-label`
 * and the contents, so while there is a label it never wins. It is that every
 * reason to reach for it here is already served by something better, and
 * served properly: a tooltip is `Tooltip`, which is reachable by keyboard and
 * by touch as a native one is not, and a name is `label`. What is left is a
 * second tooltip doubling up with the first, and a name that appears out of
 * nowhere in the one case where `label` resolved empty. Neither is worth a
 * prop, so the type stops it at the point where it can still be changed
 * cheaply.
 *
 * Only the type stops it. A `title` arriving through an untyped spread is
 * passed to the element like any other attribute, because deleting an
 * attribute a caller explicitly set is a worse surprise than rendering it.
 *
 * `type` defaults to `"button"`. A bare `<button>` inside a form is a submit
 * button, and an icon button is most often a close or a remove -- the one
 * place that default does the most damage.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      icon,
      label,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // An `aria-label` of the caller's own wins, and an empty one falls back
    // rather than being spread over the top of `label` -- a button holding a
    // required name and then blanking it has only one reading, and it is not
    // the one where the name goes away silently. `aria-labelledby` is not
    // weighed against either: it beats them both wherever it is passed, which
    // is the naming order in the specification rather than anything decided
    // here.
    //
    // Trimmed, because the name-computation algorithm trims before it decides
    // whether a label is empty, so a `label` of `" "` is exactly as unnamed as
    // one of `""` -- and `label` is typed `string`, which stops neither. The
    // type is the guard against a name being forgotten; this is the guard
    // against one being supplied and empty, which the type cannot express.
    //
    // Nothing is invented when both are empty. There is no name that could be
    // guessed from an icon, and a placeholder would be worse than none: it
    // would silence the failure with something untrue. So the attribute comes
    // off entirely instead of going on empty. The computed name is the same
    // either way -- an empty `aria-label` is skipped and the algorithm falls
    // through to the contents, which are an icon and say nothing -- but the
    // markup is not. `aria-label=""` reads as a deliberate suppression, and
    // linters and reviewers take it for one. A button with no `aria-label` at
    // all is plainly unnamed, and axe's `button-name` rule says so in the
    // consumer's own CI rather than the component quietly asserting a name it
    // does not have.
    const name = ariaLabel?.trim() || label?.trim() || undefined

    // ...and says so in development, where the person who can fix it is
    // looking, rather than leaving it for a consumer's axe run to find.
    //
    // No other component here warns, and the line between them is worth
    // stating rather than assuming. What the others cannot express is
    // contextual -- whether the page holds a second `ButtonGroup`, whether a
    // heading above a `RadioGroup` already carries its name -- so they cannot
    // know they are wrong and would have to guess. This one knows. An icon
    // button with no accessible name has no valid reading at all, whatever
    // surrounds it, so the certainty is what earns the warning and it does not
    // generalise to a convention for the rest of the library.
    //
    // `aria-labelledby` is exempt: it names the button from text already on
    // the page and beats `aria-label` wherever both appear, so a caller using
    // it has named the button and only fallen foul of the type. It is read
    // from `props` rather than destructured so that it still reaches the
    // element through the spread.
    if (
      process.env.NODE_ENV !== 'production' &&
      !name &&
      !props['aria-labelledby']
    ) {
      warnUnnamed()
    }

    return (
      <button
        ref={ref}
        type={type}
        aria-label={name}
        className={cn(
          buttonVariants({ variant, size: null }),
          iconButtonVariants({ size, shape }),
          className
        )}
        {...props}
      >
        {icon}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants, type IconButtonProps }
