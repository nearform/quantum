import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const typescriptPkg = require.resolve('typescript/package.json')
const tsc = join(dirname(typescriptPkg), require(typescriptPkg).bin.tsc)
const postcss = require.resolve('postcss-cli/index.js')

const run = (bin, args) =>
  execFileSync(process.execPath, [bin, ...args], { stdio: 'inherit' })

run(tsc, ['-p', 'tsconfig.build.json'])
run(tsc, ['-p', 'tsconfig.build.plugin-cjs.json'])
run(tsc, ['-p', 'tsconfig.build.plugin-esm.json'])
writeFileSync('dist/esm/package.json', '{ "type": "module" }\n')
run(postcss, ['src/global.css', '-o', 'dist/global.css'])
