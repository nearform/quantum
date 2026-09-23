module.exports = {
  // ts-jest has no 30.x line to align with: 29.4.12 is its latest release and
  // declares `jest: ^29.0.0 || ^30.0.0`, so it is the jest 30 pairing rather
  // than a version lagging behind one.
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.module-hooks.setup.js'],
  // Narrower than the default `**/__tests__/**/*.[jt]s?(x)`, which collects
  // every file under `__tests__/` as a suite and fails the shared helpers in
  // `__tests__/helpers/` for containing no tests. Every suite here already
  // ends in `.test.ts`/`.test.tsx`, so this changes nothing about what runs.
  testMatch: ['<rootDir>/__tests__/**/*.test.[jt]s?(x)'],
  // Mirrors the `@/*` path alias in tsconfig.json. ts-jest type-checks against
  // that alias but does not resolve it at runtime, so `src/` imports of
  // `@/assets` or `@/lib/utils` would otherwise fail to load.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    // tsconfig.json resolves with `bundler` (module: esnext) so Storybook 10's
    // exports-only packages typecheck. Jest resolves with require(), so both
    // keys move to a CommonJS-emitting pair here. `moduleResolution` is the one
    // that matters: ts-jest already forces CommonJS for emit, but leaves
    // type-checking on whatever tsconfig.json inherited, and it does not
    // surface options diagnostics, so `bundler` with `module: commonjs`
    // (TS5095) would stay silently in effect.
    //
    // `node16` rather than `node10`: Tailwind v4 is exports-only with no `main`,
    // so node10 cannot resolve `tailwindcss`, `tailwindcss/plugin` or
    // `@tailwindcss/postcss` and the suite fails to compile with TS2307.
    // node16 honours `exports` while still emitting CommonJS for these files.
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'node16',
          moduleResolution: 'node16',
          // ts-jest >=29.4 refuses a hybrid module kind unless the file is
          // compilable in isolation, and silently falls back to `commonjs` +
          // `node10` when it is not -- which reinstates the TS2307 failures
          // that `node16` is here to avoid.
          isolatedModules: true
        }
      }
    ],
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
