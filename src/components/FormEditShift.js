import React from "react";
import {
    Col,
    Row,
    Badge,
    Button,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from "reactstrap"
import { FEEDBACK_INVALID_NOTICE } from "../constants/FeedbackText";
import { INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION } from "../constants/InfoTexts";
import InfoOverlay from "./InfoOverlay";

export const FormEditShift = (props) => {
    let hasuserInput = props.userInput !== null
    function getShiftActive () {
        let active = !1;
        let slot = props.shiftSlot;
        if(slot) {
            let isNewShiftplan = typeof props.Schichtplan === "object"
            let isActive;
            if(isNewShiftplan) {
                isActive = props.Schichtplan.plan[slot.row][slot.col].frei;    
            } else {
                isActive = props.shiftplan.plan[slot.row][slot.col].frei;
            }
            if(!isActive) {
                active = !0;
            }
        }
        return active;
    }

    function getShiftNotice() {
        let value = "Trage hier deine Notiz ein.";
        let slot = props.shiftSlot;
        let isNewShiftplan = typeof props.Schichtplan === "object"
        if(isNewShiftplan) {
            let keys = Object.keys(props.Schichtplan.plan[slot.row][slot.col])
            if(keys.includes("notice")) {
                if(props.Schichtplan.plan[slot.row][slot.col].notice !== "") {
                    value = props.Schichtplan.plan[slot.row][slot.col].notice
                }
            }
        } else {
            let keys = Object.keys(props.shiftplan.plan[slot.row][slot.col])
            if(keys.includes("notice")) {
                if(props.shiftplan.plan[slot.row][slot.col].notice !== "") {
                    value = props.shiftplan.plan[slot.row][slot.col].notice
                }
            }
        }
        return value;
    }

    function noticeIsValid() {
        let isValid = !1;
        let notice = props.userInput.notice;
        let noticeLength = notice.length;
        if(noticeLength > 80) {
            isValid = !0;
        }
        return isValid;
    }

    function hasShiftNotice() {
        let value = !1;
        let slot = props.shiftSlot;
        let isNewShiftplan = typeof props.Schichtplan === "object"
        if(isNewShiftplan) {
            let keys = Object.keys(props.Schichtplan.plan[slot.row][slot.col])
            if(keys.includes("notice")) {
                let notice = props.Schichtplan.plan[slot.row][slot.col].notice
                if(notice !== "") {
                    value = !0;
                }
                
            }
        } else {
            let keys = Object.keys(props.shiftplan.plan[slot.row][slot.col])
            if(keys.includes("notice")) {
                let notice = props.shiftplan.plan[slot.row][slot.col].notice
                if(notice !== "") {
                    value = !0;
                }
            }
        }
        return value;
    }
    function getColor(qualifikation) {
        let color = "light";
        let slot = props.shiftSlot;
        if (hasuserInput) {
            let isNewShiftplan = typeof props.Schichtplan === "object"
            if(isNewShiftplan) {
                let keys = Object.keys(props.Schichtplan.plan[slot.row][slot.col])
                if(keys.includes("prio")) {
                    if(props.Schichtplan.plan[slot.row][slot.col].prio !== !1) {
                        if(qualifikation === props.Schichtplan.plan[slot.row][slot.col].prio) {
                            color = "primary"
                        }
                    }
                }
            } else {
                let keys = Object.keys(props.shiftplan.plan[slot.row][slot.col])
                if(keys.includes("prio")) {
                    if(props.shiftplan.plan[slot.row][slot.col].prio !== !1) {
                        if(qualifikation === props.shiftplan.plan[slot.row][slot.col].prio) {
                            color = "primary"
                        }
                    }
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
                            <InfoOverlay infotitle="Notiz" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                            {
                            !noticeIsValid() 
                            ?
                                    <FormGroup className="mb-1">
                                    <Input
                                    name="notice"
                                    type="textarea"
                                    size="lg"
                                    className="form-control-alternative edit-event--description input-autosize form-control"
                                    placeholder={getShiftNotice()}
                                    onChange={(e) => props.onChange(e)}
                                    />
                                </FormGroup>
                                :
                                <FormGroup className="mb-1">
                                    <Input
                                    size="lg"
                                    name="notice"
                                    type="textarea"
                                    className="form-control-alternative edit-event--description input-autosize form-control"
                                    invalid={noticeIsValid()}
                                    placeholder={getShiftNotice()}
                                    onChange={(e) => props.onChange(e)}
                                    />
                                    <FormFeedback invalid>{FEEDBACK_INVALID_NOTICE}</FormFeedback>
                                </FormGroup>
                                }   
                                { 
                                hasShiftNotice()
                                ?
                                <Button classname="mt-0"color="warning" size="sm" disabled={getShiftActive()} onClick={() => props.handleResetShiftNotice(props.modalkey)}>Zurücksetzen</Button>
                                :
                                <></>
                                }
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <InfoOverlay infotitle="Schicht deaktivieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                            <Row className="ml-0">
                                <Button color="warning" disabled={getShiftActive()} onClick={() => props.onHandleActiveInactiveShift(props.modalkey)}>Deaktivieren</Button>
                                <Button color="success" disabled={!getShiftActive()} onClick={() => props.onHandleActiveInactiveShift(props.modalkey)}>Aktivieren</Button>
                            </Row>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }