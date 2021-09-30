import React from "react";
import SchichtenTabelle from "../SchichtenTabelle";
import FormSchichtplanAuswaehlen from "./FormSchichtplanAuswaehlen";

export default class AuswahlShow extends React.PureComponent {
    render() {
        return (
        <>
            {this.props.bearbeiten
            ?
            <SchichtenTabelle
            currentUser={this.props.currentUser}
            plaene={this.props.plaene}
            bearbeiten={this.props.bearbeiten}
            plan={this.props.plan}
            onClick={this.props.onClick}
           />
            : 
            <FormSchichtplanAuswaehlen
            plaene={this.props.plaene}
            onSelect={this.props.onSelect}
            ></FormSchichtplanAuswaehlen>
            }
        </>
        );
    }
}