// Button mit 2 Varianten - je nachdem, ob this.props.true wahr oder falsch ist
// Titel,onClick und input können variabel sein
import React from "react";
import Button from 'react-bootstrap/Button';
export default class SchichtplanButton extends React.PureComponent {
    render() {
        return (
        <>
            {this.props.true
            ? 
            <Button variant="primary" onClick={() => this.props.b1onClick(this.props.b1onClickVal)}>{this.props.b1titel}</Button>
            : 
            <Button variant="primary" onClick={() => this.props.b2onClick(this.props.b2onClickVal)}>{this.props.b2titel}</Button> 
            }
        </>
        );
    }
}