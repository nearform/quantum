import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stepper, StepperItem, StepperNav } from '@/index'

const steps = [
  { id: 'one', title: 'This is step one' },
  { id: 'two', title: 'This is step two' },
  { id: 'three', title: 'This is step three' },
  { id: 'four', title: 'This is step four' },
  { id: 'five', title: 'This is step five' }
]

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered'
  },
  args: {
    currentStep: 0
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: steps.length - 1 }
    }
  },
  render: args => (
    <Stepper {...args} className="w-[880px]">
      {steps.map(step => (
        <StepperItem
          key={step.id}
          title={step.title}
          description="Short description"
        />
      ))}
    </Stepper>
  )
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Completed: Story = {
  args: {
    currentStep: 2
  }
}

const NavDemo = ({ indicator }: { indicator: 'dots' | 'counter' }) => {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <StepperNav
      currentStep={currentStep}
      totalSteps={indicator === 'dots' ? 5 : 2}
      onStepChange={setCurrentStep}
      indicator={indicator}
    />
  )
}

export const NavWithDots: Story = {
  render: () => <NavDemo indicator="dots" />
}

export const NavWithCounter: Story = {
  render: () => <NavDemo indicator="counter" />
}

const WizardDemo = () => {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <div className="flex w-[880px] flex-col gap-6">
      <Stepper currentStep={currentStep}>
        {steps.map(step => (
          <StepperItem
            key={step.id}
            title={step.title}
            description="Short description"
          />
        ))}
      </Stepper>
      <StepperNav
        currentStep={currentStep}
        totalSteps={steps.length}
        onStepChange={setCurrentStep}
      />
    </div>
  )
}

export const WithNav: Story = {
  render: () => <WizardDemo />
}

export const DarkMode: Story = {
  ...Default,
  name: 'Dark mode',
  globals: { theme: 'dark' }
}
