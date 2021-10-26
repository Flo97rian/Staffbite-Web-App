import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

export default class BefuellungStarten extends React.PureComponent {

    render() {
        return(
            <>
            <form>
                <Row className="text-center">
                    <Col xs={6}>
                        <p>{this.props.shiftplan.zeitraum}</p>
                    </Col>
                    <Col xs={6}> 
                        <InfoOverlay
                        infotitle={"Standard"}
                        description={"In der Befüllungsart 'Standard' wird der Schichtplan vorrangig nach 'fairen' Bedingungen befüllt. Jeder Mitarbeiter soll je nach Verdienstvorstellung und Qualifikation gleichmäßig im Schichtplan berücksichtigt werden. Mehr Details hier"}/>
                    </Col>
                </Row>
                </form>
            </>
        )
    }
}