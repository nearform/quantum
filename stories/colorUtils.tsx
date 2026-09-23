import { ColorPalette, ColorItem } from '@storybook/addon-docs/blocks'

type DarkMode = {
  DEFAULT?: string
  dark?: string
}
type ColorPaletteType = {
  [token: string]: string | DarkMode | undefined
}

export const ColorWrapper = ({
  colorPalette,
  darkMode
}: {
  colorPalette: ColorPaletteType
  darkMode: boolean
}) => {
  return (
    <ColorPalette>
      <ColorItem
        key={1}
        subtitle={``}
        title={'Light'}
        colors={remap({ mode: 'DEFAULT', colorPalette })}
      />
      {darkMode ? (
        <ColorItem
          key={2}
          subtitle={``}
          title={'Dark'}
          colors={remap({ mode: 'dark', colorPalette })}
        />
      ) : null}
    </ColorPalette>
  )
}

const remap = ({
  mode,
  colorPalette
}: {
  mode: keyof DarkMode
  colorPalette: ColorPaletteType
}) => {
  const r = Object.keys(colorPalette).reduce(
    (acc: Record<string, string>, token) => {
      const color = colorPalette[token]
      if (color) {
        if (typeof color === 'object') {
          const colorMode = color[`${mode}`]
          if (colorMode) {
            acc[token] = colorMode
          }
        } else if (mode && token === mode) {
          acc[mode] = color
        }
      }
      return acc
    },
    {}
  )
  return r
}
