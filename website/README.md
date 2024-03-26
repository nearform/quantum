# Quantum Frontend

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### PRE-REQUISITS
This project generates a component using scripts.
To ensure you can run the project and scripts please install the following scripts: 

install all dependencies (Storybook, Figma-API and Docusaurus)
```
$ npm i
```

install jq to allow scripts to run 
```
 $ brew install jq
 
```

make sure your component details exist in the following figma link: 
```
https://www.figma.com/file/vIqNb3g23SIGRiYUUDf5yE/Quantum-Documentation-site
```


make sure you create your component story including a Docx file



### Retrieving Figma component
from the url 
```
https://www.figma.com/file/vIqNb3g23SIGRiYUUDf5yE/Quantum-Documentation-site
```

1. Click Content page
2. Find component requested e.g button 
3. Click the component.
4. Ensure the border surrounds the whole column of the document. 
    - an easy way to see it is if the left nav bar is on the highest level "Speficification". 
    - this is to ensure that the node_id for the component is the whole speficiation for the component in question and not one of the subdirectories
5. on the top right corner of the page click the share button 
6. on the popup; select Copy Link

### Local Development
There are 3 parts to the local development of this site: 
 
to run the project use the script

#### 1. Add component
use the appropriate script for Adding a specific component or a component group
1. for component
```
npm run add-component "component_name_without_spaces"
```

2. for component-group 
```
npm run add-component-group "component_name_without_spaces"
```

Requirements: 
- component name (this is the component name with spaces)
- position (where the component will appear on the left navigation) [to be investigated further]
- storybook component Name. (the folder name for the storybook component)
- figma url (copied from the Retrieving Figma Component above)

The script can take some time. 


#### 2. Update components figma screenshots
run the script 
 ```
npm run update-screenshoots
```

This will take some time.

#### 3. Update styles
use the components in the following folders to update the styles: 
- /src/components
- /src/css

for the left navigation menu use the following
 - sidebar.ts

 and the documentation avaialable here: https://docusaurus.io/docs/sidebar



### Deployment 

TBD