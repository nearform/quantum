# Quantum Component Library

![CI](https://github.com/nearform/quantum/actions/workflows/ci.yml/badge.svg?event=push) [![Figma](https://img.shields.io/badge/figma-designs-f24e1e?logo=figma)](https://www.figma.com/design/XFbhstkgQFz8ZefAU3w2p4/1.-Quantum-Design-System?m=auto&node-id=1-5&t=nMe5iB6lqqJ52oc4-1)

> A React component library based on the Quantum Design System

## Installation

```
npm install --save @nearform/quantum
```

## Configuration

#### With Tailwind

> **Tailwind 4.1.18 or newer is required.**
>
> Our components use `outline-hidden` and `rounded-xs`, which only exist in v4.
> On Tailwind v3 they resolve to nothing, so focus outlines are not reset and
> small radii render square.
>
> The `4.1.18` floor is not cosmetic: Tailwind versions from `4.0.0` to `4.1.17`
> drop every theme key containing an uppercase letter
> ([tailwindlabs/tailwindcss#18114](https://github.com/tailwindlabs/tailwindcss/issues/18114)).
> On those versions our `brandGreen` tokens and the `slideDown`/`slideUp`
> animations vanish with no error, so focus rings and the Accordion animation
> silently stop working while lowercase tokens keep resolving.
>
> Those camelCase names are deliberate and are not changing. `bg-brandGreen-100`,
> `text-brandMidnight-80` and `animate-slideDown` are the spellings in your
> markup; renaming them to v4's idiomatic `brand-green` would rewrite every one
> of those class names in every consuming app. Raising the floor to `4.1.18` is
> the price of keeping them, and it is the cheaper of the two.
>
> **Tailwind v4 also raises the browser baseline** to Safari 16.4, Chrome 111
> and Firefox 128. If you need to support anything older, stay on the previous
> release of this library.
>
> **`hover:` styles no longer apply on touch devices.** v4 gates the `hover`
> variant behind `@media (hover: hover)`, which removes the sticky-hover-after-tap
> behaviour v3 had. Our hover styling is heaviest in `Button` and `Pagination`.

The plugin supplies our colour, shadow, font, stroke-width and animation tokens.
It also restores `cursor: pointer` on enabled `button` and `[role="button"]`
elements: v3's preflight set that and v4's does not, so without it every button
falls back to an arrow. It is registered in the `base` layer, so any `cursor-*`
utility you set still wins over it. Note it reaches your own buttons too, as v3's
preflight did — though unlike v3 it leaves disabled buttons alone.

You must also point Tailwind at this package so it scans our components for the
classes they use. **The plugin does not do this for you** — earlier versions
registered the path automatically, but Tailwind v4 replaced the `content` array
with source detection, and source detection skips `node_modules` by default. If
you omit this step the build succeeds and every Quantum utility is silently
missing from the output.

Our dark mode must be driven by a `.dark` class rather than the operating
system. Tailwind v4's `dark:` variant defaults to a `prefers-color-scheme` media
query, so each route below pins it back to the class — `@custom-variant` in the
CSS-first route, `darkMode: 'class'` in the JS-config ones.

All the examples below assume `index.css` sits one level down from your project
root, e.g. `src/index.css`, next to a `tailwind.config.*` at the root. Both the
`@source` path and the `@config` path are resolved **relative to the CSS file**,
so adjust the `../` if your layout differs — an `@source` that points outside
the project matches nothing and reports no error.

Tailwind v4 (CSS-first):

```css
/* src/index.css */
@import 'tailwindcss';
@plugin '@nearform/quantum/tailwind-plugin';
@source '../node_modules/@nearform/quantum';
@custom-variant dark (&:is(.dark *));
```

Tailwind v4 with a JS config. **The config file is inert on its own.** Unlike
v3, v4 loads a JS config only when a CSS entrypoint asks for it, so the
`@config` line below is required — without it the build succeeds and none of
our tokens are emitted:

```css
/* src/index.css */
@import 'tailwindcss';
@config '../tailwind.config.mjs';
```

```js
// tailwind.config.mjs
import quantumPlugin from '@nearform/quantum/tailwind-plugin'
export default {
  //...tailwind config
  content: ['./node_modules/@nearform/quantum/dist'],
  plugins: [quantumPlugin],
  darkMode: 'class'
}
```

Point `content` at the directory, as above. The form to avoid is the one where a
`**` has to traverse _into_ `dist`:

```js
// Do not do this
content: ['./node_modules/@nearform/quantum/**/*.js']
```

Tailwind applies your `.gitignore` rules while expanding a `**` pattern, so a
`dist` entry — the default in a Vite scaffold — makes it skip the very directory
our classes live in, and every Quantum utility silently disappears from the
output. Measured against this package at Tailwind `4.1.18` and `4.3.2`, that
glob produces 4.5 kB with no `brandGreen` where the directory form produces
55 kB with it, and reports no error either way. It applies whether or not the
project is a git repository — the ignore file alone is enough.

Naming `dist` yourself avoids it, either as the bare directory above or as
`'./node_modules/@nearform/quantum/dist/**/*.js'`. The same split applies to
`@source` in the CSS-first route.

From a CommonJS config the plugin arrives as the `default` property, because the
CJS build uses `exports.default`. Omitting `.default` fails at build time with
`is not a function`:

```css
/* src/index.css */
@import 'tailwindcss';
@config '../tailwind.config.cjs';
```

```js
// tailwind.config.cjs
const quantumPlugin = require('@nearform/quantum/tailwind-plugin').default
module.exports = {
  //...tailwind config
  content: ['./node_modules/@nearform/quantum/dist'],
  plugins: [quantumPlugin],
  darkMode: 'class'
}
```

#### Without Tailwind

```js
//root component
import '@nearform/quantum/dist/global.css'
import { Button } from '@nearform/quantum'
```

#### Overriding a token

`dist/global.css` carries our theme as CSS custom properties, and the utilities
read them through `var()` rather than having the values baked in, so a token can
be restyled without a Tailwind build:

```css
@import '@nearform/quantum/dist/global.css';

:root {
  --color-accent: #123456;
}
```

Your declaration is unlayered and ours is in the `theme` layer, so yours wins,
and every utility that reads the token follows it — `bg-accent`,
`[&>*:focus]:bg-accent`, `dark:bg-accent-dark` and the rest.

The variable name is the token name with its namespace in front:
`--color-brandGreen-100`, `--color-foreground-muted`, `--shadow-brandGreen`,
`--font-sans`, `--stroke-width-2`, `--animate-slideDown`. The same names are
available as JS objects — `import { colors } from '@nearform/quantum'`.

Only tokens our components actually use are emitted, so redeclaring one we do
not reference has no effect; there is no utility reading it either way.

This applies to the prebuilt stylesheet only. On the Tailwind routes above the
plugin hands your build a JS theme and your build inlines the values, so there
is nothing to override at runtime — change them in your own `@theme` block or
Tailwind config instead.

## Accessibility

Components target [WCAG 2.2](https://www.w3.org/TR/WCAG22/) level AA. Every
story is scanned with [axe](https://github.com/dequelabs/axe-core) as part of
`npm run test-storybook`, against the `wcag2a`, `wcag2aa`, `wcag21a`,
`wcag21aa` and `wcag22aa` rule sets, so a component that loses its accessible
name, its focus indicator or its contrast fails CI.

A story that is a deliberate exception opts out through its own parameters:

```js
parameters: { a11y: { disable: true } }             // skip the story
parameters: { a11y: { config: { rules: [...] } } }  // tune individual rules
```

### What the library cannot do for you

Some things depend on the surrounding page, so the components take them as
props rather than guessing:

- **Form controls need a label.** `Input`, `Password` and `Textarea` take
  `labelText` (rendered and wired up with `htmlFor`) and `helpText` (exposed
  through `aria-describedby`). `Checkbox`, `Radio`, `Switch` and
  `SelectTrigger` have no text of their own -- pair them with `ControlLabel`,
  an external `<label htmlFor>`, or give them an `aria-label`. A placeholder is
  not a label.
- **Groups and landmarks need a name.** Give `ButtonGroup` an `aria-label` when
  a page holds more than one, and `Pagination` a `label` when it has more than
  one pagination nav.
- **Avatars need a name, or none at all.** `Avatar` announces `alt`, falling
  back to `name`. Given neither it renders as decoration (`aria-hidden`), which
  is what you want when the person's name is already in the text beside it --
  the initials themselves are never announced.
- **Icon-only controls need names in your language.** `Pagination`
  (`previousLabel`, `nextLabel`, `pageLabel`), `StepsIndicator` (`label`,
  `stepLabel`), `Input` (`clearLabel`) and `Password` (`showLabel`,
  `hideLabel`) all default to English and accept overrides.
- **Triggers should merge into the control they wrap.** `ModalTrigger`,
  `PopoverTrigger` and `SelectTrigger` render a `<button>` of their own, so
  wrapping one around a `Button` nests a control inside a control. Pass
  `asChild` to merge them instead:

  ```jsx
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  ```

  `Tooltip` does this for you when its child is an element.

## Design tokens

The token values live in `src/theme.ts` (built from `src/colors` and
`src/animations`) and the base styles in `src/tailwind-base.ts`. There is no
`tailwind.config.*` and no `@config` directive: `src/quantum.css` is a native
Tailwind v4 `@theme` block, generated from those files and committed, and it is
what both `src/global.css` and `.storybook/global.css` compile against.

After changing a token, regenerate it:

```
npm run build:theme
```

`npm test` fails if you forget.

## Tests

To run tests for the project, run:

```js
npm run test
```

To run Storybook tests for the project, run:

```js
npm run test-storybook
```

## Usage

Just import:

```js
import { Button, ButtonGroup } from '@nearform/quantum'
```

And use:

```jsx
<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

[![banner](https://raw.githubusercontent.com/nearform/.github/refs/heads/master/assets/os-banner-green.svg)](https://www.nearform.com/contact/?utm_source=open-source&utm_medium=banner&utm_campaign=os-project-pages)
