import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { INFO_USER_NOTICE } from "../../../../constants/InfoTexts";


const ShiftDetails = (props) => {
    const day = props.shiftslot.col;
    const row = props.shiftslot.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day]
    const shiftname = shiftplan[row]["Wochentag"].ShiftName
    const shiftstart = shiftplan[row]["Wochentag"].ShiftStart
    const shiftend = shiftplan[row]["Wochentag"].ShiftEnd

    function hasShiftNotice() {
        let value = !1;
            let keys = Object.keys(shift)
            if(keys.includes("notice")) {
                let notice = shift.notice
                if(notice !== "") {
                    value = !0;
                }
            }
        return value;
    }
    if(hasShiftNotice()) {
        let notice = shift.notice;
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p>{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs={6}>
                    <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p>
                            {notice}
                        </p>
                    </Col>
                </Row>
            </>
        );
    } else {
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p>{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>
            </>
        );
    }
}
export default ShiftDetails;