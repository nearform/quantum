import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import ClearButton from '@/assets/build/clear.icon' //why cant I export from index?
import User from '@/assets/build/user.icon'
import AngleDown from '@/assets/build/angle-down.icon'
import SearchOutline from '@/assets/build/search.icon'

const leftSideVariants = cva(['flex', 'items-center', 'h-5', 'w-5'])

const rightSideVariants = cva(['flex', 'self-center'])

const formVariants = cva(
  [
    'flex',
    'border',
    'border-[1px] rounded-lg',
    'overflow-hidden',
    'border-border-subtle',
    'p-3'
  ],
  {
    variants: {
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
  [
    'flex',
    'flex-grow',
    'items-center',
    'gap-6',
    'outline-none',
    'pl-[34px]',
    'bg-transparent'
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-subtle',
          'text-foreground-muted',
          'dark:border-subtle-dark',
          'dark:text-foreground-muted-dark'
        ],
        secondary: [],
        error: [],
        success: []
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
  variant: 'primary' | 'secondary' | 'error' | 'success'
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
  },
  right: {
    text: <ClearButton />,
    search: <ClearButton />
  }
}

const Input = ({
  type,
  className,
  formClassName,
  leftSideClassName,
  variant,
  leftSideChild,
  rightSideChild
}: InputProps) => {
  const leftSideComponent =
    leftSideChild ?? convertTypeToComponent.left[`${type}`]
  const rightSideComponent =
    rightSideChild ?? convertTypeToComponent.right[`${type}`]

  return (
    <form className={cn(formVariants(), formClassName)}>
      <div className={cn(leftSideVariants(), leftSideClassName)}>
        {leftSideComponent}
      </div>
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
      />
      <div className="input-right-side"></div>
      <button className={rightSideVariants()} type="reset">
        {rightSideComponent}
      </button>
    </form>
  )
}

export { Input, InputProps }
