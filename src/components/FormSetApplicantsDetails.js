import React, { useRef } from "react";
import {
    Col,
    Row,
    Button,
    Input,
    FormGroup
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";
import ChangeNotice from "./ChangeShiftsNotice";
import getShiftsName from "../libs/getShiftsName";
import getShiftsStartTime from "../libs/getShiftsStartTime";
import getShiftsEndTime from "../libs/getShiftsEndTime";
import getShiftsNotice from "../libs/getShiftsNotice";
import _ from "lodash";
import getShiftsRequiredQualification from "../libs/getShiftsRequiredQualification";

const FormSetApplicantsDetails = (props) => {
    const day = props.bewerber.col;
    const row = props.bewerber.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day];
    const shiftName = getShiftsName(shiftplan, row);
    const shiftStart = getShiftsStartTime(shiftplan, row)
    const shiftEnd = getShiftsEndTime(shiftplan, row);
    const shiftNotice = getShiftsNotice(shiftplan, row, day);
    const shiftQualification = getShiftsRequiredQualification(shiftplan, row, day)


    function selfShift(shift) {
        let keys = Object.keys(shift.setApplicants)
        let includesTenant = keys.includes("TENANT")
        if(includesTenant) {
            return (
                <>
                <p className="text-success font-weight-bold">Selbst eingetragen<Button className="float-right" size="sm" color="danger" onClick={() => props.handleRemoveTenantFromShift()}>Zurücksetzen</Button></p>
                </>
            )
        } else {
            return (
                <Button size="sm" color="success" onClick={() => props.handleSetTenantInShift()}>Eintragen</Button>
            )
        }
    }
    if (!_.isEmpty(shiftNotice) && !_.isBoolean(shiftQualification)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <ChangeNotice {...props}/>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Qualifikationsanforderung" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p className="font-weight-bold">{shiftQualification}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{shiftName} {day} {shiftStart} - {shiftEnd}</p>
                    </Col>
                </Row>
                <Row className="mx-4  mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(shift)}
                </Col>
            </Row>
            </>
        )
    } else if (_.isEmpty(shiftNotice) && !_.isBoolean(shiftQualification)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <ChangeNotice {...props}/>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Qualifikationsanforderung" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="font-weight-bold">{shiftQualification}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{shiftName} {day} {shiftStart} - {shiftEnd}</p>
                    </Col>
                </Row>
                <Row className="mx-4 mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(shift)}
                </Col>
            </Row>
            </>
        )
    }  else if(!_.isEmpty(shiftNotice) && _.isBoolean(shiftQualification)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <ChangeNotice {...props}/>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{shiftName} {day} {shiftStart} - {shiftEnd}</p>
                    </Col>
                </Row>
                <Row className="mx-4 mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(shift)}
                </Col>
            </Row>
            </>
        )
    } else {
        return (
            <>
            <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <ChangeNotice {...props}/> 
                    </Col>
                </Row>
            <Row className="mx-4">
                <Col xs="6">
                    <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    <p>{shiftName} {day} {shiftStart} - {shiftEnd}</p>
                </Col>
            </Row>
            <Row className="mx-4 mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(shift)}
                </Col>
            </Row>
            </>
        )
    }
}
export default FormSetApplicantsDetails;