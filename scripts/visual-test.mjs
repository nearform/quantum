import { execFileSync, spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { resolve } from 'node:path'

const args = process.argv.slice(2)
const baseFlag = args.indexOf('--base')
const baseRef = baseFlag === -1 ? 'origin/main' : args.splice(baseFlag, 2).at(1)
const allFlag = args.indexOf('--all')
const runAll = allFlag !== -1
if (runAll) args.splice(allFlag, 1)
const reportFlag = args.indexOf('--report-only')
const reportOnly = reportFlag !== -1
if (reportOnly) args.splice(reportFlag, 1)

const git = (...gitArgs) =>
  execFileSync('git', gitArgs, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore']
  }).trim()

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

const changedFiles = [
  git('diff', '--name-only', '--no-renames', base),
  git('ls-files', '--others', '--exclude-standard')
].join('\n')
mkdirSync('visual-regression', { recursive: true })
writeFileSync('visual-regression/changed-files.txt', changedFiles)

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'))
const { version } = lock.packages['node_modules/playwright']

const image = `mcr.microsoft.com/playwright:v${version}-noble`

const inContainer = [
  'set -e',
  'npm ci --no-audit --no-fund',
  'if [ "$(node scripts/visual-affected.mjs select)" = none ]; then exit 0; fi',
  '(cd /base && npm ci --no-audit --no-fund && npx storybook build --quiet -o /tmp/storybook-base)',
  'npx storybook build --quiet -o /tmp/storybook-head',
  'BASE_STORIES=$(node scripts/visual-affected.mjs filter /tmp/storybook-base)',
  'HEAD_STORIES=$(node scripts/visual-affected.mjs filter /tmp/storybook-head)',
  'echo "Screenshotting $BASE_STORIES base and $HEAD_STORIES branch stories"',
  '(npx --yes http-server /tmp/storybook-base --port 6006 --silent &)',
  '(npx --yes http-server /tmp/storybook-head --port 6007 --silent &)',
  'npx --yes wait-on tcp:6006 tcp:6007',
  'if [ "$BASE_STORIES" -gt 0 ]; then VISUAL_TEST=true VISUAL_BASELINE=true npx test-storybook --index-json --url http://127.0.0.1:6006 -u; fi',
  'if [ "$HEAD_STORIES" -gt 0 ]; then VISUAL_TEST=true npx test-storybook --index-json --url http://127.0.0.1:6007 --json --outputFile=visual-regression/results.json "$@"; fi'
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
    '-e',
    `VISUAL_ALL=${runAll}`,
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

const RESULTS = 'visual-regression/results.json'

if (!reportOnly || status === 0 || !existsSync(RESULTS)) {
  process.exit(status ?? 1)
}

const failed = JSON.parse(readFileSync(RESULTS, 'utf8')).testResults.flatMap(
  file => file.assertionResults.filter(test => test.status === 'failed')
)
const otherFailures = failed.filter(
  test =>
    !test.failureMessages.every(message => message.includes('Visual mismatch'))
)

if (failed.length === 0 || otherFailures.length > 0) {
  for (const test of otherFailures) console.error(`Failed: ${test.fullName}`)
  process.exit(status ?? 1)
}

const changed = failed.map(test => test.ancestorTitles.join(' › '))
writeFileSync(
  'visual-regression/changed-stories.txt',
  `${changed.join('\n')}\n`
)
console.log(
  `${changed.length} stor${changed.length === 1 ? 'y has' : 'ies have'} visual changes to review:\n${changed.map(name => `  ${name}`).join('\n')}`
)
