import { Label, LabelProps } from '@/components/Label'

interface LabelDemoProps extends LabelProps {
  labelText: string
}
const LabelDemo = (props: LabelDemoProps) => {
  return (
    <Label className={props.className} size={props.size}>
      {props.labelText}
    </Label>
  )
}

export { LabelDemo }
