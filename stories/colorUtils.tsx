import { ColorPalette, ColorItem } from '@storybook/blocks'

type DarkMode = {
  DEFAULT?: string
  dark?: string
}
type ColorPaletteType = {
  DEFAULT?: string
  dark?: string
  focus?: DarkMode
  hover?: DarkMode
  alt?: DarkMode
  subtle?: DarkMode
  disabled?: DarkMode
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
  const r = Object.keys(colorPalette).reduce((acc: any, token) => {
    const color = colorPalette[token as keyof typeof colorPalette]
    if (typeof color === 'object') {
      acc[token as keyof ColorPaletteType] = color[`${mode}`]
    } else if (token === mode) {
      acc[mode] = color
    }
    return acc
  }, {})
  return r
}
