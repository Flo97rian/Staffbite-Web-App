import { useRef, useState, useEffect } from "react";
import {
    Row,
    Col,
    Collapse,
    Button
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux";
import CalendarEditShift from "./CalendarEditShift";
import { CalendarEditShiftAdvanced } from "./CalendarEditShiftAdvanced";
import { resettingModal } from "../reducers/modal";
import { settingApplicants, settingCalenderShift } from "../reducers/Shiftplan";
import { resettingCurrentShiftCustomDays, resettingShiftCustomDays, resettingShiftIsDayly, resettingUserInput, settingShiftIsDayly } from "../reducers/userInput";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { resettingEmployeesDummyshifts } from "../reducers/DB";
import { settingUpdateType } from "../reducers/temporary";
import EmployeesDnDForSingleShift from "./EmployeesDnDForSingleShift";



const FromEditCalendarShift = (props) => {
    const Shiftplan = useSelector(state => state.Shiftplan);
    const [standardSettings, setStandardSettings] = useState(true);
    const [advancedSettings, setAdvancedSettings] = useState(false);
    const [applicantsSettings, setApplicantsSettings] = useState(false);
    const dispatch = useDispatch();
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const userInput = useSelector(state => state.userInput);
    const userInputShiftIsDayly = useSelector(state => state.userInput.shiftIsDayly);
    const userInputCustomDays = useSelector(state => state.userInput.shiftCustomDays);
    const DragAndDropRef = useRef()

    const closeModal = () => {
        dispatch(resettingShiftIsDayly());
        dispatch(resettingShiftCustomDays());
        dispatch(resettingModal());
    }

    const handleCalendarShiftChanges = (changeAllSelectedDays = false) => {
        const updateApplicant = DragAndDropRef.current;
        if(userInputCustomDays.length === 7) {
            dispatch(settingShiftIsDayly());
        }
        if(userInputCustomDays.length !== 7 && userInputShiftIsDayly) {
            dispatch(resettingShiftIsDayly());
        }
        dispatch(settingCalenderShift({index: index, day: day, userInput: userInput, DnDRef: updateApplicant, changeAllSelectedDays:changeAllSelectedDays}));
        dispatch(resettingUserInput())
        dispatch(resettingCurrentShiftCustomDays());
        dispatch(resettingShiftIsDayly());
        dispatch(resettingModal());
        dispatch(settingUpdateType("updateShifts"));
        dispatch(settingShiftplanChanged())
        dispatch(resettingEmployeesDummyshifts());
      }
    
    const handleChangeEmployees = () => {

        dispatch(settingApplicants({
            index: index,
            day: day,
            updateApplicants: DragAndDropRef.current
        }))
        dispatch(resettingModal())
        dispatch(settingUpdateType("updateShifts"));
        dispatch(settingShiftplanChanged())
        dispatch(resettingEmployeesDummyshifts());
    }

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
        <>
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
                <Collapse className="mb-3" isOpen={applicantsSettings}>
                    <EmployeesDnDForSingleShift
                    ref={DragAndDropRef}
                    />
                </Collapse>
            </Col>
        </Row>
        <Row className="text-right">
            <Col>
            <Button color="link" onClick={() => closeModal()}> Schließen </Button>
                    <Button hidden={((userInputCustomDays.length === 1 && !applicantsSettings) || applicantsSettings || !userInputShiftIsDayly)} color="success" onClick={() => handleCalendarShiftChanges(true)}>Alle Schichten ändern</Button>
                    <Button hidden={((userInputCustomDays.length <= 1 && !applicantsSettings) || applicantsSettings || userInputShiftIsDayly)} color="success" onClick={() => handleCalendarShiftChanges(true)}>Ausgewählte Schichten ändern</Button>
                    <Button hidden={((userInputCustomDays.length === 1 && !applicantsSettings)|| applicantsSettings)} color="success" onClick={() => handleCalendarShiftChanges()}>Nur diese Schicht ändern</Button>
                    <Button hidden={((userInputCustomDays.length > 1 && !applicantsSettings) || applicantsSettings || userInputShiftIsDayly)} color="success" onClick={() => handleCalendarShiftChanges()}>Schicht ändern</Button>
                    <Button hidden={(!applicantsSettings)} color="success" onClick={() => handleChangeEmployees()}>Änderungen speichern</Button>
            </Col>
        </Row>
    </>
    )

}

export default FromEditCalendarShift;