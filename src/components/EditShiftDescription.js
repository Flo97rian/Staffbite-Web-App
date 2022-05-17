import React from "react";
import {
    Col,
    Row,
} from "reactstrap"
import InputStringShiftName from "./InputStringShiftName"
import { validShiftName } from "./ValidInputs";
import InputTime from "./InputTime";
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import InputNumber from "./InputNumber";
import SelectPosition from "./SelectPosition";
import {INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../constants/InfoTexts";
import _ from "lodash";
import getShiftDescriptionDetails from "../libs/getShiftDetails";
import getShiftsNumberOfEmployees from "../libs/getShiftsNumberOfEmployees";
import { useSelector, useDispatch } from "react-redux";


const EditShiftDescription = (props) => {
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const isNewShiftplan = _.isObject(props.Schichtplan);
    const shiftDetails = isNewShiftplan ? getShiftDescriptionDetails(props.Schichtplan.plan, day) : getShiftDescriptionDetails(props.shiftplan.plan, day);
    const anzahl = isNewShiftplan ? getShiftsNumberOfEmployees(props.Schichtplan.plan, day) : getShiftsNumberOfEmployees(props.shiftplan.plan, day);

        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <InputStringShiftName info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" name="rolle" currentValue={props.userInput.rolle} isValid={validShiftName(props.userInput.rolle, shiftDetails.ShiftName)} placeholder={shiftDetails.ShiftName} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputStringShiftName>
                        <SelectPosition {...props} shiftDetails={shiftDetails}></SelectPosition>
                        <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" {...props} placeholder={shiftDetails.ShiftEnd} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                        <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl.anzahl} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputNumber>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default EditShiftDescription