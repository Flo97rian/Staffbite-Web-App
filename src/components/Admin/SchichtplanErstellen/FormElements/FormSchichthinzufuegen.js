import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InputString from "../../MitarbeiterVerwalten/FormElements/InputString";
import InputTime from "./InputTime";
import InputNumber from "../../MitarbeiterVerwalten/FormElements/InputNumber";

export default class FormSchichtHinzufuegen extends React.PureComponent {
    render() {
        return(
            <>
                    <InputString label="Rolle" name="rolle" placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputString>
                    <br/>
                    <InputTime label="Beginn" name="beginn"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <br/>
                    <InputTime label="Ende" name="ende"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <br/>
                    <InputNumber label="Anzahl benötigter Mitarbeiter:innen" name="anzahl"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputNumber>
                    <br/>
            </>
        )
    }
}