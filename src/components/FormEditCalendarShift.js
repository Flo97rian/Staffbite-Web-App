import React, { useRef, useState, Component, useEffect } from "react";
import {
    Row,
    Col,
    UncontrolledCollapse,
    Card,
    Collapse
} from "reactstrap"
import { useSelector } from "react-redux";
import CalendarEditShift from "./CalendarEditShift";
import { CalendarEditShiftAdvanced } from "./CalendarEditShiftAdvanced";
import EmployeesDnDForSingleShift from "./EmployeesDnDForSingleShift";



const FromEditCalendarShift = (props) => {
    const Shiftplan = useSelector(state => state.Shiftplan);
    const [standardSettings, setStandardSettings] = useState(true);
    const [advancedSettings, setAdvancedSettings] = useState(false);
    const [applicantsSettings, setApplicantsSettings] = useState(false);

    useEffect(() => {
        selectSettings();
    }, [])

    const selectSettings = () => {
        const shiftplanType = Shiftplan.id.split('#')[1];
        if(shiftplanType === "Veröffentlicht") {
            setAdvancedSettings(false)
            setStandardSettings(false);
            setApplicantsSettings(true);
        }

        if(shiftplanType === "Review") {
            setAdvancedSettings(false)
            setStandardSettings(false);
            setApplicantsSettings(true); 
        }
    }
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
                    <Card className="bg-secondary shadow-none border p-2 overflow-auto">
                    <EmployeesDnDForSingleShift
                    ref={props.DragAndDropRef}
                    />
                    </Card>
                </Collapse>
            </Col>
        </Row>
    )

}

export default FromEditCalendarShift;