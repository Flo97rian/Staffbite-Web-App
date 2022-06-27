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
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
} from "reactstrap";
// core components

import _, { set } from "lodash";
import store from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { weekdays } from "../../constants/Weekdays";
import { settingModal } from "../../reducers/modal";
import { settingShiftSlot } from "../../reducers/ShiftSlot";
import { ModalDemoEntry } from "./CalendarDemo/AuthenticationModal";
import { resettingDemoIsSignedIn, settingDemoId, settingDemoPlans } from "../../reducers/demo";
import { thunkFetchDemo } from "../../store/middleware/FetchDemo";
import { ModalInvitation } from "./CalendarDemo/InvitationModal";
import { ModalIntro } from "./CalendarDemo/IntroModal";
import { ModalAddShift } from "./CalendarDemo/ModalAddShift";
import { settingStart } from "../../reducers/DatePicker";
import { thunkUpdateDemo } from "../../store/middleware/UpdateDemo";
import { settingTemporaryEventId } from "../../reducers/temporary";
import { ModalEditShift } from "./CalendarDemo/ModalEditShift";
import { ModalEmployees } from "./CalendarDemo/ModalEmployees";
import { isSameWeek } from "date-fns";
import { de } from "date-fns/locale";
import { ModalApplyForShift } from "./CalendarDemo/ModalApplyForShift";
const slotGB = ["bg-success", "bg-info", "bg-light", "bg-light",]
const borderColor = ["border-success", "border-info", "border-light"]

let calendar;

