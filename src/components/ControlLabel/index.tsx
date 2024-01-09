import { Label, type LabelProps } from '../Label'

type Props = Omit<LabelProps, 'children'> &
  React.PropsWithChildren<{
    label: string
  }>

export const ControlLabel: React.FC<Props> = ({
  children,
  label,
  ...labelProps
}) => {
  return (
    <div className="flex items-center space-x-2">
      {children}
      <Label {...labelProps}>{label}</Label>
    </div>
  )
}
