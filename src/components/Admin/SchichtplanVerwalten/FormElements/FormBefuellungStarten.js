import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

export default class FormBefuellungStarten extends React.PureComponent {

    render() {
        return(
            <>
            <form>
                <Row className="text-center">
                    <Col xs={6}>
                        <Form.Label>Datum</Form.Label>
                    </Col>
                    <Col xs={6}> 
                        <InfoOverlay
                        infotitle={"Standard"}
                        description={"In der Befüllungsart 'Standard' wird der Schichtplan vorrangig nach 'fairen' Bedingungen befüllt. Jede:r Mitarbeiter:inn soll je nach Verdienstvorstellung und Qualifikation gleichmäßig im Schichtplan berücksichtigt werden. Mehr Details hier"}/>
                    </Col>
                </Row>
                </form>
            </>
        )
    }
}