import React from "react";
import {
    Col,
    Row,
    Badge,
    Button
} from "reactstrap"
import { INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION } from "../../../../constants/InfoTexts";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";

export const PrioSchicht = (props) => {
    let hasuserInput = props.userInput !== null
    function getShiftActive () {
        let active = !1;
        let slot = props.shiftSlot;
        console.log(slot);
        if(slot) {
            let isActive = props.shiftplan.plan[slot.row][slot.col].frei;
            console.log(isActive);
            if(!isActive) {
                active = !0;
            }
        }
        return active;
    }
    function getColor(qualifikation) {
        let color = "light";
        if (hasuserInput) {
            if ("qualifikation" in props.userInput) {
                if (props.userInput.qualifikation === qualifikation && qualifikation !== props.shiftSlot.prio) {
                    color = "primary";
                }
            }
        }  else if (props.shiftSlot.prio !== !1 ) {
            if ( qualifikation === props.shiftSlot.prio) {
                color = "primary";
            }
        }
        else if (hasuserInput) {
            if ("qualifikation" in props.userInput) {
                if (props.userInput.qualifikation === qualifikation) {
                    color = "primary";
                }
            }
        }
        return color;
    }
        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <InfoOverlay infotitle="Mindestanforderung aktivieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                            <Badge className="mr-2" color={getColor("Anfänger")} onClick={() => props.handleSelectPrio("Anfänger")}> Anfänger</Badge>
                            <Badge className="mr-2" color={getColor("Fortgeschritten")} onClick={() => props.handleSelectPrio("Fortgeschritten")}> Fortgeschritten</Badge>
                            <Badge className="mr-2" color={getColor("Experte")} onClick={() => props.handleSelectPrio("Experte")}> Experte</Badge>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <InfoOverlay infotitle="Schicht deaktiveieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                            <Row>
                                <Button color="warning" disabled={getShiftActive()} onClick={() => props.onHandleActiveInactiveShift(props.modalkey)}>Deaktivieren</Button>
                                <Button color="success" disabled={!getShiftActive()} onClick={() => props.onHandleActiveInactiveShift(props.modalkey)}>Aktivieren</Button>
                            </Row>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }