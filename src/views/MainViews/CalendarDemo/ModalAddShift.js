import {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Collapse,
    Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../../../reducers/modal";
import { settingDemoPlans } from "../../../reducers/demo";
import ReactGA from "react-ga";
import InputTimeWithSwitch from "../../../components/InputTimeWithSwitch";
import InfoLabel from "../../../components/InfoLabel";
import { INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES, INFO_SHIFTPLAN_SHIFT_START } from "../../../constants/InfoTexts";
import { settingShiftplanChanged } from "../../../reducers/shiftplanChanged";
import { weekdays } from "../../../constants/Weekdays";
import { eachDayOfInterval, endOfWeek, getDay, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import catchAnalyticsEvent from "./DemoAnalytics";

export const ModalAddShift = (props) => {
    const dispatch = useDispatch();
    const [userForm, setUserForm] = useState({ShiftName: "", NumberOfEmployees: 0, ShiftStart: "", ShiftEnd: "", ShiftDate: "", customDays: []})
    const plans = useSelector(state => state.demo.demoPlans);
    const date = useSelector(state => state.date);
    const demoAddShift = useSelector(state => state.modal.demoAddShift);

    useEffect(() => {
        if(demoAddShift) {
            let weekday = weekdays[getDay(new Date(date.start)) - 1];
            setUserForm({...userForm, customDays: [...userForm.customDays, weekday]})
            
        }
    }, [demoAddShift])

    const handleEditCustomDays = (weekday) => {
        if(userForm.customDays.includes(weekday)) {
            setUserForm({...userForm, customDays: [...userForm.customDays.filter(day => day !== weekday)]})
        }

        if(!(userForm.customDays.includes(weekday))) {
            setUserForm({...userForm, customDays: [...userForm.customDays, weekday]});
        }

    }
    const addShift = () => {
        let startOfCurrentWeek;
        let endOfCurrentWeek; 
        if(props.isListView) {
            console.log(userForm.ShiftDate)
            console.log(new Date(userForm.ShiftDate));
            startOfCurrentWeek = startOfWeek(new Date(userForm.ShiftDate), {locale: de, weekStartsOn: 1});
            endOfCurrentWeek = endOfWeek(new Date(userForm.ShiftDate), {locale: de, weekStartsOn: 1});
        }
        if(!props.isListView) {
            startOfCurrentWeek = startOfWeek(new Date(date.start), {locale: de, weekStartsOn: 1}); 
            endOfCurrentWeek = endOfWeek(new Date(date.start), {locale: de, weekStartsOn: 1});   
        }
        console.log(startOfCurrentWeek);
        console.log(endOfCurrentWeek);
        const datesOfWeekDays = eachDayOfInterval({start: startOfCurrentWeek, end: endOfCurrentWeek});
        console.log(datesOfWeekDays);
        console.log(userForm);
        let newShifts = [];
        userForm.customDays.forEach((day, index) => {
            let dayIndex = weekdays.indexOf(day);
            let start = new Date(datesOfWeekDays[dayIndex]);
            let end = new Date(datesOfWeekDays[dayIndex]);
            start.setHours(userForm.ShiftStart.split(":")[0])
            start.setMinutes(userForm.ShiftStart.split(":")[1])
            end.setHours(userForm.ShiftEnd.split(":")[0])
            end.setMinutes(userForm.ShiftEnd.split(":")[1])
            let data = {
                id: plans.length + index,
                title: userForm.ShiftName,
                start: start.toString(),
                end: end.toString(),
                display: "block",
                description: "Moin",
                NumberOfEmployees: userForm.NumberOfEmployees,
                backgroundColor: "#fb6340",
                borderColor: "#fb6340",
                textColor: "dark",
                notice: "",
                applicants: {},
                setApplicants: {},
                applicantsAfterPublish: {},
            }
            newShifts.push(data);
        })
        catchAnalyticsEvent()
        dispatch(settingDemoPlans([...plans, ...newShifts]))
        dispatch(settingShiftplanChanged());
        props.updateStepIndex(true)
        dispatch(resettingModal());

    }
      //Diese Funktion sorgt für das Kennzeichnen einer Prioschicht im jeweiligen Schichtplan
        return (
            <>
            <Modal 
                    size="lg"
                    centered
                    show={demoAddShift} onHide={() => dispatch(resettingModal())}
                    className="modal modal-secondary"
            >
                <Modal.Body className="pt-1">
                                <Row className="text-center mt-2">
                                    <Col>
                                        <h2>Schicht erstellen</h2>
                                       {!plans.length ? <p>Erstelle deine erste Schicht</p> : <></> }
                                    </Col>
                                </Row>
                                <Card className="bg-secondary px-2 shadow-none border-none">
                                <Row className="mt-3">
                                    <Col>
                                        <InfoLabel description={INFO_SHIFTPLAN_SHIFT_NAME} title="Name der Schicht"/>
                                        <Input type="text" name="ShiftName" onChange={(event) => setUserForm({...userForm, ShiftName: event.target.value})}></Input>
                                        <Row className="mt-2">
                                            <Col>
                                            <InfoLabel info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} title="Anzahl benötigter Mitarbeiter"/>
                                                <Input type="number" placeholder="" min="0" name="anzahl" onChange={(event) => setUserForm({...userForm, NumberOfEmployees: event.target.value})}></Input>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col xs="12" md="6">
                                                <InfoLabel title="Beginn" description={INFO_SHIFTPLAN_SHIFT_START}></InfoLabel>
                                                <Input hidden={!props.isListView} type="date" className=" edit-event--description input-autosize form-control" name="beginn" defaultValue="" onChange={(event) => setUserForm({...userForm, ShiftDate: event.target.value})}></Input>
                                                <Input type="time" className=" edit-event--description input-autosize form-control" name="beginn" defaultValue="" onChange={(event) => setUserForm({...userForm, ShiftStart: event.target.value})}></Input>
                                            </Col>
                                            <Col xs="12" md="6">
                                                <InputTimeWithSwitch info={true} placeholder="" description={INFO_SHIFTPLAN_SHIFT_END} label="Ende" name="ende" onChange={(event) => setUserForm({...userForm, ShiftEnd: event.target.value})}></InputTimeWithSwitch>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InfoLabel title={"Wiederholen am"}/>
                                                <Row>
                                                    <Col>
                                                        <div className="m-2">
                                                        <Pagination>
                                                            {weekdays.map((weekday, index) => {
                                                                return (
                                                                    <PaginationItem key={index} active={userForm.customDays.includes(weekday) ? true: false}>
                                                                        <PaginationLink onClick={() => handleEditCustomDays(weekday)}>
                                                                            {weekday.substring(0, 2)}
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                )
                                                            })}
                                                        </Pagination>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                            <Row className="text-right">
                                <Col>
                                    <Button color="link" onClick={() => dispatch(resettingModal())}>
                                        Schließen
                                    </Button>
                                    <Button color="success" onClick={() => addShift()}>
                                        Schicht erstellen
                                    </Button>
                                </Col>
                            </Row>
                </Modal.Body>
            </Modal>
            </>
        );
    }

