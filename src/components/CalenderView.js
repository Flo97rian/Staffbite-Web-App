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
  Form,
  Input,
  Modal,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
} from "reactstrap";
// core components

import {events as eventsVariables} from "./CalenderVariables"
import _, { set } from "lodash";
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { weekdays } from "../constants/Weekdays";
import { settingShift, settingShiftRow, settingWeekday } from "../reducers/ShiftDetails";
const slotGB = ["bg-success", "bg-info", "bg-light", "bg-light",]
const borderColor = ["border-success", "border-info", "border-light"]

let calendar;

function CalendarView(props) {
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
  const [bussinessHoursStart, setBussinessHoursStart] = useState("00:00")
  const [eventDescription, setEventDescription] = useState(null);
  // eslint-disable-next-line
  const [event, setEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const calendarRef = useRef(null);
  const dispatch = useDispatch()
  const shiftplan = useSelector(state => state.Shiftplan)

  
  useEffect(() => {
    setEventsData();
    getPositions();
    //getEarlyestShiftStart()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setEventsData();
    getPositions();
    //getEarlyestShiftStart()
    // eslint-disable-next-line
  }, [shiftplan])

    const getEarlyestShiftStart = () => {
      const plan = _.get(shiftplan, "plan", [])
      let currentEarlyestStartSplit = bussinessHoursStart.split(':')
      let currentEarlyestStart = bussinessHoursStart
      _.forEach(plan, function (row, rowIndex) {
          let shiftStart = _.get(row, "Wochentag.ShiftStart", "")
          if(!_.isEmpty(shiftStart)) {
              let targetsShiftStart = shiftStart.split(':')
              if (isBefore(new Date(2020, 1, 1, targetsShiftStart[0], targetsShiftStart[1]), new Date(2020, 1, 1, currentEarlyestStartSplit[0], currentEarlyestStartSplit[1]))) {
                  let updatedStartHour = String(Number(targetsShiftStart[0]) - 2 < 0 ? 0 : Number(targetsShiftStart[0]) - 2)
                  currentEarlyestStart = updatedStartHour + ":" + targetsShiftStart[1];
                  currentEarlyestStartSplit = currentEarlyestStart.split(':')
              }
          }
      })
      setBussinessHoursStart(currentEarlyestStart);
    }

    const getPositions = () => {
        let positions = [];
        const plan = _.get(shiftplan, "plan", [])
        _.forEach(plan, function (row, rowIndex) {
            const position = _.get(row, "Wochentag.ShiftPosition", "")
            if(!_.isEmpty(position)) {
                if (!_.includes(positions, position)) {
                    positions.push(position);
                }
            }
        })
        setPositions(positions);
    };

    const setEventsData = (filter = !1) => {
        let eventsData = [];
        const plan = _.get(shiftplan, "plan", [])
        let index = 0
        _.forEach(plan, function (row, rowIndex) {
            if (filter === false || row.Wochentag.ShiftPosition === filter) {
                _.forIn(row, function (value, key, row) {
                    if(_.isObject(value) && key !== "Wochentag" && value.frei !== false) {
                        const splittedDate = plan[0][key].split(".");
                        const splittedStartTime = row.Wochentag.ShiftStart.split(":");
                        const splttedEndTime = _.isBoolean(row.Wochentag.ShiftEnd) ? ("24:00").split(":") : row.Wochentag.ShiftEnd.split(":")
                        const startTime = new Date(splittedDate[2], Number(splittedDate[1]) - 1, splittedDate[0], splittedStartTime[0], splittedStartTime[1])
                        const endTime = new Date(splittedDate[2], Number(splittedDate[1] - 1), splittedDate[0], splttedEndTime[0], splttedEndTime[1])
                        let background = "";
                        const setApplicantsLenght = _.size(_.get(value, "setApplicants", {}))
                        if(setApplicantsLenght === value.anzahl)
                          background = "#2dce89";
                        if(setApplicantsLenght > value.anzahl)
                          background = "#f5365c";
                        if(setApplicantsLenght < value.anzahl)
                          background = "#fb6340"
                        eventsData.push({
                            id: index,
                            title: row.Wochentag.ShiftName,
                            start: startTime,
                            end: endTime,
                            filling: _.size(_.get(value, "setApplicants", {})) + "/" + value.anzahl + " Mitarbeiter",
                            description: "gello",
                            display: "block",
                            backgroundColor: background,
                            borderColor: background,
                            textColor: "dark",
                            notice: _.get(value, "notice", ""),
                            applicants: _.get(value, "applicants", {}),
                            setApplicants: _.get(value, "setApplicants", {}),
                            row: rowIndex,
                            day: key
                    })
                    index +=1
                    }
                })
            }
        });
        setEvents(eventsData);
    }
  const changeView = (newView) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
  };

  const changeToToday = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek", new Date().toISOString());
  };

  const changeToNext = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const changeToPrev = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
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
  const renderEventContent = (eventInfo) => {
    if(_.isObject(shiftplan)) {
      const Shift = _.get(shiftplan, "plan[" + eventInfo.event.extendedProps.row + "][" + eventInfo.event.extendedProps.day + "]")
      return (
        <Row className="p-1">
            <Col>
             <b>{eventInfo.timeText}{" "}<i hidden={_.isEmpty(_.get(Shift, "notice", ""))} className="fas fa-paperclip ml-2"></i></b>
             <br/>
             <b>{eventInfo.event.title}</b>
             <br/>
             <b>{eventInfo.event.extendedProps.filling}</b>
           </Col>
        </Row>
    )
    }
    return (
        <Row className="m-2">
            <Col>
             <b>{eventInfo.timeText}</b>
             <br/>
             <b>{eventInfo.event.extendedProps.filling}</b>
             <br/>
             <b>{eventInfo.event.title}</b>
           </Col>
        </Row>
    )
};
  if(_.isEmpty(shiftplan.id)) return null
  return (
    <>
      {alert}
      <Container className="mt-6" fluid>
        <Row>
          <div className="col">
            <Card className="card-calendar">
              <CardHeader>
                <Row>
                  <Col>
                    <h5 className="h3 mb-0">Frühling 8. Mai - 15.Mai</h5>
                  </Col>
                  <Col>
                    <Row className="text-center">
                      <Col>
                        {positions.map(value => {
                          return (
                            <Button
                                className="btn-neutral"
                                color="link"
                                data-calendar-view="basicDay"
                                onClick={() => setEventsData(value)}
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
                          onClick={() => setEventsData(!1)}
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
                            <Badge color="success">Live</Badge>
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
                        eventContent={renderEventContent}
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
                            store.dispatch({type: "setShiftSlot", payload: { col: day}});
                            store.dispatch({type: "OPEN", payload: "addCalendarShift"});
                            }
                        }}
                        // Edit calendar event action
                        eventClick={({ event }) => {
                            let calendarApi = calendarRef.current.getApi();
                            if(calendarApi.currentDataManager.state.currentViewType === "dayGridMonth") {
                              calendarApi.changeView("timeGridWeek")
                            } else {
                            dispatch(settingShift(shiftplan.plan[event.extendedProps.row][event.extendedProps.day]))
                            dispatch(settingShiftRow(shiftplan.plan[event.extendedProps.row]))
                            dispatch(settingWeekday(shiftplan.plan[event.extendedProps.row].Wochentag))
                            store.dispatch({type: "setShiftSlot", payload: { row: event.extendedProps.row, col: event.extendedProps.day}});
                            store.dispatch({type: "OPEN", payload: "editCalendarShift"});
                            }
                        }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Modal
              isOpen={modalAdd}
              toggle={() => setModalAdd(false)}
              className="modal-dialog-centered modal-secondary"
            >
              <div className="modal-body">
                <form className="new-event--form">
                  <FormGroup>
                    <label className="form-control-label">Schicht hinzufügen</label>
                    <Input
                      className="form-control-alternative new-event--title"
                      placeholder="Event Title"
                      type="text"
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <label className="form-control-label d-block mb-3">
                      Status color
                    </label>
                    <ButtonGroup
                      className="btn-group-toggle btn-group-colors event-tag"
                      data-toggle="buttons"
                    >
                      <Button
                        className={classnames("bg-info", {
                          active: radios === "bg-info",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-info")}
                      />
                      <Button
                        className={classnames("bg-warning", {
                          active: radios === "bg-warning",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-warning")}
                      />
                      <Button
                        className={classnames("bg-danger", {
                          active: radios === "bg-danger",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-danger")}
                      />
                      <Button
                        className={classnames("bg-success", {
                          active: radios === "bg-success",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-success")}
                      />
                      <Button
                        className={classnames("bg-default", {
                          active: radios === "bg-default",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-default")}
                      />
                      <Button
                        className={classnames("bg-primary", {
                          active: radios === "bg-primary",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-primary")}
                      />
                    </ButtonGroup>
                  </FormGroup>
                </form>
              </div>
              <div className="modal-footer">
                <Button
                  className="new-event--add"
                  color="primary"
                  type="button"
                  onClick={addNewEvent}
                >
                  Schicht hinzufügen
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  type="button"
                  onClick={() => setModalAdd(false)}
                >
                  Close
                </Button>
              </div>
            </Modal>
            <Modal
              isOpen={modalChange}
              toggle={() => setModalChange(false)}
              className="modal-dialog-centered modal-secondary"
            >
              <div className="modal-body">
                <Form className="edit-event--form">
                  <FormGroup>
                    <label className="form-control-label">Event title</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Event Title"
                      type="text"
                      defaultValue={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label d-block mb-3">
                      Status color
                    </label>
                    <ButtonGroup
                      className="btn-group-toggle btn-group-colors event-tag mb-0"
                      data-toggle="buttons"
                    >
                      <Button
                        className={classnames("bg-info", {
                          active: radios === "bg-info",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-info")}
                      />
                      <Button
                        className={classnames("bg-warning", {
                          active: radios === "bg-warning",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-warning")}
                      />
                      <Button
                        className={classnames("bg-danger", {
                          active: radios === "bg-danger",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-danger")}
                      />
                      <Button
                        className={classnames("bg-success", {
                          active: radios === "bg-success",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-success")}
                      />
                      <Button
                        className={classnames("bg-default", {
                          active: radios === "bg-default",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-default")}
                      />
                      <Button
                        className={classnames("bg-primary", {
                          active: radios === "bg-primary",
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-primary")}
                      />
                    </ButtonGroup>
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Description</label>
                    <Input
                      className="form-control-alternative edit-event--description textarea-autosize"
                      placeholder="Event Desctiption"
                      type="textarea"
                      defaultValue={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                    <i className="form-group--bar" />
                  </FormGroup>
                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={changeEvent}>
                  Aktualisieren
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setModalChange(false);
                    deleteEventSweetAlert();
                  }}
                >
                  Löschen
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  onClick={() => setModalChange(false)}
                >
                  Schließen
                </Button>
              </div>
            </Modal>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CalendarView;
