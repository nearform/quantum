import { useRef } from 'react'
import type { StoryFn } from '@storybook/react'
import { Textarea } from '@/components/Textarea'
import type { TextareaProps } from '@/components/Textarea'

export default {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'error', 'success', 'disabled']
    },
    className: {
      control: 'text',
      description: 'Alter the className to change the style'
    }
  }
}

const Template: StoryFn<TextareaProps> = args => {
  const ref = useRef<HTMLTextAreaElement>(null)
  return <Textarea ref={ref} {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  id: 'sample',
  variant: 'primary',
  placeholder: 'Type something...',
  rows: 6,
  labelText: 'Your message',
  helpText: 'Please enter your message here.'
}

export const Error = Template.bind({})
Error.args = {
  id: 'sample',
  variant: 'error',
  placeholder: 'Error state',
  rows: 6,
  labelText: 'Your message',
  helpText: 'Please enter your message here.'
}

export const Success = Template.bind({})
Success.args = {
  id: 'sample',
  variant: 'success',
  placeholder: 'Success state',
  rows: 6,
  labelText: 'Your message',
  helpText: 'Please enter your message here.'
}

export const Disabled = Template.bind({})
Disabled.args = {
  id: 'sample',
  variant: 'disabled',
  placeholder: 'Disabled state',
  rows: 6,
  labelText: 'Your message',
  helpText: 'Please enter your message here.'
}
