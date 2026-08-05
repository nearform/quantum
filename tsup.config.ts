import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/global.css',
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
  dts: { entry: ['src/index.ts'] },
  clean: true,
  sourcemap: true
})
