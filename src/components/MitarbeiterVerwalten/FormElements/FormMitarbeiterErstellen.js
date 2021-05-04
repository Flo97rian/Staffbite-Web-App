import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import Control from "./Control";

export default class FormMitarbeiterErstellen extends React.PureComponent {
    render() {
        return(
            <>
            <form>
                    <InputString label="Name" name="name" placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                    <InputString label="E-Mail" name="email"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputString>
                    <br/>
                    <InputNumber label="Stundenlohn (€)" name="stundenlohn"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <InputNumber label="Ziel mtl. (€)" name="zielmtleuro"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <InputNumber label="Ziel mtl. (h)" name="zielmtlh"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <Control label="Erfahrung" name="erfahrung"  placeholder="" defaultVal="Anfänger" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></Control>
                    <br/>
                    <InputNumber label="Schichten/Woche" name="schichtenwoche"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerMitarbeiter")}></InputNumber>
                    <br/>
                    <Row className="text-center">
                    <Col xs={12}>
                        <Button onClick={this.props.handleSave}> Speichern</Button>
                    </Col>
                    </Row>
                </form>
            </>
        )
    }
}