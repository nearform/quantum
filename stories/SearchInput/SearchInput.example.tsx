import { useState, useRef } from 'react'
import { SearchInput } from '@/index'

type SearchInputDemoProps = {
  variant: 'default' | 'example'
}

export const SearchInputDemo = ({ variant }: SearchInputDemoProps) => {
  if (variant === 'default') {
    return <SearchInput />
  }
  const [value, setValue] = useState('')
  const focused = useRef<HTMLInputElement>(null)
  const dropdownList = [
    'About',
    'Base',
    'Blog',
    'Contact',
    'Custom',
    'Support',
    'Tools'
  ]

  const clearText = () => {
    setValue('')
    if (focused.current) {
      focused.current.focus()
    }
  }

  const dropdownTags = dropdownList.map(item => {
    if (!value || value.length === 0) {
      return (
        <a
          key={item}
          onClick={() => {
            setValue(item)
          }}
          href={`#${item.toLowerCase()}`}
        >
          {item}
        </a>
      )
    }
    const valueRegex = new RegExp(`${value}`, 'i')
    if (valueRegex.test(item)) {
      return (
        <a key={item} href={`#${item.toLowerCase()}`}>
          {item}
        </a>
      )
    }
  })
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex flex-col space-y-1">
      <SearchInput
        value={value}
        buttonOnClick={clearText}
        onChange={onValueChange}
        className="peer"
        ref={focused}
      />

      <div className="z-2 bg-background-alt p-1 border border-border [&>a:hover]:bg-background-subtle hidden peer-focus-within:flex peer-focus-within:flex-col hover:flex hover:flex-col">
        {dropdownTags}
      </div>
    </div>
  )
}
