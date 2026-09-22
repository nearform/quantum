/**
 * Regenerates `src/quantum.css` from `src/theme.ts` and `src/tailwind-base.ts`.
 *
 * The renderer in `scripts/theme-css.ts` is TypeScript that imports `src/`
 * through extensionless specifiers, which Node cannot load on its own, so it
 * needs a TypeScript loader. ts-jest is the only one this repo declares — jiti
 * and esbuild are here, but as transitive dependencies we do not own. So the
 * write is driven from `__tests__/theme-css.test.ts`, which renders the CSS,
 * writes it when this environment variable is set, and then asserts the file
 * matches — the same write-then-verify shape as `jest --updateSnapshot`.
 *
 * Spawned from here rather than inlined in package.json because `VAR=1 cmd` is
 * shell syntax that does not work on Windows.
 */
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'

const jest = createRequire(import.meta.url).resolve('jest/bin/jest')

execFileSync(process.execPath, [jest, '__tests__/theme-css.test.ts'], {
  stdio: 'inherit',
  env: { ...process.env, QUANTUM_WRITE_THEME_CSS: '1' }
})
