import React, { useState, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

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
        <ul className="pagination justify-between items-center flex">
          <li className="page-item">
            <button
              className={cn(
                'page-link flex font-semibold leading-5 p-2 md:p-3',
                (currentPage === 1 || totalPages === 0) && 'text-grey-400'
              )}
              onClick={goToPrevPage}
              disabled={currentPage === 1 || totalPages === 0}
            >
              {/* <ArrowLeft className="w-5 h-5" /> */}
              <span className="sr-only lg:not-sr-only lg:ml-1">Previous</span>
            </button>
          </li>

          <div className="flex justify-around gap-x-2 sm:gap-x-4 md:gap-x-8">
            {pageNumbers.map(pgNumber => (
              <React.Fragment key={pgNumber}>
                {pgNumber === totalPages && showRightDots ? (
                  <div className="flex p-2 md:p-3 justify-center items-center flex-shrink-0 self-stretch">
                    <div className="font-semibold leading-5">...</div>
                  </div>
                ) : null}

                <li
                  className={cn(
                    'page-item',
                    currentPage === pgNumber && 'active'
                  )}
                >
                  <button
                    onClick={() => setCurrentPage(pgNumber)}
                    className="page-link"
                  >
                    <div
                      className={`flex p-2 md:p-3 justify-center items-center flex-shrink-0 self-stretch rounded-lg mt-4 ${
                        currentPage === pgNumber ? 'bg-background' : ''
                      }`}
                    >
                      <div className="font-semibold leading-5 ">{pgNumber}</div>
                    </div>
                  </button>
                </li>

                {pgNumber === 1 && showLeftDots ? (
                  <div className="flex p-2 md:p-3 justify-center items-center flex-shrink-0 self-stretch">
                    <div className="font-semibold leading-5">...</div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <li className="page-item">
            <button
              className={cn(
                'page-link flex font-semibold leading-5 p-2 md:p-3',
                (currentPage === totalPages || totalPages === 0) &&
                  'text-grey-400'
              )}
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span className="sr-only lg:not-sr-only lg:mr-1">Next</span>
              {/* <ArrowRight className="w-5 h-5" /> */}
            </button>
          </li>
        </ul>
      </nav>
    )
  }
)
