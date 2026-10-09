import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'))
const { version } = lock.packages['node_modules/playwright']

const image = `mcr.microsoft.com/playwright:v${version}-noble`

const inContainer = [
  'set -e',
  'npm ci --no-audit --no-fund',
  'npm run build-storybook --quiet',
  '(npx --yes http-server storybook-static --port 6006 --silent &)',
  'npx --yes wait-on tcp:6006',
  'VISUAL_TEST=true npx test-storybook --url http://127.0.0.1:6006 "$@"'
].join('\n')

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
    '/work/storybook-static',
    '-v',
    'quantum-visual-npm-cache:/root/.npm',
    '-w',
    '/work',
    image,
    'sh',
    '-c',
    inContainer,
    'sh',
    ...process.argv.slice(2)
  ],
  { stdio: 'inherit' }
)

if (error) throw error
process.exit(status ?? 1)
