const Storybook = ({ componentId }) => (
  <div className="flex-1">
    <iframe
      title="Excalibur Storybook Example"
      src={`https://deploy-preview-298--quantum-deploy-previews.netlify.app/iframe.html?viewMode=story&id=${componentId}`}
      width="100%"
      height="800px"
    ></iframe>
  </div>
)

export default Storybook
