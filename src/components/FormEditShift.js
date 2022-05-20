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
    FormFeedback
} from "reactstrap"
import { FEEDBACK_INVALID_NOTICE } from "../constants/FeedbackText";
import { INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION } from "../constants/InfoTexts";
import InfoOverlay from "./InfoOverlay";
import { useSelector, useDispatch } from "react-redux";
import { resettingShiftNotice } from "../reducers/Shiftplan";

export const FormEditShift = (props) => {
    const dispatch = useDispatch()
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const isNewShiftplan = _.isObject(props.Schichtplan); 

    const resetShiftNotice = () => {
        dispatch(resettingShiftNotice({index: index, day: day}));
    }
    function getShiftActive () {
        let active = !1;
        let isActive; 
            
        if(isNewShiftplan) {
            isActive = _.get(props.Schichtplan, "plan[" + index + "][" + day + "].frei", false)
        }

        if (!isNewShiftplan) {
            isActive = _.get(props.shiftplan, "plan[" + index + "][" + day + "].frei", false)
        }

        if(!isActive) {
            active = !0;
        }

        return active;
    }

    function getShiftNotice() {
        let value = "Trage hier deine Notiz ein.";

        if(isNewShiftplan) {
            value = _.get(props.Schichtplan, "plan[" + index + "][" + day + "].notice", "")
        } 

        if(!isNewShiftplan) {
            value = _.get(props.shiftplan, "plan[" + index + "][" + day + "].notice", "")
        }
        return value;
    }

    function getColor(qualifikation) {
        let color = "light";

        if(isNewShiftplan) {
            color = _.get(props.Schichtplan, "plan[" + index + "][" + day + "].prio", false) === qualifikation ? "primary" : "light"
        } 

        if(!isNewShiftplan) {
            color = _.get(props.shiftplan, "plan[" + index + "][" + day + "].prio", false) === qualifikation ? "primary" : "light"
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
                                <Button hidden={_.isEmpty(getShiftNotice())}classname="mt-0"color="warning" size="sm" disabled={getShiftActive()} onClick={() => resetShiftNotice()}>Zurücksetzen</Button>
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