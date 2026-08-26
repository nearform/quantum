import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: [
      'src/index.ts',
      'src/colors/index.ts',
      'src/tailwind-plugin.ts',
      'src/animations'
    ],
    // Tailwind v4's `@plugin` directive cannot interop a CJS module that uses
    // `exports.default`, so the plugin needs a real ESM build alongside the CJS one.
    format: ['cjs', 'esm'],
    // Keep Tailwind out of the bundle. Bundling it ships a private copy of the
    // plugin runtime, which can drift from the version the consumer resolves.
    external: ['tailwindcss'],
    dts: {
      entry: ['src/index.ts'],
      // tsconfig.json now resolves with `bundler` so Storybook 10's exports-only
      // packages typecheck. Declaration emit is pinned to the previous algorithm
      // so the published dist/index.d.ts keeps the exact specifiers it ships
      // today (`class-variance-authority/dist/types`, which `bundler` would
      // rewrite to the exports-map subpath and break node10 consumers).
      // The divergence from tsconfig.json is deliberate and fails closed: if
      // src/ ever imports an exports-only package, `tsc --noEmit` stays green
      // while `npm run build` stops with `TS2307` in the dts build, so the
      // published types cannot change silently.
      compilerOptions: { module: 'commonjs', moduleResolution: 'node10' }
    },
    // `clean` is off in both configs and dist/ is wiped by the `prebuild`
    // script instead. tsup runs the two configs concurrently, so a `clean: true`
    // here races the CSS build below: it would delete a dist/global.css that had
    // already been written. Today the clean wins and the output is correct, but
    // it is decided by which finishes first, and losing the published stylesheet
    // is exactly the silent failure this build should not be able to have.
    clean: false,
    sourcemap: true
  },
  {
    // Compiling Tailwind is the most expensive step in the build, and CSS output
    // is format-independent, so building it under both `cjs` and `esm` did the
    // same work twice and wrote dist/global.css twice.
    entry: ['src/global.css'],
    format: ['cjs'],
    clean: false,
    sourcemap: true
  }
])
