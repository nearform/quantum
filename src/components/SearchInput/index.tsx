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
    '[&>input:not(:valid)button]:text-transparent'
  ],
  ['[&>span]:text-foreground-muted', 'dark:[&>span]:text-foreground-muted-dark']
])

const inputVariants = cva([
  [
    'flex',
    'w-[500px]',
    'focus:outline-none',
    'self-stretch',
    'text-foreground',
    'items-center',
    'border border-[1px]',
    'border-border-subtle',
    'rounded-lg',
    'dark:text-foreground-muted-dark',
    'bg-background-alt',
    'dark:bg-background-alt-dark',
    'focus:border-border-focus',
    'hover:border-border-hover',
    'focus:hover:border-border-focus',
    'p-3',
    'px-10',
    'peer',
    '[&~span]:text-foreground-muted',
    '[&~span]:absolute',
    '[&~span]:top-6',
    '[&~span]:left-5'
  ]
])

// If we wet the containing form to have no styling, we can focus on stying the search input directly. that's better.
// TRy and get those svgs in.
//

interface SearchInputProps extends React.HTMLProps<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <form className="flex">
        <input
          required
          type="text"
          className={cn(inputVariants(), 'peer')}
          ref={ref}
          {...props}
        />
        <span className="absolute top-6 left-5 group-">
          <SearchOutline />
        </span>
        <button type="reset" className="peer-invalid:hidden text-current">
          <X className="text-inherit absolute top-7 right-5" />
        </button>
      </form>
    )
  }
)

export { SearchInput }
