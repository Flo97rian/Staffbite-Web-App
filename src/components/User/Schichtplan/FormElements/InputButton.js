import React from "react";
import {
    Col,
    Row,
    Button
} from "reactstrap"
import store from "../../../../store";
import UserPlanId from "./UserPlanId";

const InputButton = (props) => {
    const selectButton = (label) => {
        console.log(label)
        if (label[1] === "Freigeben") {
            return <Button name={props.label} outline color="success" onClick={() => setCurrentShiftPlan(props.id)}> Zur Bewerbung</Button>
        } else {
            return <Button name={props.label} outline color="success" onClick={() => setCurrentShiftPlan(props.id)}>Schichtplan einsehen</Button>
        }
    }

    const setCurrentShiftPlan = (id) => {
        store.dispatch({type: "SetCurrentShiftPlan", payload: id})
        store.dispatch({type: "setShiftPlanIsActive"})
        store.dispatch({type: "setShiftPlanIsImported"})
    }
        return(
            <>
                <Row className="text-center">
                    <Col xs={4}>
                        <UserPlanId id={props.label}></UserPlanId>
                    </Col>
                    <Col xs={4}>
                        <p>{props.start} - {props.ende}</p>
                    </Col>
                    <Col xs={4}>
                     {selectButton(props.label)}
                    </Col>
                </Row>
                <br/>
            </>
        )
    }
export default InputButton;