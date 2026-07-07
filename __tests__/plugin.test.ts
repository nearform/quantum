import { describe, expect, it } from '@jest/globals'
import qPlugin from '../src/tailwind-plugin'
import path from 'path'

type ContentConfig = string[] | { files: string[]; relative?: boolean }

function runPlugin(testContent: ContentConfig) {
  const config: { content: ContentConfig; plugins: unknown[] } = {
    content: testContent,
    plugins: [qPlugin]
  }

  qPlugin.handler({
    config: (configPath?: string) => (configPath ? undefined : config),
    theme: () => undefined,
    addBase: () => undefined,
    addComponents: () => undefined,
    addUtilities: () => undefined,
    addVariant: () => undefined,
    matchComponents: () => undefined,
    matchUtilities: () => undefined,
    matchVariant: () => undefined,
    e: (className: string) => className,
    prefix: (selector: string) => selector,
    corePlugins: () => false
  } as Parameters<typeof qPlugin.handler>[0])

  return config
}

describe('Plugin can add index.js to content', () => {
  it('Is added to the tailwind config with files key', () => {
    const testContent: ContentConfig = {
      files: ['./src/content.js', './stories/**/*'],
      relative: false
    }
    const filesLength = (testContent as { files: string[] }).files.length
    const result = runPlugin(testContent)
    const resultContent = result.content as { files: string[] }
    expect(resultContent.files.length).toBe(filesLength + 1)
    expect(resultContent.files.some(file => file.includes('index.js'))).toBe(
      true
    )
  })

  it('Can add to the content if array', () => {
    const testContent: ContentConfig = ['./src/content.js', './stories/**/*']
    const result = runPlugin(testContent)
    expect(
      (result.content as string[]).some(file => file.includes('index.js'))
    ).toBe(true)
  })

  it('Doesnt add the path if already there', () => {
    const pkgLoc = path.join(__dirname, '../src/index.js')
    const testContent: ContentConfig = [
      './src/content.js',
      './stories/**/*',
      pkgLoc
    ]
    const filesLength = testContent.length
    const result = runPlugin(testContent)
    const resultContent = result.content as string[]
    expect(resultContent.length).toBe(filesLength)
    expect(
      resultContent.reduce((acc, file) => {
        return file.includes('index.js') ? acc + 1 : acc
      }, 0)
    ).toBe(1)
  })
})
