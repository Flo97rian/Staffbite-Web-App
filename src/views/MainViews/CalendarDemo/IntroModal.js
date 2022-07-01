import {
    Button,
    Col,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import ReactGA from "react-ga";
import { thunkCreateDemo } from "../../../store/middleware/CreateDemo";
import { settingProcessingStartCreateShiftplan } from "../../../reducers/demo";

export const ModalIntro = (props) => {
    const dispatch = useDispatch();
    const demoIntro = useSelector(state => state.modal.demoIntro);

    const handleCreateDemo = () => {
        ReactGA.event({
            category: 'Demo',
            action: "Create Shiftplan"
        });
        dispatch(settingProcessingStartCreateShiftplan())
        dispatch(thunkCreateDemo());
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoIntro} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                <Row className="text-center mt-2">
                    <Col>
                        <h2>Willkommen bei Staffbite</h2>
                        <p className="mb-0">
                            Leg gleich los und erstelle deinen ersten Schichtplan. 
                        </p>
                    </Col>
                </Row>
                <Row className="text-center mt-4">
                    <Col>
                        <Button color="primary" onClick={() => handleCreateDemo()}>Schichtplan erstellen</Button>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

