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
import { useState } from "react";

export const ModalIntro = (props) => {
    const dispatch = useDispatch();
    const [demoId, setDemoId] = useState(localStorage.getItem('demoId'));

    function goToDemo() {
        var url = window.location.href;
        var path = window.location.pathname;
        var newUrl = url.replace(path, "/shiftplan");
        if(process.env.NODE_ENV !== "development") {    
            ReactGA.event({
                category: 'Demo',
                action: "Continue Shiftplan"
            });
            }
        window.location.href = newUrl + "?id=" + demoId;
    }
    const demoIntro = useSelector(state => state.modal.demoIntro);

    const handleCreateDemo = () => {
        if(process.env.NODE_ENV !== "development") {    
        ReactGA.event({
            category: 'Demo',
            action: "Create Shiftplan"
        });
        }
        dispatch(settingProcessingStartCreateShiftplan())
        dispatch(thunkCreateDemo());
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoIntro}
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
                <div hidden={!demoId}>
                    <Row className="mt-4 text-center">
                        <Col>
                            <Button color="primary"  onClick={() => goToDemo()}>Fortfahren</Button>
                        </Col>
                    </Row>
                </div>
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

