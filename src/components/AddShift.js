import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputString from "./InputString";
import InputStringShiftName from "./InputStringShiftName"
import InputTime from "./InputTime";
import InputTimeWithSwitch from "./InputTimeWithSwitch";
import InputNumber from "./InputNumber";
import SelectPosition from "./SelectPosition";
import { validShiftName } from "./ValidInputs";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../constants/InfoTexts";
export default class AddShift extends React.PureComponent {
    render() {
        return(
            <>                
            <Row>
            <Col xs={1} ></Col>
            <Col xs={10} >
                    <InputStringShiftName info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Name der Schicht" name="rolle" placeholder="" currentValue={this.props.userInput.rolle} isValid={validShiftName(this.props.userInput.rolle)}onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputStringShiftName>
                    <SelectPosition {...this.props} ></SelectPosition>
                    <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START} label="Beginn" name="beginn"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                    <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputNumber>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }
}