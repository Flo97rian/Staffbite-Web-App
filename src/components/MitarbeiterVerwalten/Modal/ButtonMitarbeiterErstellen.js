import React from "react";
import Button from 'react-bootstrap/Button';

export default class ButtonMitarbeiterErstellen extends React.PureComponent {
    render() {
        return (
        <>
            <Button name="showErstellen" variant="primary" onClick={() => this.props.onClick("showErstellen")}>Mitarbeiter:innen erstellen</Button>{' '}
        </>
        );
    }
}