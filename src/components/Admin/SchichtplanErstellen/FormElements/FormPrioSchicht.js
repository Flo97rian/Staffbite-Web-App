import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Switch from "./Switch";

export const FormPrioSchicht = (props) => {
    console.log(props.current)
        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <Switch 
                            info={true}
                            type="switch"
                            label="Mindestanforderung aktivieren"
                            name="Prioschicht" 
                            value={props.shiftSlot.prio} 
                            onChange={(e) => props.onChange(e, "daysIsActive")}
                            description="Mindestanforderungen sind die Mindestqualifikation, die ein:e Mitarbeiter:inn benötigt, um diese Position belegen zu dürfen"
                            />
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }