import quantumConfig from '../tailwind.config'
import plugin from 'tailwindcss/plugin'
import path from 'path'
import { Config } from 'tailwindcss'

const quantumPlugin = plugin(
  ({ config }: { config: () => Config }) => {
    const twConfig = config()
    let quantumPkgLoc = path.join(__dirname, 'index.js')

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

module.exports = quantumPlugin
