import React from "react";
import Button from 'react-bootstrap/Button';

export default class ButtonSchichtplanErstellen extends React.PureComponent {
    render() {
        return (
        <>
            <Button name="showSchichtplanErstellen" variant="primary" onClick={() => this.props.onClick("showSchichtplanErstellen")}>Schichtplan erstellen</Button>{' '}
        </>
        );
    }
}