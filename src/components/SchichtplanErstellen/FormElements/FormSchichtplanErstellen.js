import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputString from "./InputString";
import InputNumber from "./InputNumber";
import DateRangePickerExample from "./DateRangePickerExample.js";
import Switch from "./Switch";

export default class FormSchichtplanErstellen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}

        this.renderTooltip = this.renderTooltip.bind(this);
    };
    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Simple tooltip
        </Tooltip>
        );

    render() {
        return(
            <>
            <form>
                    <InputString label="Name des Schichtplanes" name="name" placeholder="" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></InputString>
                    <br/>
                    <InputNumber label="Schichten pro Tag" name="schichtentag"  placeholder="" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></InputNumber>
                    <br/>
                    <Row className="text-center">
                    <Col xs={6}>
                        <Form.Label>
                            Kalenderwoche <i class="fa fa-info-circle" aria-hidden="true"></i>
                        </Form.Label>
                    </Col>
                    <Col xs={6}>
                        <DateRangePickerExample getDates={this.props.getDates}/>  
                    </Col>
                    </Row>
                    <br/>
                    <Row className="text-center">
                        <Col xs={12}>
                            <Form.Label>Gibt es freie Tage?</Form.Label>
                        </Col>
                    </Row>
                    <Switch type="switch" label="Montag" name="Montag" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Switch type="switch" label="Dienstag" name="Dienstag" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Switch type="switch" label="Mittwoch" name="Mittwoch" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Switch type="switch" label="Donnerstag" name="Donnerstag" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Switch type="switch" label="Freitag" name="Freitag" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Switch type="switch" label="Samstag" name="Samstag" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Switch type="switch" label="Sonntag" name="Sonntag" value="true" onChange={(e) => this.props.onChange(e, "neuerSchichtplan")}></Switch>
                    <Row className="text-center">
                    <Col xs={12}>
                        <Button onClick={() => this.props.onSave()}> Übernehmen</Button>
                    </Col>
                    </Row>
                </form>
            </>
        )
    }
}