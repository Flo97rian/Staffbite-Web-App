import {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import { deleteEmployee, resettingCouterForEmployees, settingApplicationsCounterForEmployee, settingShiftsCounterForEmployee } from "../../../reducers/demo";
import { isSameWeek } from "date-fns";
import { de } from "date-fns/locale";

export const ModalEmployees = (props) => {
    const dispatch = useDispatch();
    const Employees = useSelector(state => state.demo.demoEmployees);
    const demoEmployees = useSelector(state => state.modal.demoEmployees);
    const events = useSelector(state => state.demo.demoPlans);
    const [currentWeeksEvents, setCurrentWeeksEvents] = useState([]);

    useEffect(() => {
        if(props.calendarRef) {
            //getCurrentWeeksEvents();
    }
    }, [demoEmployees])

    useEffect(() => {
            setEmployeesWeekDetails()
    }, [currentWeeksEvents])

    function getCurrentWeeksEvents() {
        let calendarApi = props.calendarRef.getApi();
        let currentDate = calendarApi.getDate()
        let currentWeeksEvents = events.filter(event => isSameWeek(new Date(event.start), new Date(currentDate), {locale: de, weekStartsOn: 1}));
        setCurrentWeeksEvents(currentWeeksEvents);
    }

    function handleSetApplicationsForEmployees(event) {
        Object.keys(event.applicants).forEach(applicant => {
            setApplicationsInEmployee(applicant);
        });
    }

    function handleSetShiftsForEmployees(event) {
        Object.keys(event.setApplicants).forEach(applicant => {
            setShiftsInEmployee(applicant);
        });
    }
    function setApplicationsInEmployee(applicant) {
        dispatch(settingApplicationsCounterForEmployee(applicant))
    }

    function setShiftsInEmployee(applicant) {
        dispatch(settingShiftsCounterForEmployee(applicant))
    }

    function setEmployeesWeekDetails () {
        currentWeeksEvents.forEach(event => {
            handleSetApplicationsForEmployees(event)
            handleSetShiftsForEmployees(event);
          
        })
    }
    const handleCloseModal = () => {
        dispatch(resettingCouterForEmployees());
        dispatch(resettingModal())
        
    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoEmployees} onHide={() => handleCloseModal()}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Dein Team</h2>
                                    </Col>
                                </Row>
                                <Row className="mx-2">
                                    <Col>
                                        <p className="m-0 p-0 ">
                                            <Row>
                                                <Col xs="3">
                                                    Name:
                                                </Col>
                                                <Col>
                                                    
                                                </Col>
                                                <Col>
                                                    
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Row>
                                        </p>
                                        </Col>
                                    </Row>
                                <Card>
                                    <p>
                                    {Employees.length ? Employees.map(employee => {
                                        return (
                                            <Row className="m-2">
                                                <Col xs="3">
                                                    {employee.name}
                                                </Col>
                                                <Col>
                                                </Col>
                                                <Col>
                                                </Col>
                                                <Col>
                                                    <Row className="text-right">
                                                        <Col>
                                                            <Button size="sm"color="danger" onClick={() => dispatch(deleteEmployee(employee.id))}>Löschen</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>            
                                        )
                                    })
                                    :
                                    <></>
                                    }
                                    </p>
                                </Card>
                </Modal.Body>
                <Modal.Footer>
                                <Button color="link" onClick={() => handleCloseModal()}>Schließen</Button>
                </Modal.Footer>
            </Modal>
            </>
        );
}


