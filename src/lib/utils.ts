import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Every value React accepts for the `aria-invalid` attribute. */
export type AriaInvalid =
  boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined

/**
 * Whether an `aria-invalid` value asserts that the control is invalid.
 *
 * `aria-invalid="false"` is the attribute's default and reads identically to
 * its absence in the accessibility tree, so a control carrying it has asserted
 * nothing. Every other value is a real assertion, including `grammar` and
 * `spelling`, which say more than a bare `true` would. `FormGroup` draws the
 * same line for the same reason, and the controls that style themselves from
 * this attribute have to draw it in exactly the same place -- otherwise a
 * control can announce one state and render the other.
 */
export const assertsInvalid = (value: AriaInvalid) =>
  value !== undefined && value !== false && value !== 'false'
