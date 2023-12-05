import React, { useState, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChevronLeftOutlineIcon, ChevronRightOutlineIcon } from '@/assets'

const PaginationVariants = cva([
  'inline-flex',
  '[&>*]:flex',
  '[&>*]:rounded-none',
  '[&>*]:border-0',
  'divide-border-subtle',
  'p-0',
  '[&>*]:gap-[10px]',
  '[&>*]:items-center',
  '[&>*]:justify-center',
  '[&>*]:px-3',
  'items-start',
  'rounded-lg',
  'overflow-hidden',
  'inline-flex',
  'divide-x-[1px'
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
        <ul className="">
          <li className="px-5 py-5  hover:bg-background-alt">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronLeftOutlineIcon
                className={'w-10 h-10 stroke-foreground'}
              />
            </button>
          </li>

          <div className="flex flex-row items-center">
            {pageNumbers.map(pgNumber => (
              <React.Fragment key={pgNumber}>
                {pgNumber === totalPages && showRightDots ? (
                  <div className="px-5 py-5">...</div>
                ) : null}

                <li>
                  <button
                    onClick={() => setCurrentPage(pgNumber)}
                    className={cn(
                      'px-5 py-5 hover:bg-background-alt text-sm rounded-sm active:bg-accent active:text-primary-50',
                      currentPage === pgNumber && 'bg-accent text-primary-50'
                    )}
                  >
                    <div>{pgNumber}</div>
                  </button>
                </li>

                {pgNumber === 1 && showLeftDots ? (
                  <div>
                    <div className="px-5 py-5">...</div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <li className="px-5 py-5  hover:bg-background-alt">
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRightOutlineIcon
                className={'w-10 h-10 stroke-foreground'}
              />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
)
