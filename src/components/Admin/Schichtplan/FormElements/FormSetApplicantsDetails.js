import React, { useRef } from "react";
import {
    Col,
    Row,
    Button,
    Input,
    FormGroup
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import store from "../../../../store"
import DragAndDrop from "../FormElements/DragAndDrop";
import { getHasNotice, getHasPrio } from "../../../Application/functionalComponents/ElementFunctions";
import InfoLabel from "../../../Application/functionalComponents/InfoLabel";
import { INFO_USER_NOTICE } from "../../../../constants/InfoTexts";
import ChangeNotice from "./ChangeNotice";

const FormSetApplicantsDetails = (props) => {
    const day = props.bewerber.col;
    const row = props.bewerber.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day];
    const shiftname = shiftplan[row]["Wochentag"].ShiftName
    const shiftstart = shiftplan[row]["Wochentag"].ShiftStart
    const shiftend = shiftplan[row]["Wochentag"].ShiftEnd
    let hasNotice = getHasNotice(shift);
    let hasPrio = getHasPrio(shift);


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
    if (hasNotice && hasPrio) {
        let prio = shift.prio;
        let notice = shift.notice;
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
                        <p className="font-weight-bold">{prio}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{shiftname} {day} {shiftstart} - {shiftend}</p>
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
    } else if (!hasNotice && hasPrio) {
        let prio = shift.prio;
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
                        <p className="font-weight-bold">{prio}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{shiftname} {day} {shiftstart} - {shiftend}</p>
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
    }  else if(hasNotice && !hasPrio) {
        let notice = shift.notice;
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
                        <p>{shiftname} {day} {shiftstart} - {shiftend}</p>
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
                    <p>{shiftname} {day} {shiftstart} - {shiftend}</p>
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