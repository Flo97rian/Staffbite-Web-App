import {
    Col,
    Row,
} from "reactstrap"
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";
import ChangeNotice from "./ChangeShiftsNotice";
import _ from "lodash";
import { useSelector } from "react-redux";

const FormSetApplicantsDetails = (props, ref) => {
    const day = useSelector(state => state.shiftSlot.day);
    const ShiftName = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftName);
    const ShiftStart = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftEnd = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftEnd);
    const ShiftNotice = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].notice);
    const shiftMinQualification = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].prio);
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
            </>
        )
    }
}
export default FormSetApplicantsDetails;