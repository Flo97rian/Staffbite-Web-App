// Button mit 2 Varianten - je nachdem, ob this.props.true wahr oder falsch ist
// Titel,onClick und input können variabel sein
import React from "react";
export default class UserPlanId extends React.PureComponent {
    setName(id) {
        if (id.includes("Freigeben")) {
            return (
                <p style={{"color": "#5e72e4"}}>offen für Bewerbungen</p>
        )} else if (id.includes("Veröffentlicht")) {
            return (
                <p style={{"color": "#2dce89"}}>Veröffentlicht</p>
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