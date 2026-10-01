import { describe, expect, it } from '@jest/globals'
import * as React from 'react'

import { Pagination } from '../src/components/Pagination'
import { elementOf } from './helpers/markup'

const firstPaint = (currentPage: number, totalNumberOfFilteredItems: number) =>
  elementOf(
    <Pagination
      currentPage={currentPage}
      setCurrentPage={() => {}}
      numberOfItemsPerPage={50}
      totalNumberOfFilteredItems={totalNumberOfFilteredItems}
    />,
    'ul'
  )

const pagesShown = (list: ReturnType<typeof firstPaint>) =>
  list
    .querySelectorAll('button[aria-label^="Go to page"]')
    .map(button => Number(button.text))

const ellipses = (list: ReturnType<typeof firstPaint>) =>
  list.querySelectorAll('li[aria-hidden="true"]').length

describe('Pagination page window on first paint', () => {
  it.each([
    [1, 500, [1, 2, 3, 4, 5, 10], 1],
    [5, 500, [1, 4, 5, 6, 10], 2],
    [6, 500, [1, 5, 6, 7, 10], 2],
    [7, 500, [1, 6, 7, 8, 9, 10], 1],
    [10, 500, [1, 6, 7, 8, 9, 10], 1],
    [1, 350, [1, 2, 3, 4, 5, 6, 7], 0],
    [1, 0, [], 0]
  ])(
    'shows the trimmed window for page %i of %i items without waiting for an effect',
    (currentPage, items, pages, dots) => {
      const list = firstPaint(currentPage, items)

      expect(pagesShown(list)).toEqual(pages)
      expect(ellipses(list)).toBe(dots)
    }
  )
})
