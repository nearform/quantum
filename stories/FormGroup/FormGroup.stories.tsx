import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Checkbox,
  FieldDescription,
  FieldError,
  FormGroup,
  Label
} from '@/index'
import { SelectControl, TextControl } from './FormGroup.example'

const meta = {
  title: 'Form/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: 'inline-radio'
    },
    description: {
      control: 'text'
    },
    error: {
      control: 'text'
    },
    controlId: {
      control: false
    }
  }
} satisfies Meta<typeof FormGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: 'This is a hint'
  },
  render: props => (
    <FormGroup {...props} className="w-72">
      <Label>Label</Label>
      <TextControl />
      <FieldDescription />
      <FieldError />
    </FormGroup>
  )
}

/**
 * Vertical stacks the three parts; horizontal puts the label in a column of
 * its own and indents the message to line up with the control rather than
 * with the label.
 */
export const Orientation: Story = {
  args: {
    description: 'This is a hint'
  },
  render: props => (
    <div className="flex flex-col gap-8">
      <FormGroup {...props} orientation="vertical" className="w-72">
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
      </FormGroup>
      <FormGroup {...props} orientation="horizontal" className="w-96">
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
      </FormGroup>
    </div>
  )
}

/**
 * Any part can be left out. The rest still lines up.
 *
 * Dropping the `Label` drops the visible text, not the control's name -- a
 * field whose label lives somewhere else, such as a column header, takes an
 * `aria-label` instead. A placeholder is not a label.
 */
export const Parts: Story = {
  args: {},
  render: props => (
    <div className="flex flex-col gap-6">
      <FormGroup {...props} description="This is a hint" className="w-72">
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
      </FormGroup>
      <FormGroup {...props} description="This is a hint" className="w-72">
        <TextControl aria-label="Label" />
        <FieldDescription />
      </FormGroup>
      <FormGroup {...props} className="w-72">
        <Label>Label</Label>
        <TextControl />
      </FormGroup>
    </div>
  )
}

/**
 * `error` colours the message and marks the control `aria-invalid`. The
 * control's own error styling is separate, so a field can be flagged to
 * assistive technology without being repainted, and repainted without being
 * flagged.
 */
export const WithError: Story = {
  args: {
    error: 'This is an error'
  },
  render: props => (
    <FormGroup {...props} className="w-72">
      <Label>Label</Label>
      <TextControl variant="error" />
      <FieldError />
    </FormGroup>
  )
}

/**
 * The hint is replaced by the error, not pushed down by it. Both groups below
 * are written identically, down to the children; the second one only adds
 * `error`.
 */
export const HintThenError: Story = {
  args: {
    description: 'This is a hint',
    error: 'This is an error'
  },
  render: ({ error, ...props }) => (
    <div className="flex flex-col gap-6">
      <FormGroup {...props} className="w-72">
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
        <FieldError />
      </FormGroup>
      <FormGroup {...props} error={error} className="w-72">
        <Label>Label</Label>
        <TextControl variant="error" />
        <FieldDescription />
        <FieldError />
      </FormGroup>
    </div>
  )
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    description: 'This is a hint'
  },
  render: props => (
    <div className="flex flex-col gap-6">
      <FormGroup {...props} className="w-96">
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
      </FormGroup>
      <FormGroup
        {...props}
        error="This is an error"
        description={undefined}
        className="w-96"
      >
        <Label>Label</Label>
        <TextControl variant="error" />
        <FieldError />
      </FormGroup>
    </div>
  )
}

/** `disabled` and `required` are set once, on the group, and reach the control. */
export const DisabledAndRequired: Story = {
  args: {},
  render: props => (
    <div className="flex flex-col gap-6">
      <FormGroup
        {...props}
        required
        description="This is a hint"
        className="w-72"
      >
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
      </FormGroup>
      <FormGroup
        {...props}
        disabled
        description="This is a hint"
        className="w-72"
      >
        <Label>Label</Label>
        <TextControl />
        <FieldDescription />
      </FormGroup>
    </div>
  )
}

/**
 * The group does not care what the control is: it wires whichever child is
 * not a label or a message.
 */
export const AnyControl: Story = {
  args: {},
  render: props => (
    <div className="flex flex-col gap-6">
      <FormGroup {...props} description="This is a hint" className="w-72">
        <Label>Select</Label>
        <SelectControl />
        <FieldDescription />
      </FormGroup>
      <FormGroup {...props} error="Pick a date in the future" className="w-72">
        <Label>Date</Label>
        <input
          type="date"
          className="w-full rounded-lg border-2 border-feedback-error bg-red-50 p-3 text-feedback-error outline-hidden"
        />
        <FieldError />
      </FormGroup>
    </div>
  )
}

/** The arrangement from the issue: a checkbox, labelled and wired the same way. */
export const WithCheckbox: Story = {
  args: {
    orientation: 'horizontal',
    description: 'This is a hint'
  },
  render: props => (
    <FormGroup {...props}>
      <Label>Checkbox Label</Label>
      <Checkbox name="form-field-name" />
      <FieldDescription />
    </FormGroup>
  )
}
