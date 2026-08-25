# Quantum Component Library

![CI](https://github.com/nearform/quantum/actions/workflows/ci.yml/badge.svg?event=push) [![Figma](https://img.shields.io/badge/figma-designs-f24e1e?logo=figma)](https://www.figma.com/design/XFbhstkgQFz8ZefAU3w2p4/1.-Quantum-Design-System?m=auto&node-id=1-5&t=nMe5iB6lqqJ52oc4-1)

> A React component library based on the Quantum Design System

## Installation

```
npm install --save @nearform/quantum
```

## Configuration

#### With Tailwind

> **Tailwind v4 is required.** Our components use `outline-hidden` and
> `rounded-xs`, which only exist in v4. On Tailwind v3 they resolve to nothing,
> so focus outlines are not reset and small radii render square.
>
> **Tailwind v4 also raises the browser baseline** to Safari 16.4, Chrome 111
> and Firefox 128. If you need to support anything older, stay on the previous
> release of this library.

The plugin supplies our colour, shadow, font, stroke-width and animation tokens.

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

Tailwind v4 (CSS-first):

```css
/* index.css */
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
/* index.css */
@import 'tailwindcss';
@config './tailwind.config.mjs';
```

```js
// tailwind.config.mjs
import quantumPlugin from '@nearform/quantum/tailwind-plugin'
export default {
  //...tailwind config
  content: ['./node_modules/@nearform/quantum/**/*.js'],
  plugins: [quantumPlugin],
  darkMode: 'class'
}
```

From a CommonJS config the plugin arrives as the `default` property, because the
CJS build uses `exports.default`. Omitting `.default` fails at build time with
`is not a function`:

```css
/* index.css */
@import 'tailwindcss';
@config './tailwind.config.cjs';
```

```js
// tailwind.config.cjs
const quantumPlugin = require('@nearform/quantum/tailwind-plugin').default
module.exports = {
  //...tailwind config
  content: ['./node_modules/@nearform/quantum/**/*.js'],
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
