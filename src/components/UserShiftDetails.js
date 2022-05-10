import React from "react";
import {
    Col,
    Row,
    Button
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import FormNames from "./UserFormNames";
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";


const UserShiftDetails = (props) => {
    const day = props.shiftslot.col;
    const row = props.shiftslot.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day]
    let includesApplicants = Object.keys(shift).includes("applicants")
    let applyedApplicants = shiftplan[row][day].applicants

    let hasApplicants = !1;
    if(includesApplicants) {
        hasApplicants = Object.keys(applyedApplicants).length > 0;
    }
    const shiftname = shiftplan[row]["Wochentag"].ShiftName
    const shiftstart = shiftplan[row]["Wochentag"].ShiftStart
    const shiftend = shiftplan[row]["Wochentag"].ShiftEnd

    function hasNotice(shift) {
        let isValid = !1
        let keys = Object.keys(shift)
        if (keys.includes("notice")) {
            if(shift.notice !== "") {
                isValid = !0;
            }
        }
        return isValid;
    }

    function includesUser(applyedApplicants) {
        let valid = !1;
        if(props.User.SK in applyedApplicants) {
            valid = !0;
        }
        return valid;

    }

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
    if(hasShiftNotice() && includesApplicants && hasApplicants) {
        let notice = shift.notice;
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="lead  mt-0">{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>

                <Row className="mx-4">
                    <Col xs={6}>
                    <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="lead font-weight-bold">
                            {notice}
                        </p>
                    </Col>
                </Row>

                <Row className="mx-4">
                        <Col xs={6}>
                            <p className="mt-2 lead">Bewerber</p>
                        </Col>
                        <Col xs={6}>
                            <FormNames names={applyedApplicants}></FormNames>
                        </Col>
                    </Row>
            </>
        );
    } else if(!hasShiftNotice() && includesApplicants && hasApplicants){
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="lead  mt-0">{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>

                <Row className="mx-4">
                        <Col xs={6}>
                            <p className="mt-2 lead">Weitere Bewerber</p>
                        </Col>
                        <Col xs={6}>
                            <FormNames names={applyedApplicants}></FormNames>
                        </Col>
                </Row>
            </>
        );
    } else if(hasShiftNotice() && ((includesApplicants && !hasApplicants) || (!includesApplicants)) ){
        let notice = shift.notice;
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="lead  mt-0">{shiftname} {day} {shiftstart} - {shiftend}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="lead font-weight-bold">{notice}</p>
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
            </>
        );
    }
}
export default UserShiftDetails;