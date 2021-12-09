import React from "react";
import {
    Col,
    Row,
    Button
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import FormNames from "../../Schichtplan/FormElements/FormNames";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { INFO_USER_NOTICE } from "../../../../constants/InfoTexts";


const ShiftDetails = (props) => {
    const day = props.shiftslot.col;
    const row = props.shiftslot.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day]
    let applyedApplicants = shiftplan[row][day].applicants
    let hasApplicants = Object.keys(applyedApplicants).length > 0;
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
    if(hasShiftNotice() && hasApplicants) {
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
                        <p className="font-weight-bold">
                            {notice}
                        </p>
                    </Col>
                </Row>
                <Row className="mx-4">
                        <Col xs={6}>
                            <p className="mt-2">Bewerber</p>
                        </Col>
                        <Col xs={6}>
                            <FormNames names={applyedApplicants}></FormNames>
                        </Col>
                    </Row>
            </>
        );
    } else if(!hasShiftNotice() && hasApplicants){
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
                            <p className="mt-2">Bewerber</p>
                        </Col>
                        <Col xs={6}>
                            <FormNames names={applyedApplicants}></FormNames>
                        </Col>
                </Row>
            </>
        );
    } else if(hasShiftNotice() && !hasApplicants){
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
                        <p className="font-weight-bold">{notice}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs={6}>
                        <p className="mt-2">Bewerber</p>
                    </Col>
                    <Col xs={6}>
                        <FormNames names={applyedApplicants}></FormNames>
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