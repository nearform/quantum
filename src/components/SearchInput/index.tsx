import React from 'react'
import SearchOutline from '@/assets/build/search-outline.icon'
import X from '@/assets/build/x-outline.icon'
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
    'gap-[6px]',
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
    '[&>input]:text-foreground',
    '[&>input]:items-center',
    '[&>input]:px-1',
    '[&>input]:text-inherit',
    '[&>input:not(:valid)button]:text-transparent'
  ],
  ['[&>span]:text-foreground-muted', 'dark:[&>span]:text-foreground-muted-dark']
])

// If we wet the containing form to have no styling, we can focus on stying the search input directly. that's better.
//
//

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <form className={cn(searchVariants(), className)}>
        <span>
          <SearchOutline />
        </span>
        <input type="text" className="grow" ref={ref} {...props} />
        <button type="reset">
          <X className="text-inherit" />
        </button>
      </form>
    )
  }
)

export { SearchInput }
