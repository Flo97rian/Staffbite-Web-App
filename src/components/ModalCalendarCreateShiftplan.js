import React, {useState}  from "react";
import {
    Button,
    Col,
    Label,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtplanErstellen from "./FormCreateShiftplan"
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { createingNewShiftplan, createingNewShiftplanFromExistingShiftplan, createingNewShiftplanInCalendar, createNewShiftplan, settingNewShiftplan } from "../reducers/NewShiftPlan";
import { resettingUserInput } from "../reducers/userInput";
import {settingDisplayNewShiftplan } from "../reducers/display";
import { settingMissingShiftplanName } from "../reducers/ErrorMessages";
import FormCalendarImportVorlage from "./FormCalendarImportVorlage";
import FormCalendarCreateShiftplan from "./FormCalendarCreateShiftplan";
import { settingProcessingStartCreateShiftplan } from "../reducers/processing";
import { resettingShiftSlot } from "../reducers/ShiftSlot";
import { resettingDatePicker } from "../reducers/DatePicker";
import format from "date-fns/format";
import { de } from "date-fns/locale";

const ModalCalendarCreateShiftplan = (props) => {
    const dispatch = useDispatch();
    const hasPlans = useSelector(state => state.DB.plans.length > 0);
    const [showImportVorlage, setShowImportVorlage] = useState(false);
    const [showNewVorlage, setShowNewVorlage] = useState(!hasPlans);
    const [showNewOptions, setShowNewOptions] = useState(hasPlans);
    const showCalendarCreateShiftplan = useSelector(state => state.modal.showCalendarCreateShiftplan);
    const userInput = useSelector(state => state.userInput);
    const TemporaryShiftplanId = useSelector(state => state.temporary.shiftplanId);
    const day = useSelector(state => state.shiftSlot.day);
    const Plans = useSelector(state => state.DB.plans);
    const [vorlagen, setVorlagen] = useState([...Plans.filter(plan => plan.id.split('#').includes("Veröffentlicht")), ...Plans.filter(plan => plan.id.split('#').includes("Entwurf"))]);
    const Dates = useSelector(state => state.date);

      // Diese Funktion sorgt für die Speicherung eines neuen Schichtplans und schließt im Anschluss das zugehörige Modal
  const createNewShiftPlan = () => {
    if(showImportVorlage && TemporaryShiftplanId) {
        const targetShiftplan = Plans[Plans.findIndex(shiftplan => shiftplan.id === TemporaryShiftplanId)]; 
        dispatch(createingNewShiftplanFromExistingShiftplan({existingShiftplan: targetShiftplan, newStartDate: Dates.start, newEndDate: Dates.end}))
        dispatch(resettingModal());
        dispatch(settingProcessingStartCreateShiftplan());
        dispatch(resettingDatePicker())
    }

    if(showNewVorlage) {
        let shiftplanName = userInput.shiftplanName;
        if(!shiftplanName.length) {
            let startDate = new Date(Dates.start);
            let endDate = new Date(Dates.end);
            let startOfWeek = startDate.getDate();
            let endOfWeek = endDate.getDate();
            let startMonthOfWeek = format(endDate, "MMM", {locale: de, weekStartsOn: 1});
            let endMonthOfWeek = format(endDate, "MMM", {locale: de, weekStartsOn: 1});
            shiftplanName = startOfWeek + '. ' + startMonthOfWeek + ' - ' + endOfWeek + '. ' + endMonthOfWeek;  
        }
        dispatch(createingNewShiftplanInCalendar({userInput: {...userInput, shiftplanName: shiftplanName}, newStartDate: Dates.start, newEndDate: Dates.end, day: day}));
        dispatch(resettingModal());
        dispatch(settingProcessingStartCreateShiftplan());
        dispatch(resettingShiftSlot());
        dispatch(resettingDatePicker())
    }
    if(userInput.shiftplanName === "") {
        //dispatch(settingMissingShiftplanName())
    }

    if(userInput.shiftplanName !== "") {
        //dispatch(createingNewShiftplan({closedDays: userInput.shiftplanCompanyIsOpen, shiftsPerDay: userInput.shiftplanNumberOfShifts, shiftplanName: userInput.shiftplanName}))
        //dispatch(settingDisplayNewShiftplan());
        //dispatch(resettingModal())
    }


  };
        return (
            <Modal 
                    size={showImportVorlage ? "xl" : "lg"}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    className="modal-secondary"
                    show={showCalendarCreateShiftplan}
                    onHide={() => {
                        dispatch(resettingModal())
                        dispatch(resettingUserInput())
                    }}
            >
                <Label className="h2 m-3 text-center">Schichtplan erstellen</Label>
                <Modal.Body className="pt-0">
                    <div hidden={!showNewOptions}>
                        <Row className="text-center">
                            <Col>
                                <p>Wähle eine vorhandene Vorlage oder erstelle einen neuen Plan</p>
                            </Col>
                        </Row>
                        {vorlagen.length > 0 ? 
                        <Row className="text-center m-2">
                            <Col>
                                <Button
                                color="success"
                                onClick={() => {
                                    setShowImportVorlage(true);
                                    setShowNewOptions(false);
                                }}
                                >
                                    Vorlage verwenden
                                </Button>
                            </Col>
                        </Row>
                        : 
                        <></>
                        }
                        <Row className="text-center m-2">
                            <Col>
                                <Button
                                color="link"
                                onClick={() => {
                                    setShowNewVorlage(true)
                                    setShowNewOptions(false);
                                }}
                                >
                                   Ohne Vorlage fortfahren 
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div hidden={!showImportVorlage}>
                    {vorlagen.length > 0 ? <FormCalendarImportVorlage /> : <></> }
                    </div>
                    <div hidden={!showNewVorlage}>
                    <FormCalendarCreateShiftplan />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                    color="link"
                    size="lg"
                    onClick={() => {
                        dispatch(resettingModal());
                        dispatch(resettingUserInput())
                    }}> Schließen </Button>{' '}
                  <Button hidden={showNewOptions} color="success" size="lg" onClick={() => createNewShiftPlan()}>{showImportVorlage ? "Vorlage verwenden" : "Erstellen"}</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalCalendarCreateShiftplan