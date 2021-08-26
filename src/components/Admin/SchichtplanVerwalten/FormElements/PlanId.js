// Button mit 2 Varianten - je nachdem, ob this.props.true wahr oder falsch ist
// Titel,onClick und input können variabel sein
import React from "react";
export default class PlanId extends React.PureComponent {
    setName(id) {
        if (id.includes("Entwurf")) {
            return (
                <p style={{"color": "#5e72e4"}}>Entwurf</p>
        )} else if (id.includes("Freigeben")) {
            return (
                <p style={{"color": "#fb6340"}}>Freigegeben</p>
        )} else if (id.includes("Review")) {
            return (
                <p style={{"color": "#5e72e4"}}>Review</p>
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