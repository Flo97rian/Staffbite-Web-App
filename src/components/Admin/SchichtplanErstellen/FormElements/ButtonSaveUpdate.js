import React from "react";
import Button from 'react-bootstrap/Button';
import store from "../../../../store";

const ButtonSaveUpdate = (props) => {
    const showSaveButton = () => {
        return (
        <Button variant="primary" onClick={() => props.handleUpload()}>Schichtplan speichern</Button> 
        )}
    const showUpdateButton = () => {
        return (
        <Button variant="primary" onClick={() => props.handleUpdate()}>Schichtplan aktualisieren</Button> 
        )}
        return (
            <>
                {props.trigger ? (props.import ? showUpdateButton(): showSaveButton()) : <></>}
            </>
        );
    }
export default ButtonSaveUpdate;