import { Pagination } from '@/components/Pagination'
import { useState } from 'react'

export const PaginationDemo = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10)
  const [totalNumberOfFilteredItems, setTotalNumberOfFilteredItems] =
    useState(100)

  return (
    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      numberOfItemsPerPage={numberOfItemsPerPage}
      totalNumberOfFilteredItems={totalNumberOfFilteredItems}
    />
  )
}
