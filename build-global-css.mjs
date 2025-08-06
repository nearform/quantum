import fs from 'node:fs'

const cssContent = fs.readFileSync('./src/global.css')

fs.writeFileSync(
  './dist/tw-global.css',
  [cssContent, '@source "@nearform/quantum/dist/index.js";'].join('\n')
)
