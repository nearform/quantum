import type { Meta, StoryFn } from '@storybook/react-vite'

import { Label } from '@/components/Label'
import { NativeSelect, type NativeSelectProps } from '@/components/NativeSelect'

const meta = {
  title: 'Form/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success']
    },
    size: {
      control: 'select',
      options: ['sm', 'lg']
    },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' }
  }
} satisfies Meta<typeof NativeSelect>

export default meta

const Template: StoryFn<NativeSelectProps> = args => (
  <div className="flex w-64 flex-col gap-2">
    <Label htmlFor="native-select-fruit">Fruit</Label>
    <NativeSelect id="native-select-fruit" defaultValue="" {...args}>
      {/* A list box shows every option, so it has no placeholder */}
      {!args.multiple && (
        <option value="" disabled>
          Choose a fruit
        </option>
      )}
      <option value="apple">Apple</option>
      <option value="orange">Orange</option>
      <option value="pear">Pear</option>
    </NativeSelect>
  </div>
)

export const Default = Template.bind({})
Default.args = {}

export const Large = Template.bind({})
Large.args = { size: 'lg' }

export const Error = Template.bind({})
Error.args = { variant: 'error', 'aria-invalid': true }

export const Success = Template.bind({})
Success.args = { variant: 'success' }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const Multiple = Template.bind({})
Multiple.args = { multiple: true, defaultValue: [] }
