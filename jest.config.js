module.exports = {
  preset: 'ts-jest',
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
      { tsconfig: { module: 'node16', moduleResolution: 'node16' } }
    ],
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
