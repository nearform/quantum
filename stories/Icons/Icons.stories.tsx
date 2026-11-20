import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import * as assets from '@/assets'
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsSearch,
  IconButton,
  OpenSourceIcon,
  type IconType
} from '@/index'

const brandIcons = Object.entries(assets).filter(
  (entry): entry is [string, IconType] =>
    !entry[0].startsWith('Bs') && typeof entry[1] === 'function'
)

const SIZES = ['size-4', 'size-6', 'size-8', 'size-12'] as const

const meta = {
  title: 'Icons',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const BrandIcons: Story = {
  render: () => (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
      {brandIcons.map(([name, Icon]) => (
        <li
          key={name}
          data-brand-icon={name}
          className="flex flex-col items-center gap-3 rounded-lg border border-border p-6 text-center dark:border-border-dark"
        >
          <Icon aria-hidden className="size-10" />
          <code className="text-sm font-semibold">{name}</code>
          <code className="text-xs break-words text-foreground-muted dark:text-foreground-muted-dark">
            {`import { ${name} } from '@nearform/quantum'`}
          </code>
        </li>
      ))}
    </ul>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(brandIcons.map(([name]) => name)).toContain('OpenSourceIcon')
    expect(canvas.getAllByText('OpenSourceIcon').length).toBeGreaterThan(0)

    for (const card of canvasElement.querySelectorAll('[data-brand-icon]')) {
      const color = getComputedStyle(card).color
      const shapes = card.querySelectorAll(
        'svg :is(path, circle, ellipse, rect, polygon, polyline, line)'
      )

      expect(shapes.length).toBeGreaterThan(0)
      for (const shape of shapes) {
        expect(['none', color]).toContain(getComputedStyle(shape).fill)
      }
    }
  }
}

export const Sizing: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {SIZES.map(size => (
        <div key={size} className="flex items-center gap-4">
          <OpenSourceIcon aria-hidden className={size} />
          <BsSearch aria-hidden className={size} />
          <code className="text-sm">{size}</code>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <OpenSourceIcon aria-hidden className="h-6 w-10" />
        <BsSearch aria-hidden className="h-6 w-10" />
        <code className="text-sm">h-6 w-10</code>
      </div>
    </div>
  )
}

export const Colour: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <p className="flex items-center gap-2">
        <BsCheckCircleFill
          aria-hidden
          className="size-4 text-feedback-success dark:text-feedback-success-dark"
        />
        Changes saved
      </p>
      <p className="flex items-center gap-2 text-feedback-error dark:text-feedback-error-dark">
        <BsExclamationTriangleFill aria-hidden className="size-4" />
        Something went wrong
      </p>
      <p className="flex items-center gap-2 text-foreground-muted dark:text-foreground-muted-dark">
        <OpenSourceIcon aria-hidden className="size-4" />
        Open source
      </p>
    </div>
  )
}

export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center gap-2">
        <OpenSourceIcon
          role="img"
          aria-label="Open source"
          className="size-6"
        />
        <span>Meaningful: labelled with role and aria-label</span>
      </div>
      <p className="flex items-center gap-2">
        <BsCheckCircleFill aria-hidden className="size-4" />
        Decorative: hidden, the text says it all
      </p>
      <div className="flex items-center gap-2">
        <IconButton
          variant="tertiary"
          icon={<BsSearch />}
          label="Search articles"
        />
        <span>Icon-only button: use IconButton</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(
      canvas.getAllByRole('img', { name: 'Open source' }).length
    ).toBeGreaterThan(0)
    expect(
      canvas.getAllByRole('button', { name: 'Search articles' }).length
    ).toBeGreaterThan(0)
  }
}
