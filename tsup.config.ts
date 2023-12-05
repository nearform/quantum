import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/global.css',
    'src/colors/index.ts',
    'src/tailwind-plugin.ts'
  ],
  dts: { entry: ['src/index.ts'] },
  clean: true,
  sourcemap: true
})
