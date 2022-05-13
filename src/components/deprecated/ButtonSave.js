import React from "react";
import {
    Button
} from "reactstrap"

const ButtonSave = (props) => {
        return (
            <>
            {
                props.ShiftplanChanged
                ?
                <Button color="success" size="lg" className="float-right mt-2 ml-2 mr-0" onClick={() => props.handleUpload()}><p className="m-0 text-white">Speichern</p></Button> 
                :
                <Button color="white" size="lg" className="float-right mt-2 ml-2 mr-0" onClick={() => props.handleUpload()}><p className="m-0 text-muted">Speichern</p></Button> 
            }
            </>
        )
    }
export default ButtonSave;