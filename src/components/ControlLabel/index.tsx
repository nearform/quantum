import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { Label, type LabelProps } from '../Label'

const verticalAlignVariants = cva('', {
  variants: {
    varticalAlign: {
      top: 'items-start',
      middle: 'items-center',
      bottom: 'items-end'
    }
  },
  defaultVariants: {
    varticalAlign: 'top'
  }
})

type Props = Omit<LabelProps, 'children' | 'align'> &
  VariantProps<typeof verticalAlignVariants> &
  React.PropsWithChildren<{
    label: string
    position?: 'left' | 'right'
    varticalAlign?: 'top' | 'middle' | 'bottom'
  }>

const ControlLabel: React.FC<Props> = ({
  label,
  position = 'right',
  varticalAlign,
  children,
  htmlFor,
  ...labelProps
}) => {
  const generatedId = React.useId()
  const onlyChild = React.isValidElement<{ id?: string }>(children)
    ? children
    : null
  const childId = onlyChild?.props.id
  const controlId = htmlFor ?? childId ?? (onlyChild ? generatedId : undefined)
  const control =
    onlyChild && !childId && controlId
      ? React.cloneElement(onlyChild, { id: controlId })
      : children

  const labelElement = (align: 'left' | 'right') => (
    <Label {...labelProps} htmlFor={controlId} align={align}>
      {label}
    </Label>
  )

  return (
    <div
      className={cn(
        verticalAlignVariants({
          varticalAlign
        }),
        'flex space-x-2'
      )}
    >
      {position === 'left' && labelElement('right')}
      {control}
      {position === 'right' && labelElement('left')}
    </div>
  )
}

export { ControlLabel }
