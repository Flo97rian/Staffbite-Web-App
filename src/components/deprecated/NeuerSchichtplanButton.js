import React from "react";
import {
    Button
} from "reactstrap";
import store from "../../store";

const NeuerSchichtplanButton = (props) => {
    const showButton = () => {
        return (
        <Button size="lg" color="primary" className="float-right mt-2 button_vorlage_erstellen" onClick={() => {store.dispatch({type: "OPEN", payload: props.modal})}}><p className="m-0 text-white">{props.title}</p></Button> 
        )}
        return (
            <>
                {props.trigger && props.navIndex === 1 ? showButton() : <></>}
            </>
        );
    }
export default NeuerSchichtplanButton;