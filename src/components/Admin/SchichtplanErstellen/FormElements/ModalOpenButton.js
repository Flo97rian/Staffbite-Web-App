import React from "react";
import Button from 'react-bootstrap/Button';
import store from "../../../../store";

const ModalOpenButton = (props) => {
    const showButton = () => {
        return (
        <Button variant="primary" onClick={() => {store.dispatch({type: "OPEN", payload: props.modal})}}>{props.title}</Button> 
        )}
        return (
            <>
                {props.trigger ? showButton() : <></>}
            </>
        );
    }
export default ModalOpenButton;