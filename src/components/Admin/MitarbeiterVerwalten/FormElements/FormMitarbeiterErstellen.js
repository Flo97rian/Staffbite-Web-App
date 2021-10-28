import React from "react";
import {
    Col,
    Row,
} from "reactstrap";
import InputString from "../../../Application/functionalComponents/InputString";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import ControlErfahrung from "./ControlErfahrung";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK } from "../../../../constants/InfoTexts";
import FormPositions from "./FormPositons";

export default class FormMitarbeiterErstellen extends React.PureComponent {
    render() {
        return(
            <>
            {this.props.meta.stundenerfassung ?
            <>
                <Row>
                <Col xs={1}>
                </Col>
                <Col xs={10}>
                    <InputString label="Vorname, Nachname" name="name" placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                    <InputString info={true} description={INFO_EMPLOYEE_EMAIL_ADRESS} label="E-Mail Adresse" name="email"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                    <InputNumber info={true} description={INFO_EMPLOYEE_HOURLY_WAGES} label="Stundenlohn (€)" name="stundenlohn"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <InputNumber info={true} description={INFO_EMPLOYEE_MONTHLY_INCOME} label="Ziel mtl. (€)" name="zielmtleuro"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <ControlErfahrung info={true} description={INFO_EMPLOYEE_QUALIFIKATION} label="Erfahrung" name="erfahrung"  placeholder="" defaultVal="Anfänger" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></ControlErfahrung>
                    <br/>
                    <InputNumber info={true} description={INFO_EMPLOYEE_SHIFTS_PER_WEEK} label="Schichten/Woche" name="schichtenwoche"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <InputString info={true} description={INFO_EMPLOYEE_POSITIONS} label="Position" name="position" placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                </Col>
                <Col xs={1}>
                </Col>
                </Row>
            </>
            :
            <>
                <Row>
                    <Col xs={1}>
                    </Col>
                    <Col xs={10}>
                        <InputString label="Vorname, Nachname" name="name" placeholder="Max Mustermann" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                        <br/>
                        <InputString info={true} description={INFO_EMPLOYEE_EMAIL_ADRESS} label="E-Mail Adresse" name="email"  placeholder="max@mustermann.de" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                        <br/>
                        <ControlErfahrung info={true} description={INFO_EMPLOYEE_QUALIFIKATION} label="Erfahrung" name="erfahrung"  placeholder="" defaultVal="Anfänger" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></ControlErfahrung>
                        <br/>
                        <InputNumber info={true} description={INFO_EMPLOYEE_SHIFTS_PER_WEEK} label="Schichten/Woche" name="schichtenwoche"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                        <br/>
                        <FormPositions {...this.props}></FormPositions>
                    </Col>
                    <Col xs={1}>
                    </Col>
                </Row>
                </>
            }
            </>
        )
    }
}