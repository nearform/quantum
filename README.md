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
@custom-variant dark (&:is(.dark, .dark *));
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
import '@nearform/quantum/global.css'
import { Button } from '@nearform/quantum'
```

#### Overriding a token

`global.css` carries our theme as CSS custom properties, and the utilities
read them through `var()` rather than having the values baked in, so a token can
be restyled without a Tailwind build:

```css
@import '@nearform/quantum/global.css';

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

Each story is scanned twice, once in light mode and once in dark.

A story that is a deliberate exception opts out through its own parameters:

```js
parameters: { a11y: { disable: true } }             // skip the story
parameters: { a11y: { config: { rules: [...] } } }  // tune individual rules
```

### What the library cannot do for you

Some things depend on the surrounding page, so the components take them as
props rather than guessing:

- **Form controls need a label.** `Input`, `Password`, `DateInput` and
  `Textarea` take `labelText` (rendered and wired up with `htmlFor`) and
  `helpText` (exposed through `aria-describedby`). `Checkbox`, `Radio`,
  `Switch` and `SelectTrigger` have no text of their own -- pair them with
  `ControlLabel`, an external `<label htmlFor>`, or give them an `aria-label`.
  A placeholder is not a label. Inside a `CheckboxGroup` or a `RadioGroup`,
  the option's `label` prop does this, and its `description` is wired up with
  it.
- **A control inside a `FormGroup` has to pass its props on.** The group
  derives the label's `htmlFor`, the message ids behind `aria-describedby` and
  the `aria-invalid` flag from one id and hands them to whichever direct child
  is the control. A wrapper of your own that drops them leaves the label
  pointing at an element that does not exist, and nothing looks wrong. Spread
  the props you are given, keep the parts as direct children, and reach for
  `useFormGroup()` for a control the group cannot get to.
- **Groups and landmarks need a name.** Give `ButtonGroup` an `aria-label` when
  a page holds more than one, and `Pagination` a `label` when it has more than
  one pagination nav. `CheckboxGroup` and `RadioGroup` take a `legend`: without
  it the options are a run of controls that a reader arriving at the third one
  cannot place, and a form of several groups is one undifferentiated list. A
  group whose name is already on the page -- a heading directly above it --
  takes an `aria-labelledby` pointing at that instead of repeating it.
- **Avatars need a name, or none at all.** `Avatar` announces `alt`, falling
  back to `name`. Given neither it renders as decoration (`aria-hidden`), which
  is what you want when the person's name is already in the text beside it --
  the initials themselves are never announced.
- **Badges say their status in words.** `Badge` colours its border to
  reinforce the text, never to replace it -- two identically-worded badges in
  different colours are indistinguishable to a good share of readers. A badge
  whose text is not self-explanatory, such as a bare count, takes an
  `aria-label`, which also gives it the `role="img"` that makes that label
  reach a screen reader. It never carries that role without a name, whether
  the role came from the badge or from you. Its `disabled` variant is an
  appearance for a badge beside a disabled control, not a state of its own.
- **Icon-only controls need names in your language.** `Pagination`
  (`previousLabel`, `nextLabel`, `pageLabel`), `StepsIndicator` (`label`,
  `stepLabel`), `Input` (`clearLabel`), `Password` (`showLabel`,
  `hideLabel`), `DateInput` (`calendarLabel`, `formatHint`,
  `invalidMessage`, `rangeMessage`), `SplitButton` (`menuLabel`),
  `SwitchCard` (`removeLabel`) and `ToastClose` (`label`) all default to English and accept overrides. `IconButton` has no default to override: its `label` is required,
  because there is no name that could be guessed from an icon, and it should
  say what the button does rather than what the icon is a picture of --
  "Delete article", not "bin". Where the name is also made visible, by a
  `Tooltip` or otherwise, the two have to agree: WCAG 2.5.3 asks that the
  accessible name contain the visible text, so that someone speaking what they
  can see reaches the control they are looking at.
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

### Visual regression tests

Every story is screenshotted in light and dark mode on your branch and on the
branch you are merging into, and the two are compared. No images are committed:
the baseline is rebuilt from the base branch on every run. Both sides render in
the same container, so unchanged stories are pixel-identical, and a story fails
when more than 4 pixels differ. These checks run in the **Visual Regression**
CI workflow on every pull request, comparing against the pull request's base
commit.

