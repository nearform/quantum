import { Checkbox } from '@/components/Checkbox'
import { Label } from '@/components/Label'
import { LabelProps } from '@radix-ui/react-label'
interface LabelDemoProps extends LabelProps {
  labelText: string
}
const LabelDemo = (props: LabelDemoProps) => {
  return (
    <>
      <div className="space-x-2">
        <Label htmlFor={'checkbox'}>{props.labelText}</Label>
        <Checkbox id="checkbox" />
      </div>
    </>
  )
}

export { LabelDemo }
