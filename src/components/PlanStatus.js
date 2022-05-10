// Button mit 2 Varianten - je nachdem, ob this.props.true wahr oder falsch ist
// Titel,onClick und input können variabel sein
import React from "react";
export default class PlanStatus extends React.PureComponent {
    setName(id) {
        if (id.includes("Entwurf")) {
            return (
                <p style={{"color": "#5e72e4"}}>Vorlage</p>
        )} else if (id.includes("Freigeben")) {
            return (
                <p style={{"color": "#fb6340"}}>Bewerbung</p>
        )} else if (id.includes("Review")) {
            return (
                <p style={{"color": "#5e72e4"}}>Überprüfen</p>
        )} else if (id.includes("Veröffentlicht")) {
            return (
                <p style={{"color": "#2dce89"}}>Schichtplan</p>
        )}
    }
    render() {
        return (
        <>
            {this.setName(this.props.id)}
        </>
        );
    }
}