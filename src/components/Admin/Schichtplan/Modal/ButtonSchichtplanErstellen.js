import React from "react";
import Button from 'react-bootstrap/Button';
import store from "../../../../store"

const ButtonSchichtplanErstellen = (props) =>{
        return (
        <>
            <Button name="showSchichtplanErstellen" variant="primary" onClick={() => {store.dispatch({type: "OPEN", payload: "showSchichtplanErstellen"})}}>Schichtplan erstellen</Button>{' '}
        </>
        );
    }
export default ButtonSchichtplanErstellen