import React from "react";
import {
    Col,
    Row,
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputStringShiftName from "../../../Application/functionalComponents/InputStringShiftName"
import { validShiftName } from "../../../Application/functionalComponents/ValidInputs";
import InputTime from "../../../Application/functionalComponents/InputTime";
import InputTimeWithSwitch from "../FormElements/InputTimeWithSwitch";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import SelectPosition from "../FormElements/SelectPosition";
import store from "../../../../store";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_ORGANISATION_NAME, INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../../../../constants/InfoTexts";



const SchichtBearbeiten = (props) => {
    const row = Number(props.shiftSlot.row)
    let shiftDetails = {};
    let anzahl = 0;
    if (props.shiftplan) {
        shiftDetails = props.shiftplan.plan[row].Wochentag;
        anzahl = props.shiftplan.plan[row].Montag
    } else {
        shiftDetails = props.Schichtplan.plan[row].Wochentag;
        anzahl = props.Schichtplan.plan[row].Montag;
    }
        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <InputStringShiftName info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" name="rolle" currentValue={props.userInput.rolle} isValid={validShiftName(props.userInput.rolle, shiftDetails.ShiftName)} placeholder={shiftDetails.ShiftName} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputStringShiftName>
                        <br/>
                        <SelectPosition {...props} shiftDetails={shiftDetails}></SelectPosition>
                        <br/>
                        <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        <br/>
                        <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" {...props} placeholder={shiftDetails.ShiftEnd} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                        <br/>
                        <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl.anzahl} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputNumber>
                        <br/>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default SchichtBearbeiten