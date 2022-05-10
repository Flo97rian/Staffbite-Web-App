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
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import { ReactDOM } from "react";
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
} from "reactstrap";
// core components

import {events as eventsVariables} from "./CalenderVariables"
import _ from "lodash";
const slotGB = ["bg-success", "bg-info", "bg-light", "bg-light",]
const borderColor = ["border-success", "border-info", "border-light"]

let calendar;

function CalendarView(props) {
  const [events, setEvents] = React.useState([]);
  const [positions, setPositions] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalChange, setModalChange] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [radios, setRadios] = React.useState(null);
  const [eventId, setEventId] = React.useState(null);
  const [eventTitle, setEventTitle] = React.useState(null);
  const [eventDescription, setEventDescription] = React.useState(null);
  // eslint-disable-next-line
  const [event, setEvent] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(null);
  const calendarRef = React.useRef(null);
  React.useEffect(() => {
      console.log(events)
    setEventsData();
    getPositions();
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    setEventsData();
    getPositions();
    // eslint-disable-next-line
  }, [props.plaene])

  React.useEffect(() => {
    setEventsData();
    getPositions();
    // eslint-disable-next-line
  }, [props.plan])

  

      {/*
            // Add new event
            select={(info) => {
                setModalAdd(true);
                setStartDate(info.startStr);
                setEndDate(info.endStr);
                setRadios("bg-info");
            }}
            // Edit calendar event action
            eventClick={({ event }) => {
                setEventId(event.id);
                setEventTitle(event.title);
                setEventDescription(event.extendedProps.description);
                setRadios("bg-info");
                setEvent(event);
                setModalChange(true);
            }}
            */}
    //setCurrentDate(calendar.view.title);
    const getPositions = () => {
        let positions = [];
        const plan = _.get(props.plaene, [props.plan]+".plan", [])
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
        const plan = _.get(props.plaene, [props.plan]+".plan", [])
        let index = 0
        _.forEach(plan, function (row, rowIndex) {
            if (filter === false || row.Wochentag.ShiftPosition === filter) {
                _.forIn(row, function (value, key, row) {
                    if(_.isObject(value) && key !== "Wochentag") {
                        const splittedDate = plan[0][key].split(".");
                        const splittedStartTime = row.Wochentag.ShiftStart.split(":");
                        const splttedEndTime = _.isBoolean(row.Wochentag.ShiftEnd) ? ("24:00").split(":") : row.Wochentag.ShiftEnd.split(":")
                        const startTime = new Date(splittedDate[2], Number(splittedDate[1]) - 1, splittedDate[0], splittedStartTime[0], splittedStartTime[1])
                        const endTime = new Date(splittedDate[2], Number(splittedDate[1] - 1), splittedDate[0], splttedEndTime[0], splttedEndTime[1])
                        eventsData.push({
                            id: index,
                            title: row.Wochentag.ShiftName,
                            start: startTime,
                            end: endTime,
                            filling: String(0) + "/" + value.anzahl + " Mitarbeiter",
                            classNames: [slotGB[positions.indexOf(row.Wochentag.ShiftPosition)], borderColor[positions.indexOf(row.Wochentag.ShiftPosition)], "shadow text-dark" ],
                            description: "gello",
                            display: "block",
                            textColor: "dark"
                    })
                    index +=1
                    }
                })
            }
        });
        console.log(eventsData)
        setEvents(eventsData);
    }
  const changeView = (newView) => {
    calendar.changeView(newView);
    setCurrentDate(calendar.view.title);
  };
  const addNewEvent = () => {
      console.log(eventTitle, startDate, endDate, radios, event)
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
      console.log("eventInfo", eventInfo);
    return (
        <Row>
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

  return (
    <>
      {alert}
      <div className="header header-dark pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6">
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6">
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicWeek"
                  onClick={() => changeView("dayGridWeek")}
                  size="sm"
                >
                  Woche
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicDay"
                  onClick={() => changeView("dayGridDay")}
                  size="sm"
                >
                  Tag
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card className="card-calendar">
              <CardHeader>
                  <Row>
                        <Col>
                            <h5 className="h3 mb-0">Frühling 8. Mai - 15.Mai</h5>
                        </Col>
                        <Col>
                            <Row className="text-right">
                                <Col>
                                {positions.map(value => {
                                    return (
                                    <Button
                                        className="btn-neutral"
                                        color="default"
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
                                    color="default"
                                    data-calendar-view="basicDay"
                                    onClick={() => setEventsData(!1)}
                                    size="sm"
                                >
                                Alle
                                </Button>
                                    <Button className="text-right" size="sm" color="primary">Standardschicht hinzufügen</Button>
                                </Col>
                            </Row>
                        </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0">
              <FullCalendar
                    className="calendar"
                    data-toggle="calendar"
                    id="calendar"
                    ref={calendarRef}
                    plugins={[interaction, dayGridPlugin, timeGridPlugin]}
                    initialView="timeGridWeek"
                    slotDuration="00:15:00"
                    allDaySlot={false}
                    eventConstraint={{startTime: "08:00", endTime: "22:00"}}
                    dayHeaderFormat= {{weekday: "long", month: 'numeric', day: 'numeric'}}
                    slotLabelFormat= {{
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: true,
                        meridiem: 'long'
                    }}
                    slotLabelClassNames={["px-3"]}
                    eventMinWidth="120px"
                    selectable={true}
                    editable={true}
                    locale="de"
                    events={events}
                    eventContent={renderEventContent}
                    eventDisplay="block"
                    headerToolbar={""}
                    // Add new event
                    select={(info) => {
                        setModalAdd(true);
                        setStartDate(info.startStr);
                        setEndDate(info.endStr);
                        setRadios("bg-info");
                    }}
                    // Edit calendar event action
                    eventClick={({ event }) => {
                        setEventId(event.id);
                        setEventTitle(event.title);
                        setEventDescription(event.extendedProps.description);
                        setRadios("bg-info");
                        setEvent(event);
                        setModalChange(true);
                    }}
                />
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
