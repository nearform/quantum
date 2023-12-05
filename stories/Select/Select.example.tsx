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

import { TriggerProps } from '@/components/Select'

interface DemoProps extends TriggerProps {
  example: string
}

export const SelectDemo = ({ variant, example }: DemoProps) => {
  if (example === 'small') {
    return (
      <Select>
        <SelectTrigger variant={variant}>
          <SelectValue placeholder="Small List" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Example</SelectLabel>
            <SelectItem value="Apples">Apples</SelectItem>
            <SelectItem value="Oranges">Oranges</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  } else if (example === 'large') {
    return (
      <Select>
        <SelectTrigger variant={variant} className="w-[180px]">
          <SelectValue placeholder="Choose" />
          {/* Something going wrong with placement of select value when it overflows */}
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
  } else if (example === 'item-aligned') {
    return (
      <Select>
        <SelectTrigger variant={variant} className="w-[180px]">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>

        <SelectContent
          position="item-aligned"
          side="top"
          className="overflow-visible"
        >
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
  return (
    <Select>
      <SelectTrigger variant={variant} className="w-[180px]">
        <SelectValue placeholder="Choose" />
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
