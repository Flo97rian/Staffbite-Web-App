import _ from "lodash";
import React from "react";
import {
    Col,
    Row,
    Badge,
    Button,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Card
} from "reactstrap"
import { FEEDBACK_INVALID_NOTICE } from "../constants/FeedbackText";
import { INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION } from "../constants/InfoTexts";
import InfoOverlay from "./InfoOverlay";

export const CalendarEditShiftAdvanced = (props) => {
    const isNewShiftplan = _.isObject(props.Schichtplan); 

    function getShiftActive () {
        let active = !1;
        let isActive; 
            
        if(isNewShiftplan) {
            isActive = _.get(props.Schichtplan, "plan[" + props.shiftSlot.row + "][" + props.shiftSlot.col + "].frei", false)
        }

        if (!isNewShiftplan) {
            isActive = _.get(props.shiftplan, "plan[" + props.shiftSlot.row + "][" + props.shiftSlot.col + "].frei", false)
        }

        if(!isActive) {
            active = !0;
        }

        return active;
    }

    function getShiftNotice() {
        let value = "Trage hier deine Notiz ein.";

        if(isNewShiftplan) {
            value = _.get(props.Schichtplan, "plan[" + props.shiftSlot.row + "][" + props.shiftSlot.col + "].notice", "")
        } 

        if(!isNewShiftplan) {
            value = _.get(props.shiftplan, "plan[" + props.shiftSlot.row + "][" + props.shiftSlot.col + "].notice", "")
        }
        return value;
    }

    function getColor(qualifikation) {
        let color = "light";

        if(isNewShiftplan) {
            color = _.get(props.Schichtplan, "plan[" + props.shiftSlot.row + "][" + props.shiftSlot.col + "].prio", false) === qualifikation ? "primary" : "light"
        } 

        if(!isNewShiftplan) {
            color = _.get(props.shiftplan, "plan[" + props.shiftSlot.row + "][" + props.shiftSlot.col + "].prio", false) === qualifikation ? "primary" : "light"
        }
        return color;
    }
        return(
            <Card className="bg-secondary shadow-none p-2 border">
                                <Row className="mt-2">
                    <Col>
                        <InfoOverlay infotitle="Notiz" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                                <FormGroup className="mb-1">
                                <Input
                                name="notice"
                                type="textarea"
                                invalid={(props.userInput.notice.length > 80)}
                                size="lg"
                                className=" edit-event--description input-autosize form-control"
                                placeholder={getShiftNotice()}
                                onChange={(e) => props.onChange(e)}
                                />
                                <FormFeedback invalid>
                                    Diese Notiz ist zu lang.
                                </FormFeedback>
                            </FormGroup>
                            <Button hidden={_.isEmpty(getShiftNotice())}classname="mt-0"color="warning" size="sm" disabled={getShiftActive()} onClick={() => props.handleResetShiftNotice(props.modalkey)}>Zurücksetzen</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <InfoOverlay infotitle="Mindestanforderung aktivieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                        <Card className="shadow-none border bg-secondary">
                            <Badge className="mr-2" color={getColor("Anfänger")} onClick={() => props.handleSelectPrio("Anfänger")}> Anfänger</Badge>
                            <Badge className="mr-2" color={getColor("Fortgeschritten")} onClick={() => props.handleSelectPrio("Fortgeschritten")}> Fortgeschritten</Badge>
                            <Badge className="mr-2" color={getColor("Experte")} onClick={() => props.handleSelectPrio("Experte")}> Experte</Badge>
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }