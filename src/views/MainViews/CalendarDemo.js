/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useRef, useEffect} from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import { ReactDOM } from "react";
import isBefore from "date-fns/isBefore";
// JavaScript library that creates a callendar with events
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interaction from "@fullcalendar/interaction";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  Form,
  Input,
  Modal,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Collapse,
  InputGroup,
} from "reactstrap";
// core components

import _, { set } from "lodash";
import store from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { weekdays } from "../../constants/Weekdays";
import { settingModal } from "../../reducers/modal";
import { settingShiftSlot } from "../../reducers/ShiftSlot";
const slotGB = ["bg-success", "bg-info", "bg-light", "bg-light",]
const borderColor = ["border-success", "border-info", "border-light"]

let calendar;

function CalendarDemo(props) {
  const [events, setEvents] = useState([]);
  const [positions, setPositions] = useState([]);
  const [alert, setAlert] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalChange, setModalChange] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [radios, setRadios] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [headerBadge, setHeaderBadge] = useState(null);
  const [adminSignIn, setAdminSignIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bussinessHoursStart, setBussinessHoursStart] = useState("00:00")
  const [eventDescription, setEventDescription] = useState(null);
  // eslint-disable-next-line
  const [event, setEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const calendarRef = useRef(null);
  const dispatch = useDispatch()
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
  const DisplayBasicLayout = useSelector(state => state.display.displayBasicLayout);

  
  useEffect(() => {
  }, [])

  useEffect(() => {}, [headerTitle])

  useEffect(() => {
    if(calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    }
  }, [calendarRef])

  const handleCalendarShiftChanges = () => {
    //const copyShiftplan = new ShiftPlan({...Shiftplan});
    //copyShiftplan.updateCalendarShift(userInput, ShiftSlot, DragAndDropRef);
    //const shiftplan = copyShiftplan.getAllPlanDetails()
    //dispatch(settingShiftplan(shiftplan))
    //dispatch(resettingModal())
  }


  const handleCalendarAddShift = () => {
    //const copyShiftplan = new ShiftPlan({...Shiftplan});
    //copyShiftplan.addCalendarShift(userInput, ShiftSlot);
    //const shiftplan = copyShiftplan.getAllPlanDetails();
    //dispatch(settingShiftplan(shiftplan))
    //dispatch(resettingModal())
  }

  const changeView = (newView) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
  };

  const changeToToday = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek", new Date().toISOString());
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
  };

  const changeToNext = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
  };

  const changeToPrev = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
  };
  const addNewEvent = () => {
    var newEvents = events;
    newEvents.push({
      title: eventTitle,
      start: startDate,
      end: endDate,
      className: radios,
      id: events[events.length - 1] + 1,
    });
    calendar.addEvent({
      title: eventTitle,
      start: startDate,
      end: endDate,
      className: radios,
      id: events[events.length - 1] + 1,
    });
    setModalAdd(false);
    setEvents(newEvents);
    setStartDate(undefined);
    setEndDate(undefined);
    setRadios("bg-info");
    setEventTitle(undefined);
  };
  const changeEvent = () => {
    var newEvents = events.map((prop, key) => {
      if (prop.id + "" === eventId + "") {
        setEvent(undefined);
        calendar.getEventById(eventId).remove();
        let saveNewEvent = {
          ...prop,
          title: eventTitle,
          className: radios,
          description: eventDescription,
        };
        calendar.addEvent(saveNewEvent);
        return {
          ...prop,
          title: eventTitle,
          className: radios,
          description: eventDescription,
        };
      } else {
        return prop;
      }
    });
    setModalChange(false);
    setEvents(newEvents);
    setRadios("bg-info");
    setEventTitle(undefined);
    setEventDescription(undefined);
    setEventId(undefined);
    setEvent(undefined);
  };
  const deleteEventSweetAlert = () => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Bist du dir sicher?"
        onConfirm={() => {
          setAlert(false);
          setRadios("bg-info");
          setEventTitle(undefined);
          setEventDescription(undefined);
          setEventId(undefined);
        }}
        onCancel={() => deleteEvent()}
        confirmBtnCssClass="btn-secondary"
        cancelBtnBsStyle="danger"
        confirmBtnText="Cancel"
        cancelBtnText="Löschen"
        showCancel
        btnSize=""
      >
        Diese Änderung kannst du nicht rückgängig machen!
      </ReactBSAlert>
    );
  };
  const deleteEvent = () => {
    var newEvents = events.filter((prop) => prop.id + "" !== eventId);
    setEvent(undefined);
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="primary"
        confirmBtnText="Ok"
        btnSize=""
      >
        Erfolgreich!
      </ReactBSAlert>
    );
    setModalChange(false);
    setEvents(newEvents);
    setRadios("bg-info");
    setEventTitle(undefined);
    setEventDescription(undefined);
    setEventId(undefined);
    setEvent(undefined);
  };

  const CalendarTitle = () => {
    return (
      <h5 className="h3 mb-0">{headerTitle}</h5>
    )
  }

  const StatusBadge = () => {
    if(headerBadge === "live") {
      return <Badge color="success">Live</Badge>
    }
    return null;
  }

  return (
    <>
      {alert}
      <Container className="mt-8" fluid>
          <Row>
              <Col>
              <Row>
                    <Col>
                        <h3>Informationen</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p onClick={() => setAdminSignIn(!adminSignIn)}>Admin Ansicht <i className={isAdmin ? "fas fa-lock-open" : "fas fa-lock"}></i></p>
                        <Collapse isOpen={adminSignIn}>
                            <Row>
                                <Col xs="9">
                                <InputGroup>
                                    <Input>
                                    </Input>
                                    <InputGroupAddon addonType="append">
                                            <Button 
                                            color="success" 
                                            onClick={
                                                () => {
                                                    setIsAdmin(true);
                                                    setAdminSignIn(!adminSignIn)
                                                }}
                                            >
                                                <i className="fas fa-check text-white"></i>
                                            </Button>
                                    </InputGroupAddon>  
                                    <InputGroupAddon addonType="append">
                                            <Button 
                                            color="danger" 
                                            onClick={
                                                () => {
                                                        setAdminSignIn(!adminSignIn)
                                                }}
                                            >
                                                <i className="fas fa-ban text-white"></i>
                                            </Button>
                                    </InputGroupAddon>  
                                </InputGroup>
                                </Col>
                            </Row>
                        </Collapse>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Schichtplan-Schlüssel <i className="fas fa-copy"></i></p>
                    </Col>
                </Row>
              </Col>
              <Col>
              </Col>
              <Col>
              </Col>
          </Row>
        <Row className="pt-4">
          <div className="col">
            <Card className="card-calendar">
              <CardHeader>
                <Row>
                  <Col>
                    <CalendarTitle />
                  </Col>
                  <Col>
                    <Row className="text-center">
                      <Col>
                        {positions.map((value, index) => {
                          return (
                            <Button
                                key={index}
                                className="btn-neutral"
                                color="link"
                                data-calendar-view="basicDay"
                                size="sm"
                            >
                            {value}
                            </Button>
                          )
                        })}
                        <Button
                          className="btn-neutral"
                          color="link"
                          data-calendar-view="basicDay"
                          size="sm"
                        >
                          Alle
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row className="text-right">
                      <Col>
                          <Button
                          className="btn-neutral"
                          color="link"
                          data-calendar-view="month"
                          onClick={() => changeView("dayGridMonth")}
                          size="sm"
                        >
                          Monat
                        </Button>
                        <Button
                          className="btn-neutral"
                          color="link"
                          data-calendar-view="basicWeek"
                          onClick={() => changeView("timeGridWeek")}
                          size="sm"
                        >
                          Woche
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                        <Row>
                          <Col>
                            <StatusBadge/>
                          </Col>
                        </Row>
                  </Col>
                  <Col>      
                  <Row className="text-right">
                    <Col>
                        <Button color="link" size="sm" onClick={() => changeToToday()}>Heute</Button>
                        <Button color="link" size="sm" onClick={() => changeToPrev()}><i className="fas fa-arrow-left"/></Button>
                        <Button color="link" size="sm" onClick={() => changeToNext()}><i className="fas fa-arrow-right"/></Button>
                    </Col>
                  </Row>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0">
                <Row>
                  <Col>
                  <FullCalendar
                        className="calendar"
                        data-toggle="calendar"
                        id="calendar"
                        ref={calendarRef}
                        plugins={[interaction, dayGridPlugin, timeGridPlugin]}
                        slotDuration="01:00:00"
                        allDaySlot={false}
                        initialView="timeGridWeek"
                        firstDay={1}
                        height="auto"
                        headerToolbar={""}
                        slotMinTime={bussinessHoursStart}
                        eventMaxStack={1}
                        views={{
                          dayGridMonth: { // name of view
                            titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
                            // other view-specific options here
                            dayMaxEventRows: 2,
                            moreLinkText: "weitere"
                          },
                          timeGridWeek: {
                            dayHeaderFormat: {weekday: "long", month: 'long', day: 'numeric'}
                          }
                        }}
                        slotLabelFormat= {{
                            hour: 'numeric',
                            minute: '2-digit',
                            omitZeroMinute: true,
                            meridiem: 'long'
                        }}
                        slotLabelClassNames={["px-3"]}
                        eventResize={(info) => props.updateCalendarShiftTime(info)}
                        eventDrop={(info) => props.updateCalendarShiftTime(info)}
                        selectable={true}
                        editable={true}
                        locale="de"
                        events={events}
                        eventDisplay="block"
                        // Add new event
                        select={(info) => {
                            let calendarApi = calendarRef.current.getApi();
                            if(calendarApi.currentDataManager.state.currentViewType === "dayGridMonth") {
                              calendarApi.changeView("timeGridWeek")
                            } else {
                            let getStartTime = String(info.start.getHours()); 
                            const startTime = getStartTime.length === 1 ? "0" + getStartTime + ":00" : getStartTime + ":00";
                            props.handleAddEventSetStart(startTime)
                            let getDay = info.start.getDay();
                            const day = weekdays[getDay];
                            dispatch(settingShiftSlot({day: day}))
                            dispatch(settingModal("addCalendarShift"))
                            }
                        }}
                        // Edit calendar event action
                        eventClick={({ event }) => {
                        }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CalendarDemo;
