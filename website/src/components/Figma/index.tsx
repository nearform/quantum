// const Figma = ({ id, node }) => (
//   <div className="flex-1">
//     <iframe
//       width="100%"
//       height="450"
//       src={`https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F${id}%2FQuantum-Documentation-site%3Ftype%3Ddesign%26node-id%3D${node}%253A12685%26mode%3Ddesign%26t%3DI0XGQt1cUezHt47h-1`}
//     />
//   </div>
// )

import React from 'react'

// export default Figma

const Figma = ({ id, node }) => {
  const iframeRef = React.useRef(null)
  console.log(id, node)

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentDocument) {
      const styleEl = iframe.contentDocument.createElement('style')
      // Your CSS as a string
      styleEl.textContent = '.svg-container{ display:none}'
      iframe.contentDocument.head.appendChild(styleEl)
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      allowFullScreen
      className="figma-iframe"
      title="Figma Design"
      src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FvIqNb3g23SIGRiYUUDf5yE%2FQuantum-Documentation-site%3Ftype%3Ddesign%26node-id%3D443%253A254946%26mode%3Ddesign%26t%3DZHUL9bYb4weQgluE-1"
    />
  )
}
export default Figma
