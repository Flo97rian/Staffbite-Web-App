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
import { resettingShiftNotice, settingMinQufalification, settingShiftActive } from "../reducers/Shiftplan";
import { resettingUserInput, settingShiftNotice } from "../reducers/userInput";
import { resettingModal } from "../reducers/modal";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";

export const FormEditShift = (props) => {
    const dispatch = useDispatch()
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const userInput = useSelector(state => state.userInput);
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
    const DisplayNewShiftplan = useSelector(state => state.display.displayNewShiftplan);
    const ShiftplanShiftIsActive = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.frei : undefined);
    const newShiftplanShiftIsActive = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.frei : undefined);
    const ShiftplanShiftNotice = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.notice: undefined);
    const newShiftplanShiftNotice = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.notice: undefined);
    const ShiftplanShiftMinQualification = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.prio: undefined);
    const newShiftplanShiftMinQualification = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.prio : undefined);


    const handleActiveInactiveShift = () => {
        if(DisplayNewShiftplan) {
          dispatch(resettingModal())
        } 
        
        if (DisplayShiftplan) {
        dispatch(settingShiftActive({index: index, day: day}));
        dispatch(resettingModal())
        dispatch(settingShiftplanChanged())
        }
    }

    const selectMinQualification = (qualification) => {
        if(DisplayNewShiftplan) {
          //dispatch(settingMinQufalification(qualification));
        }

        if(DisplayShiftplan) {
            dispatch(settingMinQufalification({index: index, day: day, minQualification: qualification}));
            dispatch(settingShiftplanChanged())
        }
    }

    const resetShiftNotice = () => {
        dispatch(resettingShiftNotice({index: index, day: day}));
        dispatch(resettingUserInput());
    }
    function getShiftActive () {
        let isActive; 
        if(DisplayNewShiftplan) {
            isActive = newShiftplanShiftIsActive;
        }

        if (DisplayShiftplan) {
            isActive = ShiftplanShiftIsActive;
        }
        return isActive;
    }

    function getShiftNotice() {
        let value = "";

        if(DisplayNewShiftplan) {
            value = newShiftplanShiftNotice;
        } 

        if(DisplayShiftplan) {
            value = ShiftplanShiftNotice;
        }
        return value;
    }

    function getColor(qualifikation) {
        let color = "light";

        if(DisplayNewShiftplan) {
            color = newShiftplanShiftMinQualification === qualifikation ? "primary" : "light"
        } 

        if(DisplayShiftplan) {
            color = ShiftplanShiftMinQualification === qualifikation ? "primary" : "light"
        }
        return color;
    }

        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <InfoOverlay infotitle="Mindestanforderung aktivieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                            <Badge className="mr-2" color={getColor("Anfänger")} onClick={() => selectMinQualification("Anfänger")}> Anfänger</Badge>
                            <Badge className="mr-2" color={getColor("Fortgeschritten")} onClick={() => selectMinQualification("Fortgeschritten")}> Fortgeschritten</Badge>
                            <Badge className="mr-2" color={getColor("Experte")} onClick={() => selectMinQualification("Experte")}> Experte</Badge>
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
                                    invalid={(userInput.shiftNotice.length > 80)}
                                    size="lg"
                                    className=" edit-event--description input-autosize form-control"
                                    placeholder={getShiftNotice()}
                                    onChange={(event) => dispatch(settingShiftNotice(event.target.value))}
                                    />
                                    <FormFeedback invalid>
                                        Diese Notiz ist zu lang.
                                    </FormFeedback>
                                </FormGroup>
                                <Button hidden={!getShiftNotice()} classname="mt-0"color="warning" size="sm" disabled={!getShiftActive()} onClick={() => resetShiftNotice()}>Zurücksetzen</Button>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <InfoOverlay infotitle="Schicht deaktivieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                            <Row className="ml-0">
                                <Button color="warning" disabled={!getShiftActive()} onClick={() => handleActiveInactiveShift()}>Deaktivieren</Button>
                                <Button color="success" disabled={getShiftActive()} onClick={() => handleActiveInactiveShift()}>Aktivieren</Button>
                            </Row>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }