import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectGroup,
  SelectLabel
} from '@/components/Select'

export const SelectDemo = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent side="top" className="overflow-visible">
        <SelectGroup>
          <SelectLabel>Irish</SelectLabel>
          <SelectItem value="ups">úps</SelectItem>
          <SelectItem value="me">mé</SelectItem>
          <SelectItem value="rinne">rinne arís é</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Mandarin</SelectLabel>
          <SelectItem value="light">哎呀</SelectItem>
          <SelectItem value="dark">我</SelectItem>
          <SelectItem value="1">又那么做了</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Russian</SelectLabel>
          <SelectItem value="23">упс</SelectItem>
          <SelectItem value="45">я</SelectItem>
          <SelectItem value="9">я</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
