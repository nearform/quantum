import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'

const COMPONENTS = path.join(__dirname, '../src/components')
const THEME = fs.readFileSync(
  path.join(__dirname, '../src/quantum.css'),
  'utf8'
)

const sourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(full)
    return /\.tsx?$/.test(entry.name) ? [full] : []
  })

const namedShadows = [
  ...new Set(
    sourceFiles(COMPONENTS).flatMap(file =>
      [
        ...fs
          .readFileSync(file, 'utf8')
          .matchAll(
            /(?<=^|[\s'"`:])shadow-([A-Za-z][A-Za-z0-9-]*)(?=[\s'"`]|$)/gm
          )
      ].map(match => match[1])
    )
  )
]

describe('shadow utilities in components', () => {
  it('finds the named shadows to check', () => {
    expect(namedShadows).toContain('brandGreen10')
  })

  it.each(namedShadows)('shadow-%s resolves to a --shadow token', name => {
    expect(THEME).toContain(`--shadow-${name}:`)
  })
})
