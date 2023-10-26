const config = require('../tailwind.config')

config.content.push('./stories/**/*.tsx', './.storybook/**/*.{js,jsx,ts,tsx}')

module.exports = config
