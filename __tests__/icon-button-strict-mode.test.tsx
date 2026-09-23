/**
 * @jest-environment jsdom
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from '@jest/globals'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { IconButton } from '../src/components/IconButton'

/**
 * The second file in the suite that mounts anything, and for the same kind of
 * reason as `avatar-image.test.tsx`: what is under test cannot be observed by
 * a static render.
 *
 * `IconButton` warns during render when its label resolves empty, and
 * `StrictMode` invokes a component body twice in development to surface impure
 * renders. Both invocations reach that `console.error`, so the message goes
 * out twice for one button unless something collapses them.
 * `renderToStaticMarkup`, which the rest of the accessibility suite uses, does
 * no double-invoking at all and so can never see it.
 *
 * Hence `jest-environment-jsdom`, scoped to this file by the docblock above so
 * the rest of the suite stays on `node`.
 */

const mount = (element: React.ReactElement) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  act(() => {
    createRoot(container).render(<React.StrictMode>{element}</React.StrictMode>)
  })

  return container
}

const ourWarnings = (calls: unknown[][]) =>
  calls.filter(call => String(call[0]).includes('IconButton'))

describe('IconButton under StrictMode', () => {
  let warn: jest.Spied<typeof console.error>

  beforeEach(() => {
    warn = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    warn.mockRestore()
  })

  /**
   * The behaviour this file exists for. Without the module-level guard in the
   * component this is 2, which is what `useRef` also gives -- React rebuilds
   * the hook state for the second invocation, so a ref arrives fresh on both
   * passes and dedupes nothing.
   */
  it('warns once for a button whose label is empty, not once per invocation', () => {
    mount(<IconButton icon={<svg />} label="" />)

    expect(ourWarnings(warn.mock.calls)).toHaveLength(1)
  })

  it('stays quiet for a named button', () => {
    mount(<IconButton icon={<svg />} label="Delete article" />)

    expect(ourWarnings(warn.mock.calls)).toHaveLength(0)
  })

  /**
   * The guard is cleared on a microtask rather than held for the session, so
   * a later render warns again. A warning that fires once and then goes quiet
   * for good cannot be told apart from one that has been fixed.
   */
  it('warns again on a later pass', async () => {
    mount(<IconButton icon={<svg />} label="" />)
    expect(ourWarnings(warn.mock.calls)).toHaveLength(1)

    await Promise.resolve()
    mount(<IconButton icon={<svg />} label="" />)

    expect(ourWarnings(warn.mock.calls)).toHaveLength(2)
  })

  /**
   * The name still reaches the element. The guard is about how often the
   * message is printed and must not touch what is rendered.
   */
  it('renders the name it was given', () => {
    const container = mount(
      <IconButton icon={<svg />} label="Delete article" />
    )

    expect(container.querySelector('button')?.getAttribute('aria-label')).toBe(
      'Delete article'
    )
  })
})
