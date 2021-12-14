import React from "react";
import {
    Button
} from "reactstrap"
import store  from "../../../../store"

export default class ButtonMitarbeiterErstellen extends React.PureComponent {
    render() {
        return (
        <>
            <Button name="showErstellen" className="float-right mt-4 ml-2 mr-0 button_mitartbeitereinladen"  color="primary" onClick={() => {store.dispatch({type: "OPEN", payload: "showErstellen"})}}><p className="m-0 text-white">Mitarbeiter einladen</p></Button>{' '}
        </>
        );
    }
}