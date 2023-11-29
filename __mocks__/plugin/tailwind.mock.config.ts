//used for relative file test
import qPlugin from '../../src/tailwind-plugin'
export default {
  content: { relative: true, files: ['./content.js'] },
  plugins: [qPlugin]
}
