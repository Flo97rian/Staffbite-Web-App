import {useState} from "react";
import {
    Button,
    Col,
    Input,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import ReactGA from "react-ga";

export const ModalSendFeedback = (props) => {
    const dispatch = useDispatch();
    const [feedbackText, setFeedbackText] = useState("");
    const demoSendFeedback = useSelector(state => state.modal.demoSendFeedback);

    function GAFeedback(type) {
        ReactGA.event({
              category: 'Feedback',
              action: type
        })
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoSendFeedback} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Dein Feedback</h2>
                                        <p>
                                            Dir fehlt eine oder mehrere Funktionen, damit Staffbite perfekt für dich passt?
                                            <br/>
                                            Wähle die jeweiligen Felder aus oder schreibe uns eine Nachricht.
                                            <br/>
                                            Mir fehlt ...
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mx-3 mt-3">
                                    <Col className="ml-4">
                                        <p className="">
                                            <Row>
                                                <Col>
                                                    <Input type="checkbox" value="Mitarbeiter App" onChange={(event) => event.target.checked ? GAFeedback("Mitarbeiter App"): null}></Input>eine Mitarbeiter App
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Urlaubsplaner" onChange={(event) => event.target.checked ? GAFeedback("Urlaubsplaner"): null}></Input>ein Urlaubsplaner
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Stundenkonten" onChange={(event) => event.target.checked ? GAFeedback("Stundenkonten"): null}></Input>ein Stundenkonto
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Input type="checkbox" value="Reporting" onChange={(event) => event.target.checked ? GAFeedback("Reporting"): null}></Input>ein Reporting
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Druckfunktion" onChange={(event) => event.target.checked ? GAFeedback("Druckfunktion"): null}></Input>eine Druckfunktion
                                                </Col>
                                                <Col>
                                                    <Input type="checkbox" value="Zeiterfassung" onChange={(event) => event.target.checked ? GAFeedback("Zeiterfassung"): null}></Input>eine Zeiterfassung
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Input type="checkbox" value="Automatisierter Schichtplan" onChange={(event) => event.target.checked ? GAFeedback("Automatisierter Schichtplan"): null}></Input>eine automatisierte Schichtplanung
                                                </Col>
                                                <Col>
                                                    
                                                </Col>
                                            </Row>
                                            <Row className="mt-4 ml--5">
                                                <Col>
                                                    <Input type="textarea" placeholder="Schreib uns gerne eine Nachricht!" onChange={(event) => event.target.value}></Input>
                                                </Col>
                                            </Row>
                                        </p>
                                        </Col>
                                    </Row>
                </Modal.Body>
                <Modal.Footer>
                                <Button color="link" onClick={() => dispatch(resettingModal())}>Schließen</Button>
                                <Button color="success" onClick={() => {
                                    GAFeedback(feedbackText);
                                    dispatch(resettingModal())
                                    }}>Abschicken</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
}


