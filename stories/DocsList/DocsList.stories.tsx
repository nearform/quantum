import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import {
  DocsList,
  DocsListGroup,
  DocsListGroupContent,
  DocsListGroupTrigger,
  DocsListItem,
  DocsListItems,
  DocsListLink
} from '@/index'

type Entry = string | { label: string; children: string[] }

const entries: Entry[] = [
  'Welcome',
  { label: 'Checks', children: ['Overview', 'Exemptions', 'Invoice'] },
  'New Checks',
  {
    label: 'Architecture',
    children: ['Layout', 'Layers', 'Database', 'Core', 'Backend', 'Linter']
  },
  {
    label: 'Setup',
    children: [
      'Database',
      'Migrations',
      'Database Tests',
      'Loading Sample Data',
      'Backend',
      'API Server'
    ]
  }
]

interface ExampleProps {
  active?: string
  defaultOpen?: boolean
}

function Example({ active, defaultOpen }: ExampleProps) {
  return (
    <DocsList aria-label="Documentation" className="w-56 rounded-lg p-4">
      <DocsListItems>
        {entries.map(entry =>
          typeof entry === 'string' ? (
            <DocsListItem key={entry}>
              <DocsListLink href="#" active={active === entry}>
                {entry}
              </DocsListLink>
            </DocsListItem>
          ) : (
            <DocsListGroup key={entry.label} defaultOpen={defaultOpen}>
              <DocsListGroupTrigger>{entry.label}</DocsListGroupTrigger>
              <DocsListGroupContent>
                {entry.children.map(child => {
                  const id = `${entry.label}/${child}`
                  return (
                    <DocsListItem key={id}>
                      <DocsListLink href="#" active={active === id}>
                        {child}
                      </DocsListLink>
                    </DocsListItem>
                  )
                })}
              </DocsListGroupContent>
            </DocsListGroup>
          )
        )}
      </DocsListItems>
    </DocsList>
  )
}

const meta = {
  title: 'Components/DocsList',
  component: DocsList,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof DocsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Example />
}

export const WithActiveLink: Story = {
  render: () => <Example active="Checks/Exemptions" />
}

export const Collapsed: Story = {
  render: () => <Example defaultOpen={false} />
}

function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-start gap-4">
      <button
        type="button"
        className="text-sm underline dark:text-foreground-dark"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Collapse' : 'Expand'} Checks from outside
      </button>
      <DocsList aria-label="Documentation" className="w-56 rounded-lg p-4">
        <DocsListItems>
          <DocsListGroup open={open} onOpenChange={setOpen}>
            <DocsListGroupTrigger>Checks</DocsListGroupTrigger>
            <DocsListGroupContent>
              {['Overview', 'Exemptions', 'Invoice'].map(child => (
                <DocsListItem key={child}>
                  <DocsListLink href="#">{child}</DocsListLink>
                </DocsListItem>
              ))}
            </DocsListGroupContent>
          </DocsListGroup>
        </DocsListItems>
      </DocsList>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledExample />
}
