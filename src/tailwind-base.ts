/**
 * Base styles Quantum adds on top of Tailwind's preflight.
 *
 * v3's preflight carried `button, [role="button"] { cursor: pointer }`. v4
 * dropped that rule — its preflight declares no `cursor` on buttons at all — so
 * buttons fall back to the UA default and every one of them becomes an arrow on
 * upgrade. Only `Button` and `Switch` set the cursor themselves (`Link` does
 * too, but on an `<a>`); the other eighteen render sites in `src/` — Chip,
 * Pagination, Password, Input, StepsIndicator, Modal, Checkbox, Radio, Select's
 * trigger, Popover, Tooltip and Calendar's day and nav buttons — do not.
 * Several have no reachable `className` hook, so this is the fix the v4 upgrade
 * guide recommends rather than a class on each one.
 *
 * It must stay in a cascade layer. `button:not(:disabled)` is specificity
 * (0,1,1) and `.cursor-default` is (0,1,0), so unlayered it would outrank the
 * utility and take the arrow away from Accordion's trigger, which sets
 * `cursor-default` deliberately. Registered through `addBase` precisely so
 * Tailwind puts it in `base`, below `utilities`.
 *
 * Kept as a plain object with no imports so both `tailwind.config.ts` (which
 * reaches `dist/global.css` and the Storybook preview) and
 * `src/tailwind-plugin.ts` (which reaches consumers' own Tailwind builds) can
 * register it without importing each other.
 */
export default {
  'button:not(:disabled), [role="button"]:not(:disabled)': {
    cursor: 'pointer'
  }
}
