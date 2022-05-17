import _ from "lodash";
import React from "react";
import getShiftDescriptionDetails from "../libs/getShiftDetails";
import {
    Row,
    Col,
    Card,
    Button,
} from "reactstrap"
import InputString from "./InputString";
import InputTime from "./InputTime";
import InputNumber from "./InputNumber";
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import SelectPosition from "./SelectPosition";
import { INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_START, INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES } from "../constants/InfoTexts";
import Switch from "./Switch";
import { useSelector, useDispatch } from "react-redux";
import { settingShiftEnd, settingShiftIsDayly, settingShiftName, settingShiftNumberOfEmployees, settingShiftStart } from "../reducers/userInput";

const CalendarEditShift = (props) => {
    const shift = useSelector(state => state.Shiftplan.plan[state.shiftSlot.row][state.shiftSlot.col]);
    const shiftRow = useSelector(state => state.Shiftplan.plan[state.shiftSlot.row]);
    const shiftDetails = useSelector(state => state.Shiftplan.plan[state.shiftSlot.row].Wochentag);
    const anzahl = useSelector(state => state.Shiftplan.plan[state.shiftSlot.row][state.shiftSlot.col].anzahl);
    const userInputName = useSelector(state => state.userInput.shiftName);
    const dispatch = useDispatch()

    if(_.isEmpty(shift)) 
        return null
    let isDayly = true;
    _.forIn(shiftRow, function (value, key) {
        if (key === "Wochentag") return
        if (value.frei !== true) 
            isDayly = false;
    });

    return (
        <Card className="bg-secondary border px-2 shadow-none">
            <Row className="mt-3">
                <Col>
                    <InputString info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" value={userInputName} placeholder={shiftDetails.ShiftName} onChange={(event) => dispatch(settingShiftName(event.target.value))}></InputString>
                    <Row>
                        <Col>
                            <SelectPosition {...props} shiftDetails={shiftDetails}></SelectPosition>
                        </Col>
                        <Col>
                            <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl} onChange={(event) => dispatch(settingShiftNumberOfEmployees(event.target.value))}></InputNumber>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(event) => dispatch(settingShiftStart(event.target.value))}></InputTime>
                        </Col>
                        <Col>
                            <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" {...props} placeholder={shiftDetails.ShiftEnd} onChange={(event) => dispatch(settingShiftEnd(event.target.value))}></InputTimeWithSwitch>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Switch info={true} description={"Moin"} type="switch" label="Täglich wiederholen" name="dayly" value={isDayly} onChange={(event) => dispatch(settingShiftIsDayly(event.target.checked))}></Switch>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Card className="mb-2">
                            <Button size="sm" outline color="danger" onClick={() => props.handleCalendarDeleteShift()}>Schicht löschen</Button>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )

}

export default CalendarEditShift;