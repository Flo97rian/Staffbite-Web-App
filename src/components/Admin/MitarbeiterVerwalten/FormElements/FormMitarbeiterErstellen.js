import React from "react";
import {
    Col,
    Row,
} from "reactstrap";
import InputString from "../../../Application/functionalComponents/InputString";
import InputStringValid from "./InputStringValid";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import ControlErfahrung from "./ControlErfahrung";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK } from "../../../../constants/InfoTexts";
import FormPositions from "./FormPositons";
import { getMeta, getStundenerfassung, validName, validEmail } from "../../../Application/functionalComponents/ValidInputs";

function FormMitarbeiterErstellen (props) {
        let hasMeta = getMeta(props.meta)
        if ( hasMeta) {
            let hasStundenerfassung = getStundenerfassung(props.Meta)
            if (hasStundenerfassung) {
                return(
                <>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col xs={10}>
                            <InputStringValid info={true} description={INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME} label="Vorname, Nachname *" name="name"  placeholder="" isValid={props.userInput.name} onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputStringValid>
                            <br/>
                            <InputStringValid info={true} description={INFO_EMPLOYEE_EMAIL_ADRESS} label="E-Mail Adresse *" name="email"  placeholder="" isValid={props.userInput.email} onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputStringValid>
                            <br/>
                            <InputNumber info={true} description={INFO_EMPLOYEE_HOURLY_WAGES} label="Stundenlohn (€)" name="stundenlohn"  placeholder="" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                            <br/>
                            <InputNumber info={true} description={INFO_EMPLOYEE_MONTHLY_INCOME} label="Ziel mtl. (€)" name="zielmtleuro"  placeholder="" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                            <br/>
                            <ControlErfahrung info={true} description={INFO_EMPLOYEE_QUALIFIKATION} label="Erfahrung" name="erfahrung"  placeholder="" defaultVal="Anfänger" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></ControlErfahrung>
                            <br/>
                            <InputNumber info={true} description={INFO_EMPLOYEE_SHIFTS_PER_WEEK} label="Schichten/Woche" name="schichtenwoche"  placeholder="" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                            <br/>
                            <InputString info={true} description={INFO_EMPLOYEE_POSITIONS} label="Position" name="position" placeholder="" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputString>
                            <br/>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                </>
            )} else {
                return(
                    <>
                        <Row>
                            <Col xs={1}>
                            </Col>
                            <Col xs={10}>
                                <InputStringValid info={true} description={INFO_EMPLOYEE_FIRSTNAME_AND_LASTNAME} label="Vorname, Nachname *" isValid={validName(props.userInput.name)} name="name"  currentValue={props.userInput.name} placeholder="Max Mustermann" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputStringValid>
                                <br/>
                                <InputStringValid info={true} description={INFO_EMPLOYEE_EMAIL_ADRESS} label="E-Mail Adresse *" isValid={validEmail(props.userInput.email)} name="email"  currentValue={props.userInput.email} placeholder="max@mustermann.de" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputStringValid>
                                <br/>
                                <ControlErfahrung info={true} description={INFO_EMPLOYEE_QUALIFIKATION} label="Erfahrung" name="erfahrung"  placeholder="" defaultVal="Anfänger" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></ControlErfahrung>
                                <br/>
                                <InputNumber info={true} description={INFO_EMPLOYEE_SHIFTS_PER_WEEK} label="Schichten/Woche" name="schichtenwoche"  placeholder="" onChange={(e) => props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                                <br/>
                                <FormPositions {...props}></FormPositions>
                            </Col>
                            <Col xs={1}>
                            </Col>
                        </Row>
                        </>
            )}   
        } else {
            return null;
        }
}

export default FormMitarbeiterErstellen;