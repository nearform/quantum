import { useEffect, useState } from "react"
import * as Figma from 'figma-api'
import { GetFileResult } from "figma-api/lib/api-types"

import {FIGMA_TOKEN,FILE_ID,IMG_ID} from '../constants'


interface FigmaDetails{
    document: Figma.Node<keyof Figma.NodeTypes>,
    components: { [nodeId: string]: Figma.Component; },
    schemaVersion: number,
    styles: { [styleName: string]: Figma.Style }
}

const FigmaApi = () => {
    const [api, setApi] = useState<Figma.Api | null>(null)
    const [file, setFile] = useState<GetFileResult | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [details, setDetails] = useState<FigmaDetails |null>(null)

    useEffect(() => {


        //set api
        const _api = new Figma.Api({ personalAccessToken: FIGMA_TOKEN });
        setApi(_api)
        
        //set file
        _api.getFile(FILE_ID).then(_file => {
            setFile(_file)
            //set image and canvas
            _api.getImage(FILE_ID, {
                ids: IMG_ID, 
                format: 'jpg',
                scale: 1
            }).then(response => {
                console.log(response)
                setImage(response.images[IMG_ID[0]])

            }).catch(err => console.error('Error getting image:', err));

            _api.getFileNodes(FILE_ID, [IMG_ID]).then(response=>{
                setDetails(response.nodes[IMG_ID])
            })

        }).catch(err => console.error('Error getting file:', err));

    }, []);



    return({
        api : api,
        isLogged: api !== null,
        file: file,
        hasFile: file !== null,
        image: image,
        hasImage: image !== null,
        hasDetails: details !== null,
        details: details
    })
}

export default FigmaApi