import * as React from 'react'

import { cn } from '@/lib/utils'

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  label?: React.ReactNode
  language?: string
}

const CodeBlock = React.forwardRef<HTMLElement, CodeBlockProps>(
  ({ className, label, language, children, ...props }, ref) => (
    <figure
      ref={ref}
      className={cn(
        'flex flex-col gap-2 text-foreground dark:text-foreground-dark',
        className
      )}
      {...props}
    >
      {label && (
        <figcaption className="text-xs font-medium leading-normal">
          {label}
        </figcaption>
      )}
      <pre
        tabIndex={0}
        className={cn(
          'overflow-auto rounded-sm p-3',
          'bg-background-subtle dark:bg-background-subtle-dark',
          'font-mono text-xs leading-normal',
          'focus-visible:outline-hidden focus-visible:shadow-brandGreen',
          'dark:focus-visible:shadow-brandGreen10'
        )}
      >
        <code
          className={language ? `language-${language}` : undefined}
          data-language={language}
        >
          {children}
        </code>
      </pre>
    </figure>
  )
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock, type CodeBlockProps }
