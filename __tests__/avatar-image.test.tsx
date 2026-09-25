/**
 * @jest-environment jsdom
 */
import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Avatar } from '../src/components/Avatar'

/**
 * The only test in the suite that mounts anything.
 *
 * Everywhere else `renderToStaticMarkup` is enough, and deliberately so — it
 * pins markup without pulling in a DOM. Avatar's fallback is the exception:
 * it hangs off the `<img>`'s `error` event, so a static render can only ever
 * observe the state the component starts in, never the transition that is the
 * whole point of the feature. Hence `jest-environment-jsdom`, scoped to this
 * file by the docblock above so the rest of the suite stays on `node`.
 *
 * `react-dom/client` and `act` directly rather than a testing library: three
 * tests do not justify a new testing idiom in a repo that has none.
 */

// React 18 warns on every `act` call without it, and the warning is the only
// thing that tells you the environment was set up wrong.
const actEnvironment = globalThis as unknown as {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

const mount = () => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)

  return {
    host,
    render: (element: React.ReactElement) => {
      act(() => {
        root.render(element)
      })
    },
    unmount: () => {
      act(() => {
        root.unmount()
      })
      host.remove()
    }
  }
}

/**
 * jsdom never fetches, so no image ever loads or fails on its own. Dispatching
 * the event the browser would dispatch is what reaches React's `onError`.
 */
const failImage = (host: HTMLElement) => {
  const image = host.querySelector('img')
  if (!image) {
    throw new Error('no <img> to fail')
  }
  act(() => {
    image.dispatchEvent(new Event('error'))
  })
}

const image = (host: HTMLElement) => host.querySelector('img')
const initials = (host: HTMLElement) => host.textContent

describe('Avatar image fallback', () => {
  it('shows the image over the initials until something goes wrong', () => {
    const { host, render, unmount } = mount()

    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />)

    expect(image(host)?.getAttribute('src')).toBe('/ada.jpg')
    // Underneath the whole time, which is what stops the avatar rendering
    // empty while the image is still in flight.
    expect(initials(host)).toBe('AL')

    unmount()
  })

  it('uncovers the fallback when the image fails to load', () => {
    const { host, render, unmount } = mount()

    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />)
    failImage(host)

    expect(image(host)).toBeNull()
    expect(initials(host)).toBe('AL')

    unmount()
  })

  it('names the fallback it uncovers', () => {
    const { host, render, unmount } = mount()

    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />)
    failImage(host)

    const root = host.firstElementChild
    expect(root?.getAttribute('role')).toBe('img')
    expect(root?.getAttribute('aria-label')).toBe('Ada Lovelace')

    unmount()
  })

  it('keeps the fallback when re-rendered with the same failed src', () => {
    const { host, render, unmount } = mount()

    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />)
    failImage(host)
    render(<Avatar name="Ada Lovelace" src="/ada.jpg" className="mx-2" />)

    expect(image(host)).toBeNull()

    unmount()
  })

  it('retries when the src changes after a failure', () => {
    const { host, render, unmount } = mount()

    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />)
    failImage(host)
    render(<Avatar name="Ada Lovelace" src="/ada-2.jpg" />)

    expect(image(host)?.getAttribute('src')).toBe('/ada-2.jpg')

    unmount()
  })

  it('falls back again when the retry fails too', () => {
    const { host, render, unmount } = mount()

    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />)
    failImage(host)
    render(<Avatar name="Ada Lovelace" src="/ada-2.jpg" />)
    failImage(host)

    expect(image(host)).toBeNull()
    expect(initials(host)).toBe('AL')

    unmount()
  })

  it('shows the icon rather than the broken image when there is no name', () => {
    const { host, render, unmount } = mount()

    render(<Avatar src="/ada.jpg" />)
    failImage(host)

    expect(image(host)).toBeNull()
    expect(host.querySelector('svg')).not.toBeNull()

    unmount()
  })
})
