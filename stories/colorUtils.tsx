import { ColorPalette, ColorItem } from '@storybook/blocks'

type DarkMode = {
  DEFAULT?: string
  dark?: string
}

type ColorPaletteType = {
  DEFAULT: string
  dark: string
  focus?: DarkMode
  hover?: DarkMode
  alt?: DarkMode
  subtle?: DarkMode
  disabled?: DarkMode
}

export const ColorWrapper = ({
  colorPalette
}: {
  colorPalette: ColorPaletteType
}) => {
  return (
    <ColorPalette>
      <ColorItem
        key={'-2'}
        title={`DEFAULT`}
        subtitle={``}
        colors={{
          DEFAULT: colorPalette.DEFAULT,
          dark: colorPalette.dark
        }}
      />
      {Object.keys(colorPalette).map((token: string, index: number) => {
        const color = colorPalette[token as keyof typeof colorPalette]
        if (typeof color === 'object' && token !== 'border') {
          return (
            <ColorItem
              key={index}
              subtitle={``}
              title={`${token}`}
              colors={color}
            />
          )
        }
      })}
    </ColorPalette>
  )
}
