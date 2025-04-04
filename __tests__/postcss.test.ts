import fs from 'node:fs'
import { expect, test } from '@jest/globals'

import tailwindcss from '@tailwindcss/postcss'

import postcss from 'postcss'

function runTest({ base, css }: { base?: string; css?: string } = {}) {
  const fullCss = ['@import "tailwindcss";', css || ''].join('\n')
  return postcss(
    tailwindcss({
      base: base || './inexistent-base' // Prevent tailwind from scanning any files automatically
    })
  ).process(fullCss, {
    from: './src/dummy.css' // Need the path to be able to resolve packages in css
  })
}

test('should have no classes in the output when nothing ', async () => {
  const res = await runTest()
  expect(res.css.length > 100).toBe(true) // includes the reset
  expect(/\.\w+ {/.test(res.css)).toBe(false) // no classes
})

test('should generate the same css in dev and build version', async () => {
  const css = fs.readFileSync('./src/global.css').toString()
  const resDev = await runTest({ base: './src', css })
  const resProd = await runTest({
    base: '/no-base',
    css: [
      `@import "../dist/tw-global.css";`,
      `@source "../dist/index.js";` // this is to replace the source directive in the tw-global.css that points to the installed module
    ].join('\n')
  })

  expect(resDev.css.match(/--color-primary-30: ([^;]+)/)?.[1]).toBe('#97a1b8')
  expect(resDev.css.match(/--color-secondary-100: ([^;]+)/)?.[1]).toBe(
    '#03e5a4'
  )
  expect(resProd.css.match(/--color-primary-30: ([^;]+)/)?.[1]).toBe('#97a1b8')
  expect(resProd.css.match(/--color-secondary-100: ([^;]+)/)?.[1]).toBe(
    '#03e5a4'
  )

  console.log(resDev.css.length, css.length, resProd.css.length)
})
