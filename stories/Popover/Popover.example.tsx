import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover'

const PopoverDemo = props => {
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  )
}

export { PopoverDemo }
