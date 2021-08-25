import React from "react";
import Button from 'react-bootstrap/Button';
import store  from "../../../../store"

export default class ButtonMitarbeiterErstellen extends React.PureComponent {
    render() {
        return (
        <>
            <Button name="showErstellen" variant="primary" onClick={() => {store.dispatch({type: "OPEN", payload: "showErstellen"})}}>Mitarbeiter:innen erstellen</Button>{' '}
        </>
        );
    }
}