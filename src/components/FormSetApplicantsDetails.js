import React from "react";
import {
    Col,
    Row,
    Button,
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";
import ChangeNotice from "./ChangeShiftsNotice";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { deleteTenantFromShift, settingTenantInShift } from "../reducers/Shiftplan";

const FormSetApplicantsDetails = (props) => {
    const dispatch = useDispatch();
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const Meta = useSelector(state => state.Meta);
    const Shift = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day]);
    const ShiftName = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftName);
    const ShiftStart = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftEnd = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftEnd);
    const ShiftNotice = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].notice);
    const shiftMinQualification = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].prio);

    const handleRemoveTenantFromShift = () => {
        dispatch(deleteTenantFromShift({index: index, day: day}));
    }

    const handleSetTenantInShift = () => {
        if(Meta?.vorname) {
            dispatch(settingTenantInShift({index: index, day: day, name: Meta.vorname}))
        }
      }

    function selfShift(shift) {
        let keys = Object.keys(shift.setApplicants)
        let includesTenant = keys.includes("TENANT")
        if(includesTenant) {
            return (
                <>
                <p className="text-success font-weight-bold">Selbst eingetragen<Button className="float-right" size="sm" color="danger" onClick={() => handleRemoveTenantFromShift()}>Zurücksetzen</Button></p>
                </>
            )
        } else {
            return (
                <Button size="sm" color="success" onClick={() => handleSetTenantInShift()}>Eintragen</Button>
            )
        }
    }
    if (!_.isEmpty(ShiftNotice) && !_.isBoolean(shiftMinQualification)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <ChangeNotice/>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Qualifikationsanforderung" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p className="font-weight-bold">{shiftMinQualification}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{ShiftName} {day} {ShiftStart} - {ShiftEnd}</p>
                    </Col>
                </Row>
                <Row className="mx-4  mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(Shift)}
                </Col>
            </Row>
            </>
        )
    } else if (_.isEmpty(ShiftNotice) && !_.isBoolean(shiftMinQualification)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <ChangeNotice/>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Qualifikationsanforderung" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <p className="font-weight-bold">{shiftMinQualification}</p>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{ShiftName} {day} {ShiftStart} - {ShiftEnd}</p>
                    </Col>
                </Row>
                <Row className="mx-4 mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(Shift)}
                </Col>
            </Row>
            </>
        )
    }  else if(!_.isEmpty(ShiftNotice) && _.isBoolean(shiftMinQualification)) {
        return (
            <>
                <Row className="mx-4">
                    <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs={6}>
                        <ChangeNotice/>
                    </Col>
                </Row>
                <Row className="mx-4">
                    <Col xs="6">
                        <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                    </Col>
                    <Col xs="6">
                        <p>{ShiftName} {day} {ShiftStart} - {ShiftEnd}</p>
                    </Col>
                </Row>
                <Row className="mx-4 mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(Shift)}
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
                        <ChangeNotice/> 
                    </Col>
                </Row>
            <Row className="mx-4">
                <Col xs="6">
                    <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    <p>{ShiftName} {day} {ShiftStart} - {ShiftEnd}</p>
                </Col>
            </Row>
            <Row className="mx-4 mb-2">
                <Col xs="6">
                    <InfoLabel title="Selbst eintragen?" description={INFO_USER_NOTICE}></InfoLabel>
                </Col>
                <Col xs="6">
                    {selfShift(Shift)}
                </Col>
            </Row>
            </>
        )
    }
}
export default FormSetApplicantsDetails;