import { Label, type LabelProps } from '../Label'

type Props = Omit<LabelProps, 'children' | 'align'> &
  React.PropsWithChildren<{
    label: string
    position?: 'left' | 'right'
  }>

const ControlLabel: React.FC<Props> = ({
  label,
  position = 'right',
  children,
  ...labelProps
}) => {
  return (
    <div className="flex items-center space-x-2">
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
