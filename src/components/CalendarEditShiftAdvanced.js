import _ from "lodash";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { settingMinQufalification } from "../reducers/Shiftplan";
import { settingShiftNotice } from "../reducers/userInput";
import InfoOverlay from "./InfoOverlay";

export const CalendarEditShiftAdvanced = (props) => {
    const isNewShiftplan = _.isObject(props.Schichtplan);
    const index = useSelector(state => state.shiftSlot.row);
    const day = useSelector(state => state.shiftSlot.col);
    const isActive = useSelector(state => state.Shiftplan.plan[index][day].frei);
    const shiftNotice = useSelector(state => state.Shiftplan.plan[index][day].notice);
    const minQualification = useSelector(state => state.Shiftplan.plan[index][day].prio);
    const userInputShiftNotice = useSelector(state => state.userInput.shiftNotice);
    const disptach = useDispatch();

    function getColor(qualifikation) {
        let color = "light";

        if(isNewShiftplan) {
            color = minQualification === qualifikation ? "primary" : "light"
        } 

        if(!isNewShiftplan) {
            color = minQualification === qualifikation ? "primary" : "light"
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
                                invalid={(userInputShiftNotice.length > 80)}
                                size="lg"
                                className=" edit-event--description input-autosize form-control"
                                placeholder={shiftNotice}
                                onChange={(event) => disptach(settingShiftNotice(event.target.value))}
                                />
                                <FormFeedback invalid>
                                    Diese Notiz ist zu lang.
                                </FormFeedback>
                            </FormGroup>
                            <Button hidden={_.isEmpty(shiftNotice)}classname="mt-0"color="warning" size="sm" disabled={isActive} onClick={() => props.handleResetShiftNotice(props.modalkey)}>Zurücksetzen</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <InfoOverlay infotitle="Mindestanforderung aktivieren" description={INFO_SHIFTPLAN_SHIFT_REQUIRED_QUALIFIKATION}/>
                        <Card className="shadow-none border bg-secondary">
                            <Badge className="mr-2" color={getColor("Anfänger")} onClick={() => disptach(settingMinQufalification({index: index, day: day, minQualification:"Anfänger"}))}> Anfänger</Badge>
                            <Badge className="mr-2" color={getColor("Fortgeschritten")} onClick={() => disptach(settingMinQufalification({index: index, day: day, minQualification:"Fortgeschritten"}))}> Fortgeschritten</Badge>
                            <Badge className="mr-2" color={getColor("Experte")} onClick={() => disptach(settingMinQufalification({index: index, day: day, minQualification:"Experte"}))}> Experte</Badge>
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }