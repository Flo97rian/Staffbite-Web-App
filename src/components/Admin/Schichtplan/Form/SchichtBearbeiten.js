import React from "react";
import {
    Col,
    Row,
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputTime from "../../../Application/functionalComponents/InputTime";
import InputTimeWithSwitch from "../FormElements/InputTimeWithSwitch";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import SelectPosition from "../FormElements/SelectPosition";



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
                        <InputString info={true} description={"Wählen Sie einen Namen für die Rolle der Schicht. (z.B. Service, Küche etc.)"} label="Name der Schicht" name="rolle" placeholder={shiftDetails.ShiftName} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputString>
                        <br/>
                        <SelectPosition {...props} shiftDetails={shiftDetails}></SelectPosition>
                        <br/>
                        <InputTime info={true} description={"Wählen Sie eine Uhrzeit, wann die Schicht beginnen soll"}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        <br/>
                        <InputTimeWithSwitch info={true} description={"Wählen Sie eine Uhrzeit, wann die Schicht enden soll. Falls die Schicht ein variables Ende hat, betätigen Sie den Schalter rechts."} label="Ende" name="ende"  placeholder="" onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                        <br/>
                        <InputNumber info={true} description={"Wie viele Mitarbeiter benötigen Sie für diese Schicht"} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl.anzahl} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputNumber>
                        <br/>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default SchichtBearbeiten