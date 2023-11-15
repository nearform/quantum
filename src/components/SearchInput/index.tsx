import React from 'react'
import SearchOutline from '@/assets/build/search-outline.icon'
import ClearIcon from '@/assets/build/x-outline.icon'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const searchVariants = cva([
  [
    'flex',
    'border border-[1px]',
    'border-border-subtle',
    'rounded-lg',
    'overflow-hidden',
    'p-3',
    'focus-within:border-border-focus',
    'hover:border-border-hover',
    'focus-within:hover:border-border-focus',
    'bg-background-alt',
    'dark:text-foreground-muted-dark',
    'dark:border-border-subtle-dark',
    'dark:bg-background-alt-dark',
    'dark:hover:border-border-hover-dark',
    'dark:focus-within:border-border-focus-dark',
    'dark:focus-within:hover:border-border-focus-dark'
  ],
  [
    '[&>*]:bg-transparent',
    '[&>input:focus]:outline-none',
    '[&>input]:self-stretch',
    '[&>input]:items-center',
    '[&>input]:px-7',
    '[&>input]:flex',
    '[&>input]:flex-grow'
  ]
])

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <form className={cn(searchVariants(), className)}>
        <input required type="text" ref={ref} {...props} className="peer" />
        <span className="absolute top-6 left-5">
          <SearchOutline />
        </span>
        <button type="reset" className="peer-invalid:hidden text-current">
          <ClearIcon className="text-inherit absolute top-7 right-5" />
        </button>
      </form>
    )
  }
)

export { SearchInput }