The screenshot covers the whole story, including anything below the fold. The
browser clock is frozen at 12 June 2024 during visual runs, so stories that
use `new Date()` (such as Calendar) render the same every day.

Fonts and anti-aliasing render differently on macOS, Windows and Linux, so the
tests always run inside the Ubuntu-based Playwright Docker image, both locally
and in CI. You need Docker running; nothing else needs to be installed or
served. To compare your working tree with `origin/main`:

```sh
npm run test-storybook:visual
```

To compare against another branch, pass `--base`. The comparison uses the
merge-base with that branch, so changes that landed there after you branched
don't show up as differences:

```sh
npm run test-storybook:visual -- --base origin/some-branch
```

The script exports the base commit with `git archive`, then in the container
builds Storybook for the base and for your working tree (including uncommitted
changes), screenshots the base, and compares your stories against those
screenshots. The image tag comes from the `playwright` version in
`package-lock.json`, and the image runs on your machine's own architecture
(Chromium crashes under x64 emulation on Apple Silicon). Dependencies and
builds stay inside the container, so your own `node_modules` is left alone.
The first run also downloads the image.

#### Which stories are checked

Only stories your changes can affect are screenshotted. The changed files
(committed, uncommitted and untracked, compared with the base) are traced to
story files with the TypeScript checker. Names imported from the `@/index`
barrel are resolved to the files that declare them, so changing Badge checks
the Badge stories and the stories that use Badge (such as DataTable), not
every story.

Every story is checked when a change touches something with global reach: the
theme, colours or animations, any `.css` file, `.storybook/`, `package.json` or
`package-lock.json`, `postcss.config.js`, `tsconfig.json`, `public/` or
`scripts/`, or any file that can't be traced to specific stories (such as the
barrels or a deleted file). Changes that can't affect rendering (`.github/`,
tests, Markdown and MDX, lint and Jest config) are ignored, and when nothing
else changed the run stops before building Storybook. The selection and its
reason are printed at the start of the run.

To check every story regardless, pass `--all`:

```sh
npm run test-storybook:visual -- --all
```

In CI, add the `visual-full-run` label to the pull request; the check reruns
against every story.

The base screenshots and, when a check fails, the before/after/diff image for
each failing story are written to `visual-regression/baseline/` and
`visual-regression/diff/` (both git-ignored). In CI, the diffs are uploaded as
the `visual-regression-diffs` artifact on the workflow run.

#### Intentional changes

There is nothing to update. If a pull request changes a component's look on
purpose, the Visual Regression check fails and shows the difference. Check the
diff artifact, and once the change is approved and merged it becomes the
baseline for the next pull request. Stories that are new on your branch have
nothing to compare against, so they pass; stories removed on your branch are
skipped.

Running the test runner with `VISUAL_TEST=true` outside the Docker image stops
with an error, and a plain `npm run test-storybook` never takes screenshots.

If the base commit has no visual tests yet, the run is skipped with a notice.

#### Story options

To leave a story out of the visual checks (for example, one that renders
something that changes on every run), set
`parameters: { visual: { disable: true } }` on the story.

Popovers, menus, selects, modals and tooltips render outside the story root
and only once opened. To snapshot one open, set
`parameters: { visual: { open: 'click' } }` (or `'hover'` for tooltips). The
test runner clicks the first trigger with `aria-expanded="false"` (or hovers
the first `data-state="closed"` element), waits for the overlay, and widens the
screenshot to include it. Accessibility scans run before the overlay is opened.

### Dark mode in Storybook

Stories render twice by default, light and dark side by side. A fixed `id`
in a story is suffixed with `--dark` in the dark copy, along with the `for`
and `aria-*` references that point at it, so each copy's labels and
descriptions stay wired to their own controls. The **Preview** menu in the
toolbar switches to a single copy, which is better for wide components whose
layout depends on the window width.

The moon icon switches Storybook itself between light and dark. In single view
it sets the story's mode too.

Popups that portal to `document.body` (Modal, Popover, Select, DateInput,
SortAndShow, SplitButton) take the theme of the pane they were opened from.
The test runner ignores side by side and scans a single copy of each story.

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
