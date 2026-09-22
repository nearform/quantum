import { getJestConfig } from '@storybook/test-runner'

const baseConfig = getJestConfig()

/**
 * The test-runner uses this file wholesale once it exists, so its own config
 * has to be spread back in rather than merged for us.
 *
 * It is here only to add `setupFiles`, which the default config leaves unset —
 * appended rather than assigned, so a future test-runner release that ships
 * entries of its own keeps them. The shim has to run before
 * `setupFilesAfterEnv`: the test-runner's `jest-setup.js` loads
 * `.storybook/test-runner.ts` from there, and that is the call it unblocks.
 *
 * `rootDir` is the repo root here, as it is in jest.config.js, so both runners
 * can name the shim the same way.
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  ...baseConfig,
  setupFiles: [
    ...(baseConfig.setupFiles ?? []),
    '<rootDir>/jest.module-hooks.setup.js'
  ]
}
