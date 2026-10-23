module.exports = {
  setupFiles: ['<rootDir>/jest.module-hooks.setup.js'],
  testMatch: ['<rootDir>/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } }
        },
        module: { type: 'commonjs' }
      }
    ]
  }
}
