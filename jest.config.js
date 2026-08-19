module.exports = {
  preset: 'ts-jest',
  transform: {
    // tsconfig.json resolves with `bundler` (module: esnext) so Storybook 10's
    // exports-only packages typecheck. Jest resolves with require(), so both
    // keys move back to the CommonJS pair here. `moduleResolution` is the one
    // that matters: ts-jest already forces CommonJS for emit, but leaves
    // type-checking on whatever tsconfig.json inherited, and it does not
    // surface options diagnostics, so `bundler` with `module: commonjs`
    // (TS5095) would stay silently in effect.
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      { tsconfig: { module: 'commonjs', moduleResolution: 'node10' } }
    ],
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
