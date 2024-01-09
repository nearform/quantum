import quantumConfig from '../tailwind.config'
import plugin from 'tailwindcss/plugin'
import path from 'path'
import { Config } from 'tailwindcss'

export default plugin(
  ({ config }: { config: () => Config }) => {
    const twConfig = config()
    const quantumPkgLoc = path.join(__dirname, 'index.js')

    if (Array.isArray(twConfig.content)) {
      if (!twConfig.content.includes(quantumPkgLoc)) {
        twConfig.content.push(quantumPkgLoc)
      }
    } else {
      if (!twConfig.content.files.includes(quantumPkgLoc)) {
        twConfig.content.files.push(quantumPkgLoc)
      }
    }
  },
  {
    theme: {
      ...quantumConfig.theme
    }
  }
)
