import React from 'react'
import SearchOutline from '@/assets/build/search-outline.icon'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { prefixer } from '@/lib/utils'

const WEBKIT_INPUT_CANCEL_SELECTOR = '[&>*::-webkit-search-cancel-button]'

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
  prefixer(WEBKIT_INPUT_CANCEL_SELECTOR, [
    'appearance-none',
    'bg-clip-content',
    'bg-x-outline',
    'h-3',
    'w-3',
    'ml-6',
    'dark:bg-x-outline-dark'
  ]),
  [
    '[&>*]:bg-transparent',
    '[&>input:focus]:outline-none',
    '[&>input]:self-stretch',
    '[&>input]:text-foreground',
    '[&>input]:items-center',
    '[&>input]:px-1',
    '[&>input]:text-inherit'
  ],
  ['[&>span]:text-foreground-muted', 'dark:[&>span]:text-foreground-muted-dark']
])

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'>
>(({ className, ...props }, ref) => {
  return (
    <div className={cn(searchVariants(), className)}>
      <span>
        <SearchOutline />
      </span>
      <input type="search" className="grow" ref={ref} {...props} />
    </div>
  )
})

export { SearchInput }
