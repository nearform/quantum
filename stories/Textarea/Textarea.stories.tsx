import React, { useRef } from 'react'
import { Textarea } from '@/components/Textarea'

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'error', 'success']
    },
    onClear: { action: 'cleared' }
  }
}

import type { StoryFn } from '@storybook/react'
import type { TextareaProps } from '@/components/Textarea'

const Template: StoryFn<TextareaProps> = args => {
  const ref = useRef<HTMLTextAreaElement>(null)
  return <Textarea ref={ref} {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  placeholder: 'Type something...',
  onClear: () => {},
  rows: 4
}

export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  placeholder: 'Error state',
  onClear: () => {},
  rows: 4
}

export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  placeholder: 'Success state',
  onClear: () => {},
  rows: 4
}
