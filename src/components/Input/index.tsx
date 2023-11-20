import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import ClearButton from '@/assets/build/clear.icon' //why cant I export from index?
import User from '@/assets/build/user.icon'
import SearchOutline from '@/assets/build/search.icon'

const leftSideVariants = cva(['flex', 'items-center', 'text-inherit'])

const rightSideVariants = cva(['flex', 'self-center text-inherit'])

const formVariants = cva(
  [
    'flex',
    'border',
    'border-[2px] rounded-lg',
    'overflow-hidden',
    'p-3',
    'items-center',
    'gap-[6px]',
    'disabled:border-0',
    'disabled:bg-background-alt',
    'disabled:hover:border-0',
    'disabled:hover:focus-within:border-0',
    'disabled:focus-within:border-0'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-subtle',
          'dark:border-border-subtle-dark',
          'bg-background-alt',
          'dark:bg-background-alt-dark',
          'hover:border-border-hover',
          'hover:focus-within:border-border-focus',
          'dark:hover:focus-within:border-border-focus-dark',
          'focus-within:shadow-[0_0_0_4px_rgba(118,169,250,1)]',
          'text-foreground-muted',
          'dark:text-foreground-muted-dark'
        ],
        error: [
          'border-feedback-red',
          'text-feedback-red',
          'bg-red-50',
          'hover:border-red-700',
          'focus-within:shadow-[0_0_0_4px_rgba(249,128,128,1)]'
        ],
        success: [
          'border-feedback-green',
          'text-feedback-green',
          'bg-green-50',
          'disabled:bg-red-500',
          'hover:border-green-700',
          'focus-within:shadow-[0_0_0_4px_rgba(49,196,141,1)]'
        ]
      },
      type: {
        text: [],
        date: [],
        search: []
      }
    },
    defaultVariants: {
      type: 'text'
    }
  }
)

const inputVariants = cva(
  ['flex', 'flex-grow', 'items-center', 'outline-none', 'bg-transparent'],
  {
    variants: {
      variant: {
        primary: ['text-foreground', 'dark:text-foreground-dark'],
        error: ['text-feedback-red'],
        success: ['text-green-700']
      },
      type: {
        date: [],
        search: []
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  variant: 'primary' | 'error' | 'success'
  type: 'text' | 'search'
  formClassName?: string
  leftSideClassName?: string
  leftSideChild?: React.ReactNode
  rightSideChild?: React.ReactNode
}

const convertTypeToComponent = {
  left: {
    text: <User />,
    search: <SearchOutline />
  }
}

const Input = ({
  type,
  className,
  formClassName,
  leftSideClassName,
  variant,
  leftSideChild,
  rightSideChild,
  ...props
}: InputProps) => {
  const leftSideComponent =
    leftSideChild ?? convertTypeToComponent.left[`${type}`]
  const rightSideComponent = rightSideChild ?? <ClearButton />

  return (
    <form className={cn(formVariants({ variant }), formClassName)}>
      <div className={cn(leftSideVariants(), leftSideClassName)}>
        {leftSideComponent}
      </div>
      <input
        type="text"
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
      <div className="input-right-side"></div>
      <button className={rightSideVariants()} type="reset">
        {rightSideComponent}
      </button>
    </form>
  )
}

export { Input, InputProps }
;('use client')
