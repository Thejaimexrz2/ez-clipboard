import { useState } from "react"; 
import Send from "./Send";
import Retrieve from "./Retrieve";

export default function  ActionContainer() {
    const [action, setAction] = useState('SEND');


    return (
        <div className="action-container">
            <div className="action-buttons">
                <button id="sendform-button" onClick={(event) => {setAction('SEND')}}>
                    Subir Texto
                </button>
                <button id="retrieveForm-button" onClick={(event) => {setAction('RETRIEVE')}}>
                    Recuperar Texto
                </button>
            </div>
            <div className="forms-container">
                {action === 'SEND' ? (<Send />) : (<Retrieve />)}
            </div>
        </div>
    )
}