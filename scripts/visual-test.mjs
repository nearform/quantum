import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
const baseFlag = args.indexOf('--base')
const baseRef = baseFlag === -1 ? 'origin/main' : args.splice(baseFlag, 2).at(1)

const git = (...gitArgs) =>
  execFileSync('git', gitArgs, { encoding: 'utf8' }).trim()

const base = git('merge-base', 'HEAD', baseRef)

try {
  git('cat-file', '-e', `${base}:scripts/visual-test.mjs`)
} catch {
  console.log(
    `Skipping visual regression: ${base.slice(0, 7)} has no visual tests to compare against yet.`
  )
  process.exit(0)
}

const baseDir = resolve('node_modules/.cache/quantum-visual-base')
rmSync(baseDir, { recursive: true, force: true })
rmSync('visual-regression', { recursive: true, force: true })
mkdirSync(baseDir, { recursive: true })
const archive = execFileSync('git', ['archive', '--format=tar', base], {
  maxBuffer: 1024 * 1024 * 1024
})
execFileSync('tar', ['-x', '-C', baseDir], { input: archive })

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'))
const { version } = lock.packages['node_modules/playwright']

const image = `mcr.microsoft.com/playwright:v${version}-noble`

const inContainer = [
  'set -e',
  '(cd /base && npm ci --no-audit --no-fund && npx storybook build --quiet -o /tmp/storybook-base)',
  'npm ci --no-audit --no-fund',
  'npx storybook build --quiet -o /tmp/storybook-head',
  '(npx --yes http-server /tmp/storybook-base --port 6006 --silent &)',
  '(npx --yes http-server /tmp/storybook-head --port 6007 --silent &)',
  'npx --yes wait-on tcp:6006 tcp:6007',
  'VISUAL_TEST=true VISUAL_BASELINE=true npx test-storybook --index-json --url http://127.0.0.1:6006 -u',
  'VISUAL_TEST=true npx test-storybook --index-json --url http://127.0.0.1:6007 "$@"'
].join('\n')

console.log(`Comparing against ${base.slice(0, 7)} (${baseRef})`)

const { status, error } = spawnSync(
  'docker',
  [
    'run',
    '--rm',
    '--init',
    '--ipc=host',
    '-e',
    'QUANTUM_VISUAL_CONTAINER=1',
    '-v',
    `${process.cwd()}:/work`,
    '-v',
    '/work/node_modules',
    '-v',
    `${baseDir}:/base`,
    '-v',
    '/base/node_modules',
    '-v',
    'quantum-visual-npm-cache:/root/.npm',
    '-w',
    '/work',
    image,
    'sh',
    '-c',
    inContainer,
    'sh',
    ...args
  ],
  { stdio: 'inherit' }
)

if (error) throw error
process.exit(status ?? 1)
