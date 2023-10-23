import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx', 'src/global.css'],
  dts: true,
  clean: true,
  sourcemap: true
})
