import {
    Button,
    Label
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import SchichtplanErstellen from "./FormCreateShiftplan"
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { createingNewShiftplan } from "../reducers/NewShiftPlan";
import { resettingUserInput } from "../reducers/userInput";
import {settingDisplayNewShiftplan } from "../reducers/display";
import { settingMissingShiftplanName } from "../reducers/ErrorMessages";

const ModalCreateShiftplan = (props) => {
    const dispatch = useDispatch();
    const showSchichtplanErstellen = useSelector(state => state.modal.showSchichtplanErstellen);
    const userInput = useSelector(state => state.userInput);

      // Diese Funktion sorgt für die Speicherung eines neuen Schichtplans und schließt im Anschluss das zugehörige Modal
  const createNewShiftPlan = () => {

    if(userInput.shiftplanName === "") {
        dispatch(settingMissingShiftplanName())
    }

    if(userInput.shiftplanName !== "") {
        dispatch(createingNewShiftplan({closedDays: userInput.shiftplanCompanyIsOpen, shiftsPerDay: userInput.shiftplanNumberOfShifts, shiftplanName: userInput.shiftplanName}))
        dispatch(settingDisplayNewShiftplan());
        dispatch(resettingModal())
    }


  };
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    scrollable={true}
                    className="modal-secondary"
                    show={showSchichtplanErstellen}
                    onHide={() => {
                        dispatch(resettingModal())
                        dispatch(resettingUserInput())
                    }}
            >
                <Modal.Header className="pb-0">
                            <Label className="h2 m-3 align-items-center">Vorlage erstellen</Label>
                </Modal.Header>
                <Modal.Body className="pt-0">
                    <SchichtplanErstellen/>
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                    color="link"
                    size="lg"
                    onClick={() => {
                        dispatch(resettingModal());
                        dispatch(resettingUserInput())
                    }}> Schließen </Button>{' '}
                  <Button color="success" size="lg" onClick={() => createNewShiftPlan()}>Erstellen</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalCreateShiftplan