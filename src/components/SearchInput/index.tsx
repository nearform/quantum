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
    'gap-[6px]',
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
    '[&>input]:flex',
    '[&>input]:flex-grow'
  ],
  ['[&>button]:ml-6']
])

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <form className={cn(searchVariants(), className)}>
        <span>
          <SearchOutline />
        </span>
        <input required type="text" ref={ref} {...props} className="peer" />
        <button type="reset" className="peer-invalid:invisible">
          <ClearIcon />
        </button>
      </form>
    )
  }
)

export { SearchInput, SearchInputProps }
