import { getJestConfig } from '@storybook/test-runner'
import path from 'path'
import { fileURLToPath } from 'url'

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * The test-runner ships its own Jest config and uses this file wholesale when
 * it exists, so the default has to be spread back in rather than merged.
 *
 * It exists only to add `setupFiles`, which the default config leaves unset.
 * The shim has to run before `setupFilesAfterEnv` — the test-runner's own
 * `jest-setup.js` loads `.storybook/test-runner.ts` from there, and that is the
 * call the shim unblocks.
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */
export default {
  ...getJestConfig(),
  setupFiles: [path.join(repoRoot, 'jest.module-hooks.setup.js')]
}
