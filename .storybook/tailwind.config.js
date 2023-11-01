const config = require('../tailwind.config')

config.content.push('./stories/**/*.{ts, mdx}', './stories/**/.tsx')

module.exports = config
