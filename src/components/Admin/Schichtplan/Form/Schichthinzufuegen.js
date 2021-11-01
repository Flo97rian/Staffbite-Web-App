import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputTime from "../../../Application/functionalComponents/InputTime";
import InputTimeWithSwitch from "../FormElements/InputTimeWithSwitch";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import SelectPosition from "../FormElements/SelectPosition";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../../../../constants/InfoTexts";
export default class SchichtHinzufuegen extends React.PureComponent {
    render() {
        return(
            <>                
            <Row>
            <Col xs={1} ></Col>
            <Col xs={10} >
                    <InputString info={true} description={INFO_SHIFTPLAN_SHIFT_NAME} label="Rolle" name="rolle" placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputString>
                    <br/>
                    <SelectPosition {...this.props} ></SelectPosition>
                    <br/>
                    <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START} label="Beginn" name="beginn"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <br/>
                    <InputTimeWithSwitch info={true} description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                    <br/>
                    <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputNumber>
                    <br/>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }
}