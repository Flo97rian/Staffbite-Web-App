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

const CalendarEditShift = (props) => {
    const row = _.get(props.shiftSlot, "row", false);
    const day = _.get(props.shiftSlot, "col", false);
    const isNewShiftplan = _.isObject(props.Schichtplan);
    const shift = isNewShiftplan ? _.get(props.Schichtplan.plan, "[" + row + "][" + day + "]", {}) : _.get(props.shiftplan.plan, "[" + row + "][" + day + "]", {})
    const shiftRow = isNewShiftplan ? _.get(props.Schichtplan.plan, "[" + row + "]", {}) : _.get(props.shiftplan.plan, "[" + row + "]", {})

    if(_.isEmpty(shift)) 
        return null
    const shiftDetails = isNewShiftplan ? getShiftDescriptionDetails(props.Schichtplan.plan, row) : getShiftDescriptionDetails(props.shiftplan.plan, row);
    const anzahl = isNewShiftplan ? _.get(props.Schichtplan.plan, "[" + row + "][" + day + "].anzahl", 0) : _.get(props.shiftplan.plan, "[" + row + "][" + day + "].anzahl", 0)
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
                    <InputString info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" name="rolle" value={props.userInput.rolle} placeholder={shiftDetails.ShiftName} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputString>
                    <Row>
                        <Col>
                            <SelectPosition {...props} shiftDetails={shiftDetails}></SelectPosition>
                        </Col>
                        <Col>
                            <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputNumber>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        </Col>
                        <Col>
                            <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" {...props} placeholder={shiftDetails.ShiftEnd} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Switch info={true} description={"Moin"} type="switch" label="Täglich wiederholen" name="dayly" value={isDayly} onChange={(e) => props.onChange(e)}></Switch>
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