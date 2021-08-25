import React from "react";
import Form from 'react-bootstrap/Form';
import {
    Col,
    Row,
    Button
} from "reactstrap"
import PlanId from "../../SchichtplanVerwalten/FormElements/PlanId";
import store from "../../../../store";

export const InputButton = (props) => {
        const setCurrentShiftPlan = (id) => {
            store.dispatch({type: "SetCurrentShiftPlan", payload: id})
            store.dispatch({type: "setShiftPlanIsActive"})
            store.dispatch({type: "setShiftPlanIsImported"})
        }
        return(
            <>
                <Row className="text-center">
                    <Col xs={2}>
                        <Form.Label>{props.label}</Form.Label>
                    </Col>
                    <Col xs={4}>
                        <Form.Label>{props.montag} - {props.sonntag}</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <PlanId id={props.status} ></PlanId>
                    </Col>
                    <Col xs={2}>
                    <Button name={props.label} outline color="success" onClick={() => setCurrentShiftPlan(props.id)}> Auswählen</Button>{' '}
                    </Col>
                    <Col xs={2}>
                    <Button name={props.label} outline color="danger" onClick={() => props.onDelete(props.id)}> Entfernen </Button>{' '}
                    </Col>
                </Row>
                <br/>
            </>
        )
    }