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
  ...labelProps
}) => {
  return (
    <div
      className={cn(
        verticalAlignVariants({
          varticalAlign
        }),
        'flex space-x-2'
      )}
    >
      {position === 'left' && (
        <Label {...labelProps} align="right">
          {label}
        </Label>
      )}
      {children}
      {position === 'right' && (
        <Label {...labelProps} align="left">
          {label}
        </Label>
      )}
    </div>
  )
}

export { ControlLabel }
