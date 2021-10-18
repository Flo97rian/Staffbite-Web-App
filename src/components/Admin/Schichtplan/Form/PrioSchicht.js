import React from "react";
import {
    Col,
    Row,
    Badge
} from "reactstrap"
import InfoOverlay from "../../../Application/functionalComponents/InfoOverlay";
import Switch from "../../../Application/functionalComponents/Switch";

export const PrioSchicht = (props) => {
    let hasDaysIsActive = props.daysIsActive !== null
    
    function getColor(qualifikation) {
        let color = "light";
        if (hasDaysIsActive) {
            if ("qualifikation" in props.daysIsActive) {
                if (props.daysIsActive.qualifikation === qualifikation && qualifikation !== props.shiftSlot.prio) {
                    color = "primary";
                }
            }
        }  else if (props.shiftSlot.prio !== !1 ) {
            if ( qualifikation === props.shiftSlot.prio) {
                color = "primary";
            }
        }
        else if (hasDaysIsActive) {
            if ("qualifikation" in props.daysIsActive) {
                if (props.daysIsActive.qualifikation === qualifikation) {
                    color = "primary";
                }
            }
        }
        return color;
    }
        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                            <InfoOverlay infotitle="Mindestanforderung aktivieren" description="Wenn Sie eine Mindestanforderung für diese Schicht festlegen wollen, klicken Sie einfach auf die jewelige Qualifikation"/>
                            <Badge className="mr-2" color={getColor("Anfänger")} onClick={() => props.handleSelectPrio("Anfänger")}> Anfänger</Badge>
                            <Badge className="mr-2" color={getColor("Fortgeschritten")} onClick={() => props.handleSelectPrio("Fortgeschritten")}> Fortgeschritten</Badge>
                            <Badge className="mr-2" color={getColor("Experte")} onClick={() => props.handleSelectPrio("Experte")}> Experte</Badge>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }