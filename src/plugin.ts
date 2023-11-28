const quantumConfig = require('../tailwind.config.js')
const plugin = require('tailwindcss/plugin')
const path = require('path')

const quantumPlugin = (node_modules_path?: string) => {
  return plugin(
    ({ config }: any) => {
      const twConfig = config()
      let quantumPkgLoc = './node_modules/@nearform/quantum/dist/index.js'
      if (node_modules_path) {
        quantumPkgLoc = path.join(
          node_modules_path,
          './node_modules/@nearform/quantum/dist/index.js'
        )
      }
      if (!twConfig.content.files.includes(quantumPkgLoc)) {
        twConfig.content.files.push(quantumPkgLoc)
      }
    },
    {
      theme: {
        ...quantumConfig.theme
      }
    }
  )
}

module.exports = quantumPlugin
