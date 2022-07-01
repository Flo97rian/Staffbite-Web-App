import React from "react";
import {
    Col,
    Row
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";
import FormNames from "./UserFormNames";
import _ from "lodash";
import getShiftsNotice from "../libs/getShiftsNotice";
import { useSelector } from "react-redux";

const ShiftDetails = (props) => {
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[index][day]
    let setApplicants = shiftplan[index][day].setApplicants
    const shiftname = shiftplan[index]["Wochentag"].ShiftName
    const shiftstart = shiftplan[index]["Wochentag"].ShiftStart
    const shiftend = shiftplan[index]["Wochentag"].ShiftEnd
    const notice = getShiftsNotice(shiftplan, index, day);

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
    function includesUser(setApplicants) {
        let valid = !1;
        if(props.User.SK in setApplicants) {
            valid = !0;
        }
        return valid;

    }
    if(hasShiftNotice() && includesUser(setApplicants)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="lead mt-0">{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>
                <Row hidden={_.isEmpty(notice)} className="mx-4">
                    <Col xs={6}>
                    <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p>
                            {notice}
                        </p>
                    </Col>
                </Row>
                <Row className="mx-4">
                        <Col xs={6}>
                            <p className="lead mt-0 text-muted">Eingetragen</p>
                        </Col>
                        <Col xs={6}>
                            <FormNames names={setApplicants}></FormNames>
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
                        <p className="lead mt-0">{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                        <Col xs={6}>
                            <p className="lead mt-0 text-muted">Eingetragen</p>
                        </Col>
                        <Col xs={6}>
                            <FormNames names={setApplicants}></FormNames>
                        </Col>
                    </Row>
            </>
        );
    }
}
export default ShiftDetails;