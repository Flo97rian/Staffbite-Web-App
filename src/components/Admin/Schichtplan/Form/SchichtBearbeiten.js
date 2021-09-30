import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputTime from "../../../Application/functionalComponents/InputTime";
import InputNumber from "../../../Application/functionalComponents/InputNumber";

const SchichtBearbeiten = (props) => {
    const Plans = props.plaene
    const currentPlan = props.plan
    const row = Number(props.shiftSlot.row)
    const newplan = props.Schichtplan
    console.log(Plans, currentPlan, row, newplan)
    const ShiftName = props.name
    const ShiftStart = props.start
    const ShiftEnde = props.ende
    const shiftDetails = props.import ? props.plaene[props.plan].plan[row].Wochentag : props.Schichtplan[row].Wochentag
    const anzahl = props.import ? props.plaene[props.plan].plan[row].Montag : props.Schichtplan[row].Montag
        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <InputString info={true} description={"Wählen Sie einen Namen für die Rolle der Schicht. (z.B. Service, Küche etc.)"} label="Rolle" name="rolle" placeholder={shiftDetails.ShiftName} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputString>
                        <br/>
                        <InputTime info={true} description={"Wählen Sie eine Uhrzeit, wann die Schicht beginnen soll"}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        <br/>
                        <InputTime info={true} description={"Wählen Sie eine Uhrzeit, wann die Schicht enden soll"}label="Ende" name="ende"  placeholder={shiftDetails.ShiftEnd} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputTime>
                        <br/>
                        <InputNumber info={true} description={"Wie viele Mitarbeiter:innen benötigen Sie für diese Schicht"} label="Anzahl benötigter Mitarbeiter:innen" name="anzahl"  placeholder={anzahl.anzahl} onChange={(e) => props.onChange(e, "changeSchichtplan")}></InputNumber>
                        <br/>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default SchichtBearbeiten