import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import ControlErfahrung from "./ControlErfahrung";

export default class FormMitarbeiterErstellen extends React.PureComponent {
    render() {
        return(
            <>
            <form>
                <Row>
                <Col xs={1}>
                </Col>
                <Col xs={10}>
                    <InputString label="Vorname, Nachname" name="name" placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                    <InputString info={true} description={"Wählen Sie eine gültige E-Mail Adresse. Über diese erhält ihr:e neu:e Mitarbeiter:inn alle benötigten Informationen, um sich auf Schichten zu bewerben"} label="E-Mail Adresse" name="email"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                    <InputNumber info={true} description={"Wählen Sie einen Stundenlohn für ihre:n neue:n Mitarbeiter:inn. Diesen können Sie jederzeit ändern."} label="Stundenlohn (€)" name="stundenlohn"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <InputNumber info={true} description={"Wählen Sie einen Zielverdienst für ihre:n neue:n Mitarbeiter:inn"} label="Ziel mtl. (€)" name="zielmtleuro"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <ControlErfahrung info={true} description={"Wählen Sie eine Qualifikation für ihre:n neue:n Mitarbeiter:inn. Die Qualifikation können Sie jederzeit ändern."} label="Erfahrung" name="erfahrung"  placeholder="" defaultVal="Anfänger" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></ControlErfahrung>
                    <br/>
                    <InputNumber info={true} description={"Wählen Sie eine durchschnittliche Ansazhl für Schichten, die ein:e Mitarbeiter:inn erhalten soll"} label="Schichten/Woche" name="schichtenwoche"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <InputString info={true} description={"Wählen Sie eine oder mehrere Positionen für die ihr:e Mitarbeiter:inn geeignet ist"} label="Position" name="position" placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                </Col>
                <Col xs={1}>
                </Col>
                </Row>
                </form>
            </>
        )
    }
}