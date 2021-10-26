import React from "react";
import {
    Button,
} from "reactstrap";
import store from "../../../../store";

const ModalOpenButton = (props) => {
    const showButton = () => {
        return (
        <Button className="float-right mt-2 ml-2 mr-0" size="lg" color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: props.modal})}}><p className="m-0 text-white">{props.title}</p></Button> 
        )}
        return (
            <>
                {props.trigger ? showButton() : <></>}
            </>
        );
    }
export default ModalOpenButton;