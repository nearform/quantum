// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Api } = require('figma-api')

const FIGMA_FILE = 'vIqNb3g23SIGRiYUUDf5yE'
const FIGMA_TOKEN = 'figd_1AV8txYv-NZvCFV-5h0PwkDLxuTUi4HNfFPzGHp5'

async function getFigmaImgURL(inputValue) {
  try {
    const api = new Api({
      personalAccessToken: FIGMA_TOKEN
    })

    const nodeId = inputValue.replace('-', ':')
    const result = await api.getImage(FIGMA_FILE, {
      format: 'jpg',
      scale: 1,
      ids: [nodeId]
    })
    return result.images[nodeId] // Returns the URL of the exported image
  } catch (error) {
    console.error('Error exporting image:', error)
  }
}

const inputValue = process.argv[2]

getFigmaImgURL(inputValue).then(console.log)
