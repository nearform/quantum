import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/global.css'],
  dts: { entry: ['src/index.ts'] },
  clean: true,
  sourcemap: true
})
