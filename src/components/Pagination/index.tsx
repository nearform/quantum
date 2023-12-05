import React, { useState, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@/assets'

const PaginationVariants = cva([
  '[&>*]:flex',
  '[&>*]:items-center',
  '[&>*]:justify-center',
  'bg-background',
  'w-fit'
])

interface PaginationProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof PaginationVariants> {}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      setCurrentPage,
      numberOfItemsPerPage,
      totalNumberOfFilteredItems,
      ...props
    },
    refs
  ) => {
    const currentRowsLength = totalNumberOfFilteredItems ?? 0

    const totalPages = React.useMemo(() => {
      return Math.ceil(
        currentRowsLength > 0 ? currentRowsLength / numberOfItemsPerPage : 0
      )
    }, [currentRowsLength, numberOfItemsPerPage])

    const allPages = [...Array(totalPages + 1).keys()].slice(1)
    const [pageNumbers, setPageNumbers] = useState(allPages)
    const [showLeftDots, setShowLeftDots] = useState(false)
    const [showRightDots, setShowRightDots] = useState(false)
    const noOfSiblings = 1
    const noOfPagesShown = noOfSiblings * 2 + 5

    useEffect(() => {
      if (totalPages <= noOfPagesShown) {
        setPageNumbers(allPages)
        setShowRightDots(false)
        setShowLeftDots(false)
      } else if (currentPage <= noOfPagesShown - 3) {
        const pages = allPages.slice(0, noOfPagesShown - 2)
        pages.push(totalPages)
        setPageNumbers(pages)
        setShowRightDots(true)
        setShowLeftDots(false)
      } else if (
        noOfPagesShown - 3 < currentPage &&
        currentPage < totalPages - 3
      ) {
        const pages = [1]
        const start = Math.max(2, currentPage - noOfSiblings)
        const end = Math.min(totalPages - 1, currentPage + noOfSiblings)
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        pages.push(totalPages)
        setPageNumbers(pages)
        setShowRightDots(true)
        setShowLeftDots(true)
      } else if (currentPage >= totalPages - 3) {
        const pages = allPages.slice(-noOfPagesShown + 2)
        pages.unshift(1)
        setPageNumbers(pages)
        setShowRightDots(false)
        setShowLeftDots(true)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, totalPages])

    const goToNextPage = () => {
      if (currentPage !== totalPages) setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
      if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
      <nav className={cn(PaginationVariants(), className)} {...props}>
        <ul>
          <li className="hover:bg-background-subtle-dark px-4 border-r border-border-subtle">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronLeftOutlineIcon className={'w-3 h-3'} />
            </button>
          </li>

          <div className="flex flex-row items-center px-0">
            {pageNumbers.map(pgNumber => (
              <React.Fragment key={pgNumber}>
                {pgNumber === totalPages && showRightDots ? (
                  <div className="px-4 text-foreground-muted">...</div>
                ) : null}

                <li>
                  <button
                    onClick={() => setCurrentPage(pgNumber)}
                    className={cn(
                      'px-4 py-2 rounded-sm text-foreground-muted active:bg-accent active:text-primary-50  hover:bg-background-alt',
                      currentPage === pgNumber &&
                        'bg-accent text-primary-50 hover:bg-accent hover:text-primary-50'
                    )}
                  >
                    <div className="text-sm">{pgNumber}</div>
                  </button>
                </li>

                {pgNumber === 1 && showLeftDots ? (
                  <div>
                    <div className="px-4 text-foreground-muted">...</div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <li className="hover:bg-background-alt px-4 border-l border-border-subtle">
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRightOutlineIcon className={'w-3 h-3'} />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
)
