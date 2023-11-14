import { DatePicker, DatePickerProps } from '@/components/DatePicker'

interface DatePickerDemoProps extends DatePickerProps {
  labelText: string
}
const DatePickerDemo = (props: DatePickerDemoProps) => {
  return (
    <DatePicker className={props.className} size={props.size} />
  )
}

export { DatePickerDemo }
