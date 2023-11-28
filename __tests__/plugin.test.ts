import { describe, expect, it } from '@jest/globals'
import qPlugin from '../src/tailwind-plugin'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import { ContentConfig } from 'tailwindcss/types/config'
import path from 'path'

function run(testContent: ContentConfig) {
  return postcss(
    tailwindcss({
      //is this how tailwind executes?
      content: testContent,
      plugins: [qPlugin]
    })
  ).process('@tailwind utilities;', {
    from: undefined
  })
}

describe('Plugin can add index.js to content', () => {
  it('Is added to the tailwind config with files key', async () => {
    const testContent: ContentConfig = {
      files: ['./src/content.js', './stories/**/*'],
      relative: false
    }
    const filesLength = testContent.files.length
    const twConfig = await run(testContent) //.then(t => {
    const [msgs, msgsLength] = [twConfig.messages, twConfig.messages.length]
    expect(msgsLength).toBe(filesLength + 1)
    expect(msgs.some(msg => msg.file.includes('index.js'))).toBe(true)
  })
  it('Can add to the content if array', async () => {
    const testContent: ContentConfig = ['./src/content.js', './stories/**/*']
    const filesLength = testContent.length
    const twConfig = await run(testContent)
    const [msgs, msgsLength] = [twConfig.messages, twConfig.messages.length]
    expect(msgsLength).toBe(filesLength + 1)
    expect(msgs.some(msg => msg.file.includes('index.js'))).toBe(true)
  })
  it('Uses the right path to the package if relative', () => {})
  it('Doesnt add the path if already there', async () => {
    const pkgLoc = path.join(__dirname, '../src/index.js') //where index.js is wrt this test file
    const testContent: ContentConfig = [
      './src/content.js',
      './stories/**/*',
      pkgLoc
    ]
    const filesLength = testContent.length
    const twConfig = await run(testContent)
    console.log(twConfig)
    const [msgs, msgsLength] = [twConfig.messages, twConfig.messages.length]
    expect(msgsLength).toBe(filesLength)
    expect(
      msgs.reduce((acc, msg) => {
        console.log(msg)
        return msg.file?.includes('index.js') ? acc + 1 : acc
      }, 0)
    ).toBe(1)
  })
})
