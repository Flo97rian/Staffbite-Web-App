import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import InputString from "./InputString";
import InputNumber from "./InputNumber";

export default class FormSchichtHinzufuegen extends React.PureComponent {
    render() {
        return(
            <>
            <form>
                    <InputString label="Rolle" name="rolle" placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputString>
                    <br/>
                    <InputNumber label="Beginn" name="beginn"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputNumber>
                    <br/>
                    <InputNumber label="Ende" name="ende"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputNumber>
                    <br/>
                    <Row className="text-center">
                    <Col xs={12}>
                        <Button onClick={() => this.props.onSaveHinzufuegen(this.props.modalkey)}> Übernehmen</Button>
                    </Col>
                    </Row>
                </form>
            </>
        )
    }
}