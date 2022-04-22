import React from "react";
import {
    Col,
    Row,
} from "reactstrap"
import {INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_START} from "../../../../../constants/InfoTexts"
import InputNumber from '../../../../../components/Application/functionalComponents/InputNumber'
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import InputTime from "../../../../../components/Application/functionalComponents/InputTime"
import SelectPosition from '../../../../../components/Admin/Schichtplan/FormElements/SelectPosition'
import InputStringShiftName from '../../../../../components/Application/functionalComponents/InputStringShiftName'



const SchichtBearbeiten = (props) => {
    let fakeMeta = {schichten: ['Service', 'Bar']}
    const row = Number(props.shiftSlot.row)
    let shiftDetails = props.Schichtplan[row].Wochentag;
    let anzahl = props.Schichtplan[row].Montag;
        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <InputStringShiftName info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" name="ShiftName" currentValue={props.userInput.rolle} isValid={true} placeholder={shiftDetails.ShiftName} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputStringShiftName>
                        <SelectPosition {...props} Meta={fakeMeta} shiftDetails={shiftDetails}></SelectPosition>
                        <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="ShiftStart"  placeholder={shiftDetails.ShiftStart} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ShiftEnd" {...props} placeholder={shiftDetails.ShiftEnd} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                        <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl.anzahl} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputNumber>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default SchichtBearbeiten