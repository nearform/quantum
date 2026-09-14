import * as React from 'react'
import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs/blocks'
import { useDarkMode } from 'storybook-dark-mode'
import theme, { darkTheme } from './theme'

export const DarkModeDocsContainer = (
  props: React.PropsWithChildren<DocsContainerProps>
) => {
  const isDark = useDarkMode()

  return (
    <DocsContainer {...props} theme={isDark ? darkTheme : theme}>
      {props.children}
    </DocsContainer>
  )
}
