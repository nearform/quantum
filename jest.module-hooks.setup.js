/**
 * Replaces `module.register`/`module.registerHooks` with no-ops inside Jest.
 * Shared by `jest.config.js` and `.storybook/test-runner-jest.config.mjs`.
 *
 * A module customization hook registered from test code attaches to the loader
 * running Jest itself, never to the sandboxed require/import that test code
 * uses, and stays registered for every later file in the worker. jest-runtime
 * 30.5.0 started rejecting the attempt outright — both registrars throw, with
 * no config flag to opt out — and two dependencies register one at import time:
 *
 * - `@tailwindcss/node`, reached by `__tests__/plugin.test.ts` importing
 *   `@tailwindcss/postcss` to compile the published plugin through a real
 *   PostCSS pipeline.
 * - `storybook/internal/common`'s `serverRequire`, which the test-runner uses
 *   to load `.storybook/test-runner.ts` — so every story file fails to run.
 *
 * Neither loader earns its keep here. Jest transforms `.storybook/
 * test-runner.ts` itself, so Storybook's TypeScript loader is redundant, and
 * Tailwind's hook only propagates its `?id=` cache-buster across a module
 * *reload*, which a single test run never does. No-ops let both calls through
 * while registering nothing — which is the outcome Jest's guard is asking for,
 * and one these two callers can do without.
 *
 * Keyed on being inside a Jest worker rather than on the shape of Jest's stub.
 * Recognising the stub by its internal name would silently stop applying the
 * day Jest renames it, and the reasoning above holds for every Jest version,
 * not only the ones that throw. Inside a worker `node:module` is Jest's own
 * sandboxed copy, so this never reaches the real loader.
 */
import Module from 'module'

if (process.env.JEST_WORKER_ID === undefined) {
  throw new Error(
    'jest.module-hooks.setup.js loaded outside a Jest worker. It is only safe there, ' +
      'because only there is `node:module` a sandboxed copy rather than the real loader.'
  )
}

const noopHookRegistrar = () => {}

for (const registrar of ['register', 'registerHooks']) {
  Module[registrar] = noopHookRegistrar

  // Jest's sandboxed `node:module` is a plain object today, so this assignment
  // cannot quietly fail. If a future release freezes it or serves the
  // registrars through a getter, the shim would stop working and the suites
  // would break somewhere far from here — so say so at the source instead.
  if (Module[registrar] !== noopHookRegistrar) {
    throw new Error(
      `jest.module-hooks.setup.js could not replace module.${registrar}: Jest's sandboxed ` +
        '`node:module` no longer accepts the assignment, and this shim needs rewriting.'
    )
  }
}
