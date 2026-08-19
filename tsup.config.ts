import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/global.css',
    'src/colors/index.ts',
    'src/tailwind-plugin.ts',
    'src/animations'
  ],
  dts: {
    entry: ['src/index.ts'],
    // tsconfig.json now resolves with `bundler` so Storybook 10's exports-only
    // packages typecheck. Declaration emit is pinned to the previous algorithm
    // so the published dist/index.d.ts keeps the exact specifiers it ships
    // today (`class-variance-authority/dist/types`, which `bundler` would
    // rewrite to the exports-map subpath and break node10 consumers).
    compilerOptions: { module: 'commonjs', moduleResolution: 'node10' }
  },
  clean: true,
  sourcemap: true
})
