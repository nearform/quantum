module.exports = {
  preset: 'ts-jest',
  transform: {
    // tsconfig.json targets the bundler (module: esnext) so Storybook 10's
    // exports-only packages resolve; Jest runs CommonJS, so override the
    // module format here rather than degrading resolution project-wide.
    '^.+\\.(ts|tsx)?$': ['ts-jest', { tsconfig: { module: 'commonjs' } }],
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
