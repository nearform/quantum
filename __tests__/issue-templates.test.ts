import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'

const componentsDir = path.join(__dirname, '../src/components')
const templatesDir = path.join(__dirname, '../.github/ISSUE_TEMPLATE')
const templates = [
  ['bug report', 'component_bug_report_template.yml'],
  ['design update', 'design-update-issue-template.yml']
]

const optionNames: Record<string, string> = { Radio: 'RadioGroup' }

const componentNames = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => optionNames[entry.name] ?? entry.name)

const componentOptions = (file: string) => {
  const lines = fs
    .readFileSync(path.join(templatesDir, file), 'utf8')
    .split('\n')
  const start = lines.findIndex(line =>
    line.includes('label: Component Affected')
  )
  const optionsStart = lines.indexOf('      options:', start) + 1
  const options: string[] = []
  for (const line of lines.slice(optionsStart)) {
    const match = /^ {8}- (.+)$/.exec(line)
    if (!match) break
    options.push(match[1])
  }
  return options
}

describe.each(templates)('%s template', (_, file) => {
  it('lists every component in order, then the generic choices', () => {
    expect(componentOptions(file)).toEqual([
      ...[...componentNames].sort(),
      'Colours',
      'Typography',
      'Other'
    ])
  })
})
