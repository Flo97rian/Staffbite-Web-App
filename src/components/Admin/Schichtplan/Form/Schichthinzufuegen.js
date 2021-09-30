import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputString from "../../../Application/functionalComponents/InputString";
import InputTime from "../../../Application/functionalComponents/InputTime";
import InputTimeWithSwitch from "../FormElements/InputTimeWithSwitch";
import InputNumber from "../../../Application/functionalComponents/InputNumber";

export default class SchichtHinzufuegen extends React.PureComponent {
    render() {
        return(
            <>                
            <Row>
            <Col xs={1} ></Col>
            <Col xs={10} >
                    <InputString info={true} description={"Wählen Sie einen Namen für die Rolle der Schicht. (z.B. Service, Küche etc.)"} label="Rolle" name="rolle" placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputString>
                    <br/>
                    <InputTime info={true} description={"Wählen Sie eine Uhrzeit, wann die Schicht beginnen soll"} label="Beginn" name="beginn"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <br/>
                    <InputTimeWithSwitch info={true} description={"Wählen Sie eine Uhrzeit, wann die Schicht enden soll. Falls die Schicht ein variables Ende hat, betätigen Sie den Schalter rechts."} label="Ende" name="ende"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTimeWithSwitch>
                    <br/>
                    <InputNumber info={true} description={"Wie viele Mitarbeiter:innen benötigen Sie für diese Schicht"} label="Anzahl benötigter Mitarbeiter:innen" name="anzahl"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputNumber>
                    <br/>
                </Col>
                <Col xs={1} ></Col>
            </Row>
            </>
        )
    }
}