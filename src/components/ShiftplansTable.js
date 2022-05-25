import React, { useEffect } from "react";

// reactstrap components
import {
    Row,
    Card,
    CardBody,
    Col,
} from "reactstrap"
import { Badge } from "reactstrap";
// core components
import PlanId from "./PlanStatus"
import _ from "lodash";
import ShiftplanDnD from "./ShiftplanDnD";
import { useSelector, useDispatch } from "react-redux";

const  ShiftplansTable = (props) => {
    const dispatch = useDispatch();
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
    const Plans = useSelector(state => state.DB.plans);
    const currentPlanIndex = useSelector(state => state.currentShiftPlan.currentShiftplanIndex)
    const Shiftplan = useSelector(state => state.Shiftplan);
    const DisplayBasicLayout = useSelector(state => state.display.displayBasicLayout);
    function getLegend() {
        if(Shiftplan.id !== "") {
            let id = Shiftplan.id;
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

    if( DisplayBasicLayout === false) return null;
    let currentPlan = Shiftplan.id;
    if(DisplayShiftplan && Plans) {
        if(currentPlan.split("#").includes("Entwurf")) {
            return (
                <>
                <Card>
                    <CardBody>
                        <Row className="text-center mt-4">
                            <Col xs={4}>
                                <p>Name</p>
                                <p>{Shiftplan.name}</p>
                            </Col>
                            <Col xs={4}>
                                <p>Status</p>
                                <PlanId id={Shiftplan.id} ></PlanId>
                            </Col>
                            <Col xs={4}>
                                <p>Legende</p>
                                {getLegend()}                                
                            </Col>
                        </Row>
                        <br/>
                        <Row className="text-center" noGutters={true}>
                            <ShiftplanDnD/>
                        </Row>
                    </CardBody>
                </Card>
                    </>
            );
        } 
        else if (!Shiftplan.id.split("#").includes("Entwurf")) {
        let Montag = Shiftplan.zeitraum.split(" - ")[0]
        let Sonntag = Shiftplan.zeitraum.split(" - ")[1]
        return (
            <>
            <Card>
                <CardBody>
                    <Row className="text-center mt-4">
                        <Col xs={3}>
                            <p>Name</p>
                            <p>{Shiftplan.name}</p>
                        </Col>
                        <Col xs={3}>
                            <p>Status</p>
                            <PlanId id={Shiftplan.id} ></PlanId>
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
                        <ShiftplanDnD/>
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
export default ShiftplansTable;