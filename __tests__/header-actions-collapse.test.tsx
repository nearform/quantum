import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { AppHeaderActions } from '../src/components/AppHeader'
import { WebsiteHeaderActions } from '../src/components/WebsiteHeader'

const classesOf = (element: React.ReactElement) => {
  const markup = renderToStaticMarkup(element)
  const match = markup.match(/class="([^"]*)"/)
  return match ? match[1].split(' ') : []
}

describe.each([
  ['AppHeaderActions', AppHeaderActions],
  ['WebsiteHeaderActions', WebsiteHeaderActions]
])('%s', (_name, Actions) => {
  it('hides below sm by default', () => {
    const classes = classesOf(<Actions>actions</Actions>)

    expect(classes).toEqual(expect.arrayContaining(['hidden', 'sm:flex']))
    expect(classes).not.toContain('flex')
  })

  it('stays visible at every width when collapse is false', () => {
    const classes = classesOf(<Actions collapse={false}>actions</Actions>)

    expect(classes).toContain('flex')
    expect(classes).not.toContain('hidden')
    expect(classes).not.toContain('sm:flex')
  })

  it('keeps consumer classes alongside the collapse behaviour', () => {
    const classes = classesOf(
      <Actions collapse={false} className="ml-auto">
        actions
      </Actions>
    )

    expect(classes).toEqual(expect.arrayContaining(['flex', 'ml-auto']))
  })

  it('does not forward collapse to the DOM', () => {
    const markup = renderToStaticMarkup(
      <Actions collapse={false}>actions</Actions>
    )

    expect(markup).not.toContain('collapse')
  })
})
