import { describe, expect, it } from '@jest/globals'
import * as React from 'react'

import { Pagination } from '../src/components/Pagination'
import { classesOf } from './helpers/markup'

const render = (currentPage: number) => (
  <Pagination
    currentPage={currentPage}
    setCurrentPage={() => {}}
    numberOfItemsPerPage={10}
    totalNumberOfFilteredItems={50}
  />
)

const PAGE_FLOOR = ['bg-background', 'bg-background-dark']

const hoverBackgrounds = (classNames: string[]) =>
  classNames.filter(name => /(^|:)hover:bg-/.test(name))

const utilityOf = (name: string) => name.slice(name.lastIndexOf(':') + 1)

describe('Pagination hover states', () => {
  const pageNumber = classesOf(render(1), 'button[aria-label="Go to page 2"]')
  const previous = classesOf(
    render(3),
    'button[aria-label="Go to previous page"]'
  )
  const next = classesOf(render(3), 'button[aria-label="Go to next page"]')

  it.each([
    ['an unselected page number', pageNumber],
    ['the previous step', previous],
    ['the next step', next]
  ])('never hovers %s onto the page background', (_name, classNames) => {
    expect(
      hoverBackgrounds(classNames).filter(name =>
        PAGE_FLOOR.includes(utilityOf(name))
      )
    ).toEqual([])
  })

  it('gives an unselected page number a hover in both themes', () => {
    expect(pageNumber).toEqual(
      expect.arrayContaining([
        'hover:bg-button-tertiary-hover',
        'dark:hover:bg-button-tertiary-hover-dark'
      ])
    )
  })

  it('keeps the accent on the current page when it is hovered', () => {
    const current = classesOf(render(2), 'button[aria-current="page"]')

    expect(hoverBackgrounds(current)).toEqual([
      'hover:bg-accent',
      'dark:hover:bg-primary-30'
    ])
  })

  it.each([
    ['previous', previous],
    ['next', next]
  ])('hovers the %s step only while it is enabled', (_name, classNames) => {
    expect(classNames).toEqual(
      expect.arrayContaining([
        'enabled:hover:bg-button-tertiary-hover',
        'dark:enabled:hover:bg-button-tertiary-hover-dark'
      ])
    )
    expect(
      hoverBackgrounds(classNames).filter(name => !name.includes('enabled:'))
    ).toEqual([])
  })

  it('leaves the list items unstyled so the hover sits on the button', () => {
    const items = classesOf(render(3), 'li:first-child')

    expect(hoverBackgrounds(items)).toEqual([])
  })
})

describe('Pagination disabled steps', () => {
  it.each([
    ['previous', 1, 'Go to previous page'],
    ['next', 5, 'Go to next page']
  ])('mutes the %s step when it is disabled', (_name, currentPage, label) => {
    const classNames = classesOf(
      render(currentPage),
      `button[aria-label="${label}"][disabled]`
    )

    expect(classNames).toEqual(
      expect.arrayContaining([
        'disabled:text-foreground-subtle',
        'dark:disabled:text-foreground-subtle-dark'
      ])
    )
  })
})
