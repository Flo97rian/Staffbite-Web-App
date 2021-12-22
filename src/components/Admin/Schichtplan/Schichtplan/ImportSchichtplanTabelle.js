import React from "react";

// reactstrap components
import {
  Row,
  Col,
  Badge,
  Card,
  CardBody
}
from "reactstrap";
// core components
import PlanId from "../FormElements/PlanId"
import SchichtplanDnDEntwurf from "./SchichtplanDnDEntwurf"
import SchichtplanDnDFreigegeben from "./SchichtplanDnDFreigegeben"
import SchichtplanDnDReview from "./SchichtplanDnDReview"
import SchichtplanDnDVeröffentlicht from "./SchichtplanDnDVeröffentlicht"
import { isValidEmployees, isValidPlans } from "../../../Application/functionalComponents/ValidFunctions";

const  ImportSchichtplanTabelle = (props) => {

    function getLegend() {
        if(props.shiftplan.id) {
            let id = props.shiftplan.id;
            const idReview = id.split("#").includes("Review")
            const idVeröffentlicht = id.split("#").includes("Veröffentlicht")
            const idEntwurf = id.split("#").includes("Entwurf")
            const idFreigegeben = id.split("#").includes("Freigeben")
            if (idEntwurf) {
                return (
                    <>
                        <Badge className="m-1" color="light">Betrieb geöffnet</Badge>
                        <Badge className="m-1" color="default">Betrieb geschlossen</Badge>
                    </>
                )
            } else if (idFreigegeben) {
                return (
                    <>
                        <Badge className="m-1" color="success">Bewerber vorhanden</Badge>
                        <Badge className="m-1" color="light">Keine Bewerber</Badge>
                        <Badge className="m-1" color="default">Betrieb geschlossen</Badge>
                    </>
                )
            } else if (idReview) {
                return (
                    <>
                        <Badge className="m-1" color="success">Bewerber vorhanden</Badge>
                        <Badge className="m-1" color="light">Keine Bewerber</Badge>
                        <Badge className="m-1" color="default">Betrieb geschlossen</Badge>
                    </>
                )
            } else if (idVeröffentlicht) {
                return (
                    <>
                        <Badge className="m-1" color="success">Bewerber vorhanden</Badge>
                        <Badge className="m-1" color="light">Keine Bewerber</Badge>
                        <Badge className="m-1" color="default">Betrieb geschlossen</Badge>
                    </>
                )
            }
        }
    }

    function selectTable () {
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

    let isActivePlan = props.bearbeiten;
    let isImportedPlan = props.import;
    let hasPlans = isValidPlans(props.plans)
    let hasEmployees = isValidEmployees(props.employees)
    let currentPlan = props.shiftplan.id;
    if(isActivePlan && isImportedPlan && hasPlans && hasEmployees) {
        if(currentPlan.split("#").includes("Entwurf")) {
            return (
                <>
                <Card>
                    <CardBody>
                        <Row className="text-center mt-4" noGutters={true}>
                            <Col xs={4}>
                                <p>Name</p>
                                <p>{props.shiftplan.name}</p>
                            </Col>
                            <Col xs={4}>
                                <p>Status</p>
                                <PlanId id={props.shiftplan.id} ></PlanId>
                            </Col>
                            <Col xs={4}>
                                <p>Legende</p>
                                { getLegend()}
                            </Col>
                        </Row>
                        <br/>
                        <Row className="text-center" noGutters={true}>
                            {selectTable()}
                        </Row>
                    </CardBody>
                </Card>
                    </>
            );
        } 
        else if (!props.shiftplan.id.split("#").includes("Entwurf")) {
        let Montag = props.shiftplan.zeitraum.split(" - ")[0]
        let Sonntag = props.shiftplan.zeitraum.split(" - ")[1]
        return (
            <>
            <Card>
                <CardBody>
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
                            <p>Legende</p>
                            { getLegend()}
                        </Col>
                    </Row>
                    <br/>
                    <Row className="text-center" noGutters={true}>
                        {selectTable()}
                    </Row>
                </CardBody>
            </Card>
                </>
        );
    }
    } else {
        return null;
    }
}
export default ImportSchichtplanTabelle;