const quantumConfig = require('../tailwind.config.js')
const plugin = require('tailwindcss/plugin')

const quantumPlugin = plugin(() => {}, {
  theme: {
    ...quantumConfig.theme
  }
})

module.exports = quantumPlugin
