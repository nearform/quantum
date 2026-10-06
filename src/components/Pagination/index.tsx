import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { BsChevronLeft, BsChevronRight } from '../../assets'

interface PaginationProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  numberOfItemsPerPage: number
  totalNumberOfFilteredItems: number
  label?: string
  previousLabel?: string
  nextLabel?: string
  pageLabel?: (page: number) => string
}

const PaginationVariants = cva([
  '[&>*]:flex',
  '[&>*]:items-center',
  '[&>*]:justify-center',
  'w-fit'
])

const PageNumberStyles = cva([
  'min-w-40',
  'max-w-40',
  'h-10',
  'px-4',
  'py-2',
  'rounded-xs',
  'text-foreground-muted',
  'dark:text-foreground-muted-dark',
  'hover:bg-button-tertiary-hover',
  'dark:hover:bg-button-tertiary-hover-dark',
  'active:bg-accent',
  'active:text-primary-10',
  'dark:active:bg-primary-30',
  'dark:active:text-grey-900'
])

const PageNumberActiveStyles = cva([
  'bg-accent',
  'text-primary-10',
  'hover:bg-accent',
  'hover:text-primary-10',
  'dark:bg-primary-30',
  'dark:text-grey-900',
  'dark:hover:bg-primary-30',
  'dark:hover:text-grey-900'
])

const StepButtonStyles = cva([
  'px-4',
  'rounded-xs',
  'text-foreground',
  'dark:text-foreground-dark',
  'enabled:hover:bg-button-tertiary-hover',
  'dark:enabled:hover:bg-button-tertiary-hover-dark',
  'disabled:text-foreground-subtle',
  'dark:disabled:text-foreground-subtle-dark'
])

const noOfSiblings = 1
const noOfPagesShown = noOfSiblings * 2 + 5

const range = (from: number, to: number) =>
  Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i)

const pageWindow = (currentPage: number, totalPages: number) => {
  if (totalPages <= noOfPagesShown) {
    return {
      pageNumbers: range(1, totalPages),
      showLeftDots: false,
      showRightDots: false
    }
  }
  if (currentPage <= noOfPagesShown - 3) {
    return {
      pageNumbers: [...range(1, noOfPagesShown - 2), totalPages],
      showLeftDots: false,
      showRightDots: true
    }
  }
  if (currentPage < totalPages - 3) {
    return {
      pageNumbers: [
        1,
        ...range(
          Math.max(2, currentPage - noOfSiblings),
          Math.min(totalPages - 1, currentPage + noOfSiblings)
        ),
        totalPages
      ],
      showLeftDots: true,
      showRightDots: true
    }
  }
  return {
    pageNumbers: [1, ...range(totalPages - noOfPagesShown + 3, totalPages)],
    showLeftDots: true,
    showRightDots: false
  }
}

interface PaginationProps
  extends
    React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof PaginationVariants> {}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      setCurrentPage,
      numberOfItemsPerPage,
      totalNumberOfFilteredItems,
      label = 'Pagination',
      previousLabel = 'Go to previous page',
      nextLabel = 'Go to next page',
      pageLabel = page => `Go to page ${page}`,
      ...props
    },
    ref
  ) => {
    const currentRowsLength = totalNumberOfFilteredItems ?? 0

    const totalPages = React.useMemo(() => {
      return Math.ceil(
        currentRowsLength > 0 ? currentRowsLength / numberOfItemsPerPage : 0
      )
    }, [currentRowsLength, numberOfItemsPerPage])

    const { pageNumbers, showLeftDots, showRightDots } = React.useMemo(
      () => pageWindow(currentPage, totalPages),
      [currentPage, totalPages]
    )

    const goToNextPage = () => {
      if (currentPage !== totalPages) setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
      if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
      <nav
        aria-label={label}
        className={cn(PaginationVariants(), className)}
        ref={ref}
        {...props}
      >
        <ul>
          <li>
            <button
              type="button"
              aria-label={previousLabel}
              className={StepButtonStyles()}
              onClick={goToPrevPage}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <BsChevronLeft
                aria-hidden="true"
                className={'w-3 h-9 pt-3 pb-3 -mb-1'}
              />
            </button>
          </li>

          {pageNumbers.map(pgNumber => (
            <React.Fragment key={pgNumber}>
              {pgNumber === totalPages && showRightDots ? (
                <li
                  aria-hidden="true"
                  className="flex items-center px-4 min-w-40 max-w-40 text-foreground-muted dark:text-foreground-muted-dark"
                >
                  ...
                </li>
              ) : null}

              <li>
                <button
                  type="button"
                  aria-label={pageLabel(pgNumber)}
                  aria-current={currentPage === pgNumber ? 'page' : undefined}
                  onClick={() => setCurrentPage(pgNumber)}
                  className={cn(
                    PageNumberStyles(),
                    currentPage === pgNumber && PageNumberActiveStyles()
                  )}
                >
                  <div className="text-sm">{pgNumber}</div>
                </button>
              </li>

              {pgNumber === 1 && showLeftDots ? (
                <li
                  aria-hidden="true"
                  className="flex items-center px-4 max-w-40 min-w-40 text-foreground-muted dark:text-foreground-muted-dark"
                >
                  ...
                </li>
              ) : null}
            </React.Fragment>
          ))}

          <li>
            <button
              type="button"
              aria-label={nextLabel}
              className={StepButtonStyles()}
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <BsChevronRight
                aria-hidden="true"
                className={'w-3 h-9 py-3 -mb-1'}
              />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'
