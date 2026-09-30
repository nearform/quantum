/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalOverlay,
  ModalPortal,
  ModalTitle
} from '../src/components/Modal'
import { Pagination } from '../src/components/Pagination'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '../src/components/Toast'
import type { ToastVariant } from '../src/components/Toast'

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

let root: Root | undefined
let container: HTMLDivElement | undefined

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  document.body.innerHTML = ''
})

const mount = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
}

const classesOf = (selector: string) => {
  const element = document.body.querySelector(selector)
  if (!element) throw new Error(`no ${selector} in ${document.body.innerHTML}`)
  return (element.getAttribute('class') ?? '').split(/\s+/)
}

const COLOUR =
  /^(bg|text|border)-(background|foreground|border|feedback|accent|primary|secondary|grey|red|green|yellow|blue|orange)/

const splitVariants = (name: string) => {
  const at = name.lastIndexOf(':') + 1
  return { variants: name.slice(0, at), utility: name.slice(at) }
}

const lightColourClasses = (classNames: string[]) =>
  classNames.filter(name => {
    const { variants, utility } = splitVariants(name)
    return !variants.includes('dark:') && COLOUR.test(utility)
  })

const hasDarkCounterpart = (classNames: string[], name: string) => {
  const { variants, utility } = splitVariants(name)
  const property = utility.match(COLOUR)![1]
  return classNames.some(other => {
    const candidate = splitVariants(other)
    return (
      candidate.variants === `dark:${variants}` &&
      candidate.utility.startsWith(`${property}-`)
    )
  })
}

const expectEveryColourPaired = (classNames: string[]) => {
  const unpaired = lightColourClasses(classNames).filter(
    name => !hasDarkCounterpart(classNames, name)
  )
  expect(unpaired).toEqual([])
}

describe('Toast in dark mode', () => {
  const variants: ToastVariant[] = ['success', 'error', 'warning', 'info']

  const renderToast = (variant: ToastVariant) =>
    mount(
      <ToastProvider>
        <Toast open variant={variant}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes are live</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

  it.each(variants)('pairs every colour on the %s toast', variant => {
    renderToast(variant)

    expectEveryColourPaired(classesOf('li[data-state="open"]'))
  })

  it.each(variants)('pairs the %s icon colour', variant => {
    renderToast(variant)

    expectEveryColourPaired(classesOf('li > span[aria-hidden="true"]'))
  })

  it('pairs the description colour', () => {
    renderToast('info')

    expectEveryColourPaired(classesOf('li > div:nth-of-type(2)'))
  })

  it('pairs the close button hover surface', () => {
    renderToast('info')

    expectEveryColourPaired(classesOf('button[aria-label="Close"]'))
  })
})

describe('Pagination in dark mode', () => {
  const renderPagination = (currentPage: number) =>
    mount(
      <Pagination
        currentPage={currentPage}
        setCurrentPage={() => {}}
        numberOfItemsPerPage={10}
        totalNumberOfFilteredItems={200}
      />
    )

  it('pairs the colour of an unselected page number', () => {
    renderPagination(1)

    expectEveryColourPaired(classesOf('button[aria-label="Go to page 2"]'))
  })

  it('pairs the colour of the ellipsis between page numbers', () => {
    renderPagination(10)

    expectEveryColourPaired(classesOf('li[aria-hidden="true"]'))
  })
})

describe('Modal in dark mode', () => {
  const renderModal = () =>
    mount(
      <Modal open>
        <ModalPortal>
          <ModalOverlay />
          <ModalContent>
            <ModalTitle>Title</ModalTitle>
            <ModalDescription>Body</ModalDescription>
          </ModalContent>
        </ModalPortal>
      </Modal>
    )

  it('darkens the overlay rather than washing the page out', () => {
    renderModal()

    expectEveryColourPaired(classesOf('[data-state="open"].fixed.inset-0'))
  })

  it('pairs the description colour', () => {
    renderModal()

    expectEveryColourPaired(classesOf('[role="dialog"] p'))
  })
})
