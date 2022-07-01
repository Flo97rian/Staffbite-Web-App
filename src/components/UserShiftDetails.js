import {
    Col,
    Row} from "reactstrap"
import FormNames from "./UserFormNames";
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";
import { useSelector } from "react-redux";


const UserShiftDetails = (props) => {
    const index = useSelector(state => state.shiftSlot.index)
    const day = useSelector(state => state.shiftSlot.day);
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[index][day]
    let includesApplicants = Object.keys(shift).includes("applicants")
    let applyedApplicants = shiftplan[index][day].applicants

    let hasApplicants = !1;
    if(includesApplicants) {
        hasApplicants = Object.keys(applyedApplicants).length > 0;
    }
    const shiftname = shiftplan[index]["Wochentag"].ShiftName
    const shiftstart = shiftplan[index]["Wochentag"].ShiftStart
    const shiftend = shiftplan[index]["Wochentag"].ShiftEnd

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