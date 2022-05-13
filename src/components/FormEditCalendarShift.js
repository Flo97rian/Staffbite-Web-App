import React, { useRef, useState } from "react";
import {
    Row,
    Col,
    UncontrolledCollapse,
    Card,
    Collapse
} from "reactstrap"
import CalendarEditShift from "./CalendarEditShift";
import { CalendarEditShiftAdvanced } from "./CalendarEditShiftAdvanced";
import EmployeesDnDForSingleShift from "./EmployeesDnDForSingleShift";


const FromEditCalendarShift = (props) => {
    const [standardSettings, setStandardSettings] = useState(true);
    const [advancedSettings, setAdvancedSettings] = useState(false);
    const [applicantsSettings, setApplicantsSettings] = useState(false);
    const day = props.shiftSlot.col;
    const row = props.shiftSlot.row;
    const shiftplan = props.shiftplan.plan
    let shift = shiftplan[row][day];
    const applicants = shift.setApplicants
    const applyedApplicants = shift.applicants
    let hasApplicantsAfterPublish = Object.keys(shift).includes("applicantsAfterPublish")
    let applicantsAfterPublish = hasApplicantsAfterPublish ? shift.applicantsAfterPublish : []
    let isPublished = props.shiftplan.id.split('#')[1] === "Veröffentlicht";
    const validApplicants = shift.setValidApplicants
    const position = shiftplan[row]["Wochentag"].ShiftPosition;
    const shiftanzahl = shift.anzahl
    return (
        <Row>
            <Col>
                <h3 onClick={
                    () => {
                        setAdvancedSettings(false)
                        setStandardSettings(true);
                        setApplicantsSettings(false);
                    }
                }>
                    Allgemeine Einstellungen
                    <i className="fas fa-angle-down fas-sm ml-2 text-right"/>
                </h3>
                <Collapse isOpen={standardSettings}>
                    <CalendarEditShift {...props}/>
                </Collapse>
                <h3 onClick={
                    () => {
                        setAdvancedSettings(true)
                        setStandardSettings(false);
                        setApplicantsSettings(false);
                    }
                    }>
                    Erweiterte Einstellungen
                    <i className="fas fa-angle-down fas-sm ml-2 text-right"/>
                </h3>
                <Collapse isOpen={advancedSettings}>
                    <CalendarEditShiftAdvanced {...props}/>
                </Collapse>
                <h3 onClick={
                    () => {
                        setApplicantsSettings(true);
                        setAdvancedSettings(false);
                        setStandardSettings(false);
                    }
                    }>
                    Mitarbeiter eintragen
                    <i className="fas fa-angle-down fas-sm ml-2 text-right"/>
                </h3>
                <Collapse isOpen={applicantsSettings}>
                    <Card className="bg-secondary shadow-none border p-2">
                    <EmployeesDnDForSingleShift
                    ref={props.DragAndDropRef}
                    applyed={applyedApplicants}
                    valid={validApplicants}
                    isPublished={isPublished}
                    applicantsAfterPublish={applicantsAfterPublish}
                    hasApplicantsAfterPublish={applicantsAfterPublish}
                    set={applicants}
                    position={position}
                    anzahl={shiftanzahl}
                    {...props}
                    />
                    </Card>
                </Collapse>
            </Col>
        </Row>
    )

}

export default FromEditCalendarShift;