import React from "react";
import {
    Button
} from "reactstrap";
import store from "../../../../store";

const ModalOpenButton = (props) => {
    const showButton = () => {
        return (
        <Button color="primary" className={props.class} onClick={() => {store.dispatch({type: "OPEN", payload: props.modal})}}>{props.title}</Button> 
        )}
        return (
            <>
                {props.trigger ? showButton() : <></>}
            </>
        );
    }
export default ModalOpenButton;