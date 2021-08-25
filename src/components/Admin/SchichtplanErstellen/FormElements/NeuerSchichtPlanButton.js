import React from "react";
import Button from 'react-bootstrap/Button';
import store from "../../../../store";

const NeuerSchichtPlanButton = (props) => {
    const initialState = !0;
    const showButton = () => {
        return (
        <Button variant="primary" onClick={() => {store.dispatch({type: "OPEN", payload: "showSchichtplanErstellen"})}}>neuen Schichtplan erstellen</Button> 
        )}
        return (
            <>
                {initialState ? showButton() : <></>}
            </>
        );
    }
export default NeuerSchichtPlanButton;