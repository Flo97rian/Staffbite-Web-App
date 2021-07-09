import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Button from 'react-bootstrap/Button';
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import InputTime from "./InputTime";
import DateRangePickerExample from "./DateRangePickerExample.js";
import Switch from "./Switch";

export default class FormSchichtBearbeiten extends React.PureComponent {
    render() {
        return(
            <>
            <form>
                    <InputString label="Rolle" name="rolle" placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputString>
                    <br/>
                    <InputTime label="Beginn" name="beginn"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <br/>
                    <InputTime label="Ende" name="ende"  placeholder="" onChange={(e) => this.props.onChange(e, "changeSchichtplan")}></InputTime>
                    <br/>
                    <Row className="text-center">
                    <Col xs={12}>
                        <Button onClick={() => this.props.onSaveBearbeiten(this.props.modalkey)}> Übernehmen</Button>
                    </Col>
                    </Row>
                </form>
            </>
        )
    }
}