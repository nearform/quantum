import { Checkbox } from '@/components/Checkbox'
import { Label, LabelProps } from '@/components/Label'

interface LabelDemoProps extends LabelProps {
  labelText: string
}
const LabelDemo = (props: LabelDemoProps) => {
  return (
    <>
      <div className="space-x-2">
        <Label htmlFor={'checkbox'} className="dark:">
          {props.labelText}
        </Label>
        <Checkbox id="checkbox" />
      </div>
    </>
  )
}

export { LabelDemo }
