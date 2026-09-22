/**
 * Turns Jest's `module.register`/`module.registerHooks` stubs from throwing
 * into no-ops. Shared by `jest.config.js` and
 * `.storybook/test-runner-jest.config.mjs`.
 *
 * Since jest-runtime 30.5.0, Jest replaces both registrars on its sandboxed
 * `node:module` with a function that throws, on the grounds that a hook
 * registered from test code attaches to the loader running Jest itself and
 * stays registered for every later file in the worker. There is no config flag
 * to opt out, and two dependencies register a hook at import time:
 *
 * - `@tailwindcss/node`, reached by `__tests__/plugin.test.ts` importing
 *   `@tailwindcss/postcss` to compile the published plugin through a real
 *   PostCSS pipeline.
 * - `storybook/internal/common`'s `serverRequire`, which the test-runner uses
 *   to load `.storybook/test-runner.ts` — so every story file fails to run.
 *
 * Replacing the stubs with no-ops lets both calls through without registering
 * anything, and nothing downstream needs the hook to have taken effect. Jest
 * already transforms the files those loaders exist to handle — it compiles
 * `.storybook/test-runner.ts` itself, so Storybook's TypeScript loader is
 * redundant here — and Tailwind's hook only propagates its `?id=` cache-buster
 * across a module *reload*, which a single test run never does. Jest's own
 * hazard is avoided outright: no hook is registered at all, rather than one
 * leaking between test files.
 *
 * The name check keeps this to Jest's stub. Outside a Jest worker these are the
 * real Node functions and must be left alone.
 */
import Module from 'module'

for (const registrar of ['register', 'registerHooks']) {
  if (Module[registrar]?.name === 'throwHooksUnsupported') {
    Module[registrar] = function noopHookRegistrar() {}
  }
}
