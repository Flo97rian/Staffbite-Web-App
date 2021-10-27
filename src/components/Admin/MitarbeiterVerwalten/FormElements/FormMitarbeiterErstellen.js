import React from "react";
import {
    Col,
    Row,
    Badge
} from "reactstrap";
import InputString from "../../../Application/functionalComponents/InputString";
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import InputNumber from "../../../Application/functionalComponents/InputNumber";
import ControlErfahrung from "./ControlErfahrung";
import { INFO_EMPLOYEE_EMAIL_ADRESS, INFO_EMPLOYEE_HOURLY_WAGES, INFO_EMPLOYEE_MONTHLY_INCOME, INFO_EMPLOYEE_POSITIONS, INFO_EMPLOYEE_QUALIFIKATION, INFO_EMPLOYEE_SHIFTS_PER_WEEK } from "../../../../constants/InfoTexts";

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
                        {this.props.showPositionHinzufuegen ?
                        <InputString info={true} description={INFO_EMPLOYEE_POSITIONS} label="Position" name="position"  placeholder="" onChange={(e) => this.props.handlePositionChange(e)}></InputString>
                        :
                        <InfoOverlay info={true} description={INFO_EMPLOYEE_POSITIONS} infotitle="Position"></InfoOverlay>
                        }
                        { this.props.employeeIsActive !== null && "position" in this.props.employeeIsActive ? 
                        this.props.employeeIsActive["position"].map((item, index) => {
                            return (
                                <Badge key={index} className="mr-2 mt-2" color="primary" onClick={() => this.props.handleRemovePositions(item)}>{item}</Badge>
                            )
                        })
                        :
                        <></>
                        }
                        { this.props.meta.schichten !== null && this.props.employeeIsActive === null ? 
                        this.props.meta.schichten.map((item, index) => {
                            return (
                                <Badge key={index} className="mr-2" color="light" onClick={() => this.props.handleSetPositions(item)}>{item}</Badge>
                            )}
                        )
                        :
                        <></>
                        }
                           { this.props.meta.schichten !== null && this.props.employeeIsActive !== null ? 
                        this.props.meta.schichten.map((item, index) => ( !("position" in this.props.employeeIsActive) || !(item in this.props.employeeIsActive["position"]) ?
                                <Badge key={index} className="mr-2" color="light" onClick={() => this.props.handleSetPositions(item)}>{item}</Badge>
                        :
                        <></>
                        ))
                        :
                        <></>
                        }
                        <br/>
                        {this.props.showPositionHinzufuegen ?
                        <>
                        <Badge className="mt-2 mb-4 mr-2" color="success" onClick={() => this.props.handlePositionErstellen()}>Position erstellen</Badge>
                        <Badge className="mt-2 mb-4" color="warning" onClick={() => this.props.handlePositionHinzufuegenClose()}>x</Badge>
                        </>
                        :
                        <Badge className="mt-2 mb-4" color="light" onClick={() => this.props.handlePositionHinzufuegen()}>Position erstellen</Badge>
                        }
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