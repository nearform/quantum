import React,{useState} from 'react';
import FigmaApi from './figma/api';
const Splitter: React.FC = () => {

    const [display,setDisplay] = useState(0)
    const [document, showDocument] = useState(false)
    const [components, showComponents] = useState(false)
    const [version, showVersion] = useState(false)
    const [styles, showStyles] = useState(false)


    const api = FigmaApi()

    return(
        <>
    
            <div>
                <input type="button" disabled={!api.hasImage} onClick={()=> setDisplay(0)} value="image" />
                <input type="button" disabled={!api.hasDetails} onClick={()=> setDisplay(1)} value="Details" />
            </div>
            {
            !api.hasFile?
                <p>waiting for file to load....</p>
            :display === 0?
                <div>
                    <img src={api.image? api.image : ""} />
                </div>
             :display === 1?
             <div>
                <table>
                    <tbody>
                        <tr>
                            <th>document</th>
                            <td><input type="button" value="show" onClick={()=> showDocument(!document)}/></td>
                            <td>{document? JSON.stringify(api.details?.document):""}</td>
                        </tr>
                        <tr>
                            <th>components</th>
                            <td><input type="button" value="show" onClick={()=> showComponents(!components)}/></td>
                            <td>{components?JSON.stringify(api.details?.components): ""}</td>
                        </tr>
                        <tr>
                            <th>schemaVersion</th>
                            <td><input type="button" value="show" onClick={()=> showVersion(!version)}/></td>
                            <td>{version? api.details?.schemaVersion: ""}</td>
                        </tr>
                        <tr>
                            <th>styles</th>
                            <td><input type="button" value="show" onClick={()=> showStyles(!styles)}/></td>
                            <td>{styles? JSON.stringify(api.details?.styles): ""}</td>
                        </tr>
                    </tbody>
                </table>
             </div>
            : <p></p>
            }
        </>
    )
}

export default Splitter;