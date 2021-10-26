import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Badge,
}
from "reactstrap";
// core components
import PlanId from "../FormElements/PlanId"
import SchichtplanDnDEntwurf from "./SchichtplanDnDEntwurf"
import SchichtplanDnDFreigegeben from "./SchichtplanDnDFreigegeben"
import SchichtplanDnDReview from "./SchichtplanDnDReview"
import SchichtplanDnDVeröffentlicht from "./SchichtplanDnDVeröffentlicht"

const  ImportSchichtplanTabelle = (props) => {
    const Montag = props.shiftplan.zeitraum.split(" - ")[0]
    const Sonntag = props.shiftplan.zeitraum.split(" - ")[1]
    const selectTable = () => {
        const id = props.shiftplan.id
        const idReview = id.split("#").includes("Review")
        const idVeröffentlicht = id.split("#").includes("Veröffentlicht")
        const idEntwurf = id.split("#").includes("Entwurf")
        const idFreigegeben = id.split("#").includes("Freigeben")
        if (idEntwurf) {
            return (
                <SchichtplanDnDEntwurf {...props}/>
            )
        } else if (idFreigegeben) {
            return (
                <SchichtplanDnDFreigegeben {...props}/>
            )
        } else if (idReview) {
            return (
                <SchichtplanDnDReview {...props}/>
            )
        } else if (idVeröffentlicht) {
            return (
                <SchichtplanDnDVeröffentlicht {...props}/>
            )
        }

}
        return (
            <>
            <Row className="text-center mt-4" noGutters={true}>
                <Col xs={3}>
                    <p>Name</p>
                    <p>{props.shiftplan.name}</p>
                </Col>
                <Col xs={3}>
                    <p>Status</p>
                    <PlanId id={props.shiftplan.id} ></PlanId>
                </Col>
                <Col xs={3}>
                        <p>Zeitraum</p>
                        <p>{Montag} - {Sonntag}</p>
                        </Col>
                <Col xs={3}>
                    <p>Lengende</p>
                    <Badge color="success">Bewerber</Badge>
                    <Badge color="light"> kein Bewerber</Badge>
                    <Badge color="dark"> kein Betrieb</Badge>
                </Col>
            </Row>
            <br/>
                <Row className="text-center" noGutters={true}>
                {selectTable()}
                </Row>
                </>
        );
    }
export default ImportSchichtplanTabelle;