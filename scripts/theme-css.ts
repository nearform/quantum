import baseStyles from '../src/tailwind-base'
import theme from '../src/theme'

/**
 * Renders `src/theme.ts` and `src/tailwind-base.ts` into the native Tailwind v4
 * stylesheet committed at `src/quantum.css`.
 *
 * The generated file is committed rather than produced during the build because
 * two separate pipelines consume it — tsup (`dist/global.css`) and Storybook's
 * Vite/PostCSS dev server — and neither has a hook to run a codegen step first.
 * `__tests__/theme-css.test.ts` compares the committed file against this
 * renderer, so drift fails CI rather than shipping.
 *
 * It lives outside `src/` deliberately: `src/global.css` declares
 * `@source '../src'`, so anything in there is scanned for utility candidates
 * and a stray class-shaped string in a build script would ship to consumers.
 */

type Token = string | string[] | number
type TokenTree = { [key: string]: Token | TokenTree }

const isTokenTree = (value: Token | TokenTree): value is TokenTree =>
  typeof value === 'object' && !Array.isArray(value)

/**
 * Flattens a nested token object the way Tailwind's JS theme does: nested keys
 * join with `-`, and `DEFAULT` names the parent rather than adding a segment.
 * `{ foreground: { muted: { DEFAULT: x } } }` becomes `foreground-muted`, which
 * is the `text-foreground-muted` utility both before and after this migration.
 */
const flatten = (tree: TokenTree, path: string[] = []): [string, string][] =>
  Object.entries(tree).flatMap(([key, value]) => {
    const next = key === 'DEFAULT' ? path : [...path, key]

    if (isTokenTree(value)) return flatten(value, next)

    return [
      [next.join('-'), Array.isArray(value) ? value.join(', ') : String(value)]
    ]
  })

/** `--color-brandGreen-100`, or bare `--shadow` for a top-level `DEFAULT`. */
const declarations = (namespace: string, tree: TokenTree, indent: string) =>
  flatten(tree).map(
    ([name, value]) =>
      `${indent}--${namespace}${name ? `-${name}` : ''}: ${value};`
  )

const kebab = (property: string) =>
  property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const rules = (
  styles: Record<string, Record<string, string>>,
  indent: string
) =>
  Object.entries(styles).map(([selector, block]) =>
    [
      `${indent}${selector} {`,
      ...Object.entries(block).map(
        ([property, value]) => `${indent}  ${kebab(property)}: ${value};`
      ),
      `${indent}}`
    ].join('\n')
  )

/**
 * One `--<namespace>-*: initial` per theme key that sits outside `extend` in
 * `src/theme.ts`.
 *
 * Outside `extend` a JS theme key *replaces* Tailwind's defaults; `@theme`
 * merges. Without these resets the default theme merges back in and reaches the
 * published `dist/global.css` with no error to show for it — measured at 322
 * bytes, `--font-mono`, `--color-gray-800`, and a `.text-gray-800` utility for
 * the misspelt class in Accordion that resolves to nothing today. Small only
 * because `src/` happens not to use much of the default palette; nothing stops
 * the next component from picking up a token we never meant to offer.
 *
 * Additive `extend` groups (`fontSize`, `borderRadius`, `transitionTimingFunction`,
 * `transitionDuration`, `keyframes`/`animation`) are deliberately absent here —
 * a reset would wipe Tailwind's matching defaults.
 */
const NAMESPACES = [
  ['color', 'colors'],
  ['shadow', 'boxShadow'],
  ['font', 'fontFamily'],
  ['stroke-width', 'strokeWidth']
] as const

const HEADER = `/* Generated from src/theme.ts and src/tailwind-base.ts — do not edit by hand.
   Run \`npm run build:theme\` after changing either, or \`npm test\` will fail.

   This is the whole of Quantum's Tailwind configuration. There is no JS config
   and no \`@config\` directive: v4 loads a JS config only through that explicitly
   transitional path, and going through it would mean none of these tokens exist
   as CSS custom properties a consumer can read or override at runtime. */`

export const themeCss = () =>
  [
    HEADER,
    '',
    `/* Our dark mode is driven by a \`.dark\` class, not by the operating system.
   v4's \`dark:\` variant defaults to a \`prefers-color-scheme\` media query, so it
   has to be pinned back — this is the CSS-first spelling of v3's
   \`darkMode: 'class'\`. */`,
    '@custom-variant dark (&:is(.dark *));',
    '',
    '@theme {',
    ...NAMESPACES.flatMap(([namespace, key]) => [
      `  /* ${key} replaces Tailwind's defaults rather than extending them. */`,
      `  --${namespace}-*: initial;`,
      ...declarations(namespace, theme[key] as TokenTree, '  '),
      ''
    ]),
    '  /* Extends rather than replaces — no `--text-*: initial`, `--radius-*: initial`,',
    '     `--ease-*: initial`, or `--duration-*: initial`, so Tailwind defaults stay. */',
    ...declarations('text', theme.extend.fontSize as TokenTree, '  '),
    ...declarations('radius', theme.extend.borderRadius as TokenTree, '  '),
    ...declarations(
      'ease',
      theme.extend.transitionTimingFunction as TokenTree,
      '  '
    ),
    ...declarations(
      'duration',
      theme.extend.transitionDuration as TokenTree,
      '  '
    ),
    '',
    '  /* Extends rather than replaces, so no `--animate-*: initial` above. The',
    '     `@keyframes` live in here so Tailwind emits them only when the matching',
    '     `animate-*` utility is actually used. */',
    ...declarations('animate', theme.extend.animation as TokenTree, '  '),
    ...Object.entries(theme.extend.keyframes).flatMap(([name, frames]) => [
      '',
      `  @keyframes ${name} {`,
      ...rules(frames as Record<string, Record<string, string>>, '    '),
      '  }'
    ]),
    '}',
    '',
    `/* Quantum's own base styles — see src/tailwind-base.ts for why they exist and
   why they must stay in the \`base\` cascade layer. \`src/tailwind-plugin.ts\`
   registers the same rules through \`addBase\` for consumers who never import
   this stylesheet. */`,
    '@layer base {',
    ...rules(baseStyles, '  '),
    '}',
    ''
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
