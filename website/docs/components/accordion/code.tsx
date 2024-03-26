import { useState } from 'react'
import { Pages } from '../../../src/components/enums'
import componentJSON from '../../../componentsJSON.json'
import { Button } from '@nearform/quantum'

/*
    this line needs to be fixed either. 
    1. Import the component directly from the story and get it working
     or use an iframe pointing at the live url
     (this will require a double deployment for new components
      as the url won't exist on the first deployment )
      //import %STORYBOOK%stories from '../../../../stories/%STORYBOOK%/Docs.mdx'
*/

interface ComponentDetails {
  name: string
  node_id: string
  figma_url: string
}

const DocusaurusComponent = () => {
  const [selected, setSelected] = useState(Pages.overview)
  const components: ComponentDetails[] = componentJSON
  const componentDescription = components.find(
    comp => comp.name === 'accordion'
  )

  return (
    <>
      <div>
        <Button
          disabled={selected == Pages.overview}
          onClick={() => setSelected(Pages.overview)}
        >
          Overview
        </Button>
        <Button
          disabled={selected == Pages.react}
          onClick={() => setSelected(Pages.react)}
        >
          React
        </Button>
      </div>
      <div>
        {selected === Pages.overview ? (
          <img src={componentDescription.figma_url} />
        ) : (
          <div>{/* <ButtonStory /> */}</div>
        )}
      </div>
    </>
  )
}

export default DocusaurusComponent