function CalendarDemo(props) {
  const [positions, setPositions] = useState([]);
  const [alert, setAlert] = useState(null);
  const [showDropdownButtons, setShowDropdownButtons] = useState(false);
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
  const [viewTimeGridWeek, setViewTimeGridWeek] = useState(true);
  const [viewDayGridMonth, setViewDayGridMonth] = useState(false);
  const [bussinessHoursStart, setBussinessHoursStart] = useState("12:00")
  const [eventDescription, setEventDescription] = useState(null);
  const isAdmin = useSelector(state => state.demo.demoAdmin?.isAdmin);
  const isEmployee = useSelector(state => state.demo.demoEmployee.isEmployee);
  const isSignedIn = useSelector(state => state.demo.demoSignedIn);
  const employee = useSelector(state => state.demo.demoEmployee);
  const events = useSelector(state => state.demo.demoPlans);
  const EventsChanged = useSelector(state => state.ShiftplanChanged.shiftplanChanged);
  // eslint-disable-next-line
  const [event, setEvent] = useState(null);
  const calendarRef = useRef(null);
  const dispatch = useDispatch()


  
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if("id" in params) {
      dispatch(settingModal("demoEntry"))
      dispatch(settingDemoId(params.id));
      dispatch(thunkFetchDemo(params.id));
    }
    if("id" in params && "invitation" in params) {
      dispatch(settingModal("demoInvitation"))
      dispatch(settingDemoId(params.id));
      dispatch(thunkFetchDemo(params.id));
    }
    if(!Object.keys(params).length) {
      dispatch(settingModal("demoIntro"))
    }
  }, [])

  useEffect(() => {}, [headerTitle])

  useEffect(() => {
    if(EventsChanged) {
      dispatch(thunkUpdateDemo());
    }
  }, [EventsChanged])

  

  useEffect(() => {
    if(calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    }
  }, [calendarRef])


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

  const CalendarTitle = () => {
    return (
      <h5 className="h3 mb-0">{headerTitle}</h5>
    )
  }

  const StatusBadge = () => {
    if(calendarRef.current && isAdmin) {
      let calendarApi = calendarRef.current.getApi();
      let currentDate = calendarApi.getDate();
      const currentWeeksEvent = events.find(event => isSameWeek(new Date(event.start), new Date(currentDate), {locale: de, weekStartsOn: 1}));
      if(currentWeeksEvent && currentWeeksEvent.showEmployee) {
        return (
          <UncontrolledButtonDropdown className="m-0 p-0">
            <DropdownToggle caret className="badge p-0 " color="link">
              <small> <i className="fas fa-eye"></i>{" "}Für Alle einsehbar</small>
            </DropdownToggle>
            <DropdownMenu className="m-0 p-0">
              <DropdownItem className="badge bg-link" onClick={() => setShowEventsToEmployees(false)}>
                <small> <i className="fas fa-eye"></i>{" "}Für Planer einsehbar</small>
              </DropdownItem>
            </DropdownMenu>
            </UncontrolledButtonDropdown>
          )
      }
      if(currentWeeksEvent) {
        return (
          <UncontrolledButtonDropdown className="m-0 p-0">
            <DropdownToggle caret className="badge p-0 " color="link">
              <small> <i className="fas fa-eye"></i>{" "}Für Planer einsehbar</small>
            </DropdownToggle>
            <DropdownMenu className="m-0 p-0">
              <DropdownItem className="badge bg-link"  onClick={() => setShowEventsToEmployees(true)}>
                <small> <i className="fas fa-eye"></i>{" "}Für Alle einsehbar</small>
              </DropdownItem>
            </DropdownMenu>
            </UncontrolledButtonDropdown>
            )
      }
      
    }
    return null;
  }

  const setShowEventsToEmployees = (show) => {
    let calendarApi = calendarRef.current.getApi();
    let currentDate = calendarApi.getDate();
    const newEvents = events.map(event => {
        const {title, end, start} = event;
        
        let startTime = new Date(start);
        let endTime = new Date(end);

    const currentDayIsSameWeek = isSameWeek(new Date(event.start), new Date(currentDate), {locale: de, weekStartsOn: 1});
    if(currentDayIsSameWeek) {
        return {
          ...event,
          title, 
          start: startTime.toString(),
          end: endTime.toString(), 
          showEmployee: show,
        }
    }
    if(!currentDayIsSameWeek) {
      return {
        ...event,
        title, 
        start: startTime.toString(),
        end: endTime.toString(), 
      }
    }
  })
  dispatch(settingDemoPlans(newEvents));
  };

  const formatEvents = () => {
      return events.map(event => {
                const {title, end, start} = event;
    
                let startTime = new Date(start)
                let endTime = new Date(end)
    
                return {
                  title, 
                  start: startTime,
                  end: endTime, 
                  extendedProps: {...event}
                }
            })
    }

  const renderEventContent = (eventInfo) => {
    if(isAdmin) {
    return (
      <Row className="p-1">
          <Col>
           <b>{" "}{eventInfo.timeText}{" "}Uhr</b>
           <br/>
           <br/>
           <b>{eventInfo.event.title}</b>
           <br/>
           <b><i className="fas fa-user-clock"></i>{" "}{Object.keys(eventInfo.event.extendedProps.applicants).length} Bewerber</b>
           <br/>
           <b><i className="fas fa-users"></i>{" "}{Object.keys(eventInfo.event.extendedProps.setApplicants).length + "/" + eventInfo.event.extendedProps.NumberOfEmployees} Mitarbeiter</b>
         </Col>
      </Row>
    )
  }
  if(isEmployee) {
    const applyed = eventInfo.event.extendedProps.applicants[employee.id]
    const isSetInShift = eventInfo.event.extendedProps.setApplicants[employee.id]
    return (
      <Row className="p-1">
          <Col>
           <b>{" "}{eventInfo.timeText}{" "}Uhr</b>
           <br/>
           <br/>
           <b>{eventInfo.event.title}</b>
           <br/>
           <b hidden={!applyed}><i className="fas fa-user-clock"></i>{" "}Beworben</b>
           <br/>
           <b hidden={!isSetInShift}><i className="fas fa-users"></i>{" "}Du bist eingetragen</b>
         </Col>
      </Row>
    )
  }
  return null;
};
  return (
    <>
      {alert}
      <Container className="mt-4" fluid>
          <Row className="text-center mb-4">
              <Col>
                <h3>{isAdmin ? "Planer Ansicht" : "Mitarbeiter Ansicht"}</h3>
              </Col>
          </Row>
            <Row className="text-right">
              <Col>
                <UncontrolledButtonDropdown>
                  <DropdownToggle caret color="primary">
                    Aktionen
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem hidden={!isAdmin} onClick={() => dispatch(settingModal("demoEmployees"))}>
                      Team anzeigen
                    </DropdownItem>
                    <DropdownItem hidden={!isAdmin} onClick={() => dispatch(settingModal("demoInvitation"))}>
                      Einladungslink
                    </DropdownItem>
                    <DropdownItem hidden={!isAdmin} onClick={() => dispatch(settingModal("demoInvitation"))}>
                      Mein Profil
                    </DropdownItem>
                    <DropdownItem hidden={!isSignedIn} onClick={() => dispatch(resettingDemoIsSignedIn())}>
                      Abmelden
                    </DropdownItem>
                    <DropdownItem hidden={isSignedIn} onClick={() => dispatch(settingModal("demoEntry"))}>
                      Anmelden
                    </DropdownItem>
                  </DropdownMenu>
                    </UncontrolledButtonDropdown>
              </Col>
        </Row>
        <Row className="pt-2">
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
                        slotDuration="00:30:00"
                        events={formatEvents()}
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
                        eventContent={renderEventContent}
                        selectable={true}
                        editable={true}
                        locale="de"
                        eventDisplay="block"
                        // Add new event
                        select={(info) => {
                          if (viewTimeGridWeek && isAdmin) {
                            let getDay = info.start.getDay();
                            const day = weekdays[getDay];
                            dispatch(settingStart(info.start.toString()));
                            dispatch(settingShiftSlot({day: day}))
                            dispatch(settingModal("demoAddShift"))
                          }
                          if(viewDayGridMonth) {
                            changeView("timeGridWeek");
                          }

                        }}
                        // Edit calendar event action
                        eventClick={({ event }) => {
                          if (viewTimeGridWeek && isAdmin) {
                            dispatch(settingTemporaryEventId(event._def.extendedProps.id))
                            dispatch(settingModal("demoEditShift"))
                          }

                          if(viewTimeGridWeek && isEmployee) {
                            dispatch(settingTemporaryEventId(event._def.extendedProps.id));
                            dispatch(settingModal("demoApplyForShift"));
                          }
                        }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
      <ModalDemoEntry />
      <ModalInvitation />
      <ModalIntro />
      <ModalAddShift />
      <ModalEditShift />
      <ModalEmployees />
      <ModalApplyForShift />
    </>
  );
}

export default CalendarDemo;
