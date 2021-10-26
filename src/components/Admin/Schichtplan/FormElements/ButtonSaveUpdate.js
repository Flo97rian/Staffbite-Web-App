import React from "react";
import {
    Button
} from "reactstrap"

const ButtonSaveUpdate = (props) => {
    const showSaveButton = () => {
        return (
        <Button color="white" size="lg" className="float-right mt-2 ml-2 mr-0" onClick={() => props.handleUpload()}><p className="m-0 text-muted">Speichern</p></Button> 
        )}
    const showUpdateButton = () => {
        return (
        <Button color="white" size="lg" className="float-right mt-2 ml-2 mr-0" onClick={() => props.handleUpdate()}><p className="m-0 text-muted">Aktualisieren</p></Button>
        )}
        return (
            <>
                {props.trigger ? (props.import ? showUpdateButton(): showSaveButton()) : <></>}
            </>
        );
    }
export default ButtonSaveUpdate;