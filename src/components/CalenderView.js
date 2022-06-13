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
  Progress,
  PopoverBody,
  UncontrolledPopover,
  PopoverHeader,
  UncontrolledTooltip,
  Popover
} from "reactstrap";
// core components

import {events as eventsVariables} from "./CalenderVariables"
import _, { set } from "lodash";
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { weekdays } from "../constants/Weekdays";
import { resettingModal, settingModal } from "../reducers/modal";
import { settingShiftSlot } from "../reducers/ShiftSlot";
import { addCalendarShift, resettingShiftplan, settingCalenderShift, settingShiftDescription, settingShiftplan, settingShiftTime } from "../reducers/Shiftplan";
import isSameWeek from "date-fns/isSameWeek";
import { de } from 'date-fns/locale'
import { resettingRemindShiftplanID, resettingTemporaryCalendarWeekIndicator, settingCalendarFilter, settingRemindShiftplanID, settingTemporaryCalendarWeekIndicator, settingTemporaryEventId } from "../reducers/temporary";
import { settingShiftStart, settingCompanyPositions } from "../reducers/userInput";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import { thunkUpdateShiftPlan } from "../store/middleware/UpdateShiftPlan";
import { thunkPublishShiftPlan } from "../store/middleware/PublishShiftPlan";
const slotGB = ["bg-success", "bg-info", "bg-light", "bg-light",]
const borderColor = ["border-success", "border-info", "border-light"]

let calendar;

function CalendarView(props) {
  const [events, setEvents] = useState([]);
  const [positions, setPositions] = useState([]);
  const [alert, setAlert] = useState(null);
  const [viewTimeGridWeek, setViewTimeGridWeek] = useState(true);
  const [viewDayGridMonth, setViewDayGridMonth] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [headerBadge, setHeaderBadge] = useState(null);
  const [bussinessHoursStart, setBussinessHoursStart] = useState("12:00")
  const [isWeekEmpty, setIsWeekEmpty] = useState(true);
  // eslint-disable-next-line
  const calendarRef = useRef(null);
  const dispatch = useDispatch()
  const Meta = useSelector(state => state.Meta);
  const shiftplan = useSelector(state => state.Shiftplan)
  const Plans = useSelector(state => state.DB.plans);
  const index = useSelector(state => state.shiftSlot.index);
  const day = useSelector(state => state.shiftSlot.day);
  const userInput = useSelector(state => state.userInput);
  const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
  const DisplayBasicLayout = useSelector(state => state.display.displayBasicLayout);
  const DisplayCalendarLayout = useSelector(state => state.display.displayCalendarLayout);
  const ShiftplanChanged = useSelector(state => state.ShiftplanChanged.shiftplanChanged);
  const currentEventId = useSelector(state => state.temporary.eventId);
  const calendarFilter = useSelector(state => state.temporary.calendarFilter);
  const calenderWeekIndicator = useSelector(state => state.temporary.calenderWeekIndicator);

  
  useEffect(() => {
    //setEventsData();
    //getPositions();
    //getEarlyestShiftStart()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {}, [headerTitle])

  useEffect(() => {
    if(calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    }
  }, [calendarRef])

  useEffect(() => {
    if(viewTimeGridWeek && shiftplan.id === "") {
      setCurrentShiftplan();
    }
  }, [viewTimeGridWeek, events])

    useEffect(() => {
      if(shiftplan.id !== "") {
        getPositions();
        getEarlyestShiftStart()
      }
    }, [shiftplan]);

    useEffect(() => {
      if (_.isObject(Meta)) {
        dispatch(settingCompanyPositions([...Meta.schichten]))
      }
    }, [Meta]);

    useEffect(() => {
      if(viewDayGridMonth) {
        console.log("showDayGirdMonth");
      }
      if(shiftplan.id !== "") {
        dispatch(resettingShiftplan());
        setPositions([]);
      }
    }, [viewTimeGridWeek])

    useEffect(() => {
      if(ShiftplanChanged) {
        let calendarApi = calendarRef.current.getApi();
        dispatch(settingTemporaryCalendarWeekIndicator(calendarApi.getDate().toISOString()))
        dispatch(settingRemindShiftplanID(shiftplan.id));
        dispatch(thunkUpdateShiftPlan(shiftplan));
      }
    }, [ShiftplanChanged])

  useEffect(() => {
    setAllEventsData();
    //getEarlyestShiftStart()
    // eslint-disable-next-line
  }, [Plans])

  useEffect(() => {
    setEventsData();
    //getEarlyestShiftStart()
    // eslint-disable-next-line
  }, [shiftplan])


  const setCurrentShiftplan = () => {
    let calendarApi = calendarRef.current.getApi();
    const dateOfSelectedWeek = calendarApi.getDate();
    const filteredEvent = events.find(event => isSameWeek(event.start, dateOfSelectedWeek, {locale: de, weekStartsOn: 1}))
    if(filteredEvent) {
      const shiftplanIndex = Plans.findIndex(plan => plan.id === filteredEvent.shiftplanId);
      if(shiftplanIndex !== -1) {
        setIsWeekEmpty(false);
        dispatch(settingShiftplan(Plans[shiftplanIndex]));  
        dispatch(settingRemindShiftplanID(Plans[shiftplanIndex].id));
      }
    }
    console.log(filteredEvent);
    if(!filteredEvent) {
      setIsWeekEmpty(true);
    }
  }
  const filterCurrentShiftplanFromEvents = () => {
    let newEvents = events;
    if(newEvents.length) {
      newEvents = events.filter(event => event.shiftplanId !== shiftplan.id);
    }
    return newEvents;
  };
  const handleUpdateShiftTime = (eventInfo) => {
    const index = eventInfo?.event?._def?.extendedProps?.row || false;
    const day = eventInfo?.event?._def?.extendedProps?.day || false;
    let startDeltaInMilliseconds = eventInfo?.startDelta?.milliseconds || 0;
    let endDeltaInMilliseconds = eventInfo?.endDelta?.milliseconds || 0;
    //determin if just ShiftEnd changed or ShiftStart and ShiftEnd
    if (startDeltaInMilliseconds === 0 && endDeltaInMilliseconds === 0) {
      startDeltaInMilliseconds = eventInfo?.delta?.milliseconds || 0;
      endDeltaInMilliseconds = eventInfo?.delta?.milliseconds || 0;
    }
    const shiftChangeInDays = eventInfo?.delta?.days || 0;
    dispatch(settingShiftTime({
      index: index,
      day: day, 
      startDeltaInMilliseconds: startDeltaInMilliseconds,
      endDeltaInMilliseconds: endDeltaInMilliseconds,
      shiftChangeInDays: shiftChangeInDays

    }
    ))
    dispatch(settingShiftplanChanged());
  };

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
 

    const setAllEventsData = (nextFilter = undefined) => {
      if(nextFilter !== undefined) {
        dispatch(settingCalendarFilter(nextFilter));
      }
      const filter = nextFilter !== undefined ? nextFilter : calendarFilter;
      let eventsData = [];
      let memorizeIDs = [];
      const plansPublished = Plans.filter(shiftplan => {
        const id = shiftplan.id.split('#')[2];
        if(shiftplan.id.split('#').includes("Veröffentlicht")) {
          memorizeIDs.push(id);
          return true;
        }
        return false;
      });

      const plansReview = Plans.filter(shiftplan => {
        const id = shiftplan.id.split('#')[2];
        if( shiftplan.id.split('#').includes("Review") &&
            !memorizeIDs.includes(shiftplan.id.split('#')[2])
          ) 
          {
          memorizeIDs.push(id);
          return true;
        }
        return false;
      });

      const plansReleased = Plans.filter(shiftplan => {
        const id = shiftplan.id.split('#')[2];
        if( shiftplan.id.split('#').includes("Freigeben") &&
            !memorizeIDs.includes(shiftplan.id.split('#')[2])
          ) 
          {
          memorizeIDs.push(id);
          return true;
        }
        return false;
      });

      let plans = [...plansPublished, ...plansReview, ...plansReleased];
      let index = 0
      plans.forEach((shiftplan, planIndex) => {
        shiftplan.plan.forEach((row, rowIndex) => {
          if (filter === false || row.Wochentag.ShiftPosition === filter) {
            _.forIn(row, function (value, key, row) {
                if(_.isObject(value) && key !== "Wochentag" && value.frei !== false && !shiftplan.id.split('#').includes("Entwurf")) {
                    const splittedDate = shiftplan.plan[0][key].split(".");
                    const splittedStartTime = row.Wochentag.ShiftStart.split(":");
                    const splttedEndTime = _.isBoolean(row.Wochentag.ShiftEnd) ? ("24:00").split(":") : row.Wochentag.ShiftEnd.split(":")
                    const startTime = new Date(splittedDate[2], Number(splittedDate[1]) - 1, splittedDate[0], splittedStartTime[0], splittedStartTime[1])
                    const endTime = new Date(splittedDate[2], Number(splittedDate[1] - 1), splittedDate[0], splttedEndTime[0], splttedEndTime[1])
                    let background = "";
                    const setApplicantsLenght = _.size(_.get(value, "setApplicants", {}))
                    if(setApplicantsLenght === Number(value.anzahl))
                      background = "#2dce89";
                    if(setApplicantsLenght > Number(value.anzahl))
                      background = "#f5365c";
                    if(setApplicantsLenght < Number(value.anzahl))
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
                        shiftplanId: shiftplan.id,
                        row: rowIndex,
                        day: key
                })
                index +=1
                }
            })
          }
        });
      })
      setEvents(eventsData);
    }

    const setEventsData = (nextFilter = undefined) => {
      if(nextFilter !== undefined) {
        dispatch(settingCalendarFilter(nextFilter));
      }
      const filter = nextFilter !== undefined ? nextFilter : calendarFilter;
      let events = filterCurrentShiftplanFromEvents();
      if(events.length) {
      const shiftplanIdType = shiftplan.id.split('#')[1];
      setHeaderBadge(shiftplanIdType);
      const lastId = events[events.length - 1].id;
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
                      if(setApplicantsLenght === Number(value.anzahl))
                        background = "#2dce89";
                      if(setApplicantsLenght > Number(value.anzahl))
                        background = "#f5365c";
                      if(setApplicantsLenght < Number(value.anzahl))
                        background = "#fb6340"
                      eventsData.push({
                          id: lastId + index + 1,
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
                          position: row.Wochentag.ShiftPosition,
                          applicants: _.get(value, "applicants", {}),
                          setApplicants: _.get(value, "setApplicants", {}),
                          shiftplanId: shiftplan.id,
                          row: rowIndex,
                          day: key
                  })
                  index +=1
                  }
              })
          }
      });
      setEvents([...events, ...eventsData]);
    }
  }
  const selectDate = (info) => {
    if(viewDayGridMonth) {
    }
  }
  const changeView = (newView) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    setHeaderBadge(null);
    if(newView === "timeGridWeek") {
      setViewTimeGridWeek(true);
      setViewDayGridMonth(false);
      const selectedDate = calendarApi.getDate();
      console.log(calendarApi);
      console.log(selectedDate);
      calendarApi.gotoDate(selectedDate);
    }
    if(newView === "dayGridMonth") {
      console.log("setting");
      setViewTimeGridWeek(false);
      setViewDayGridMonth(true);
      dispatch(resettingShiftplan());
      dispatch(resettingTemporaryCalendarWeekIndicator());
      dispatch(resettingRemindShiftplanID());
    }
  };

  const changeToToday = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek", new Date().toISOString());
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    dispatch(resettingTemporaryCalendarWeekIndicator());
    setViewTimeGridWeek(true);
    setViewDayGridMonth(false);
  };

  const changeToNext = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    setCurrentShiftplan();
    setHeaderBadge(null);
  };

  const changeToPrev = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    setCurrentShiftplan();
    setHeaderBadge(null);
  };

  const CalendarTitle = () => {
    return (
      <h5 className="h3 mb-0">{headerTitle}</h5>
    )
  }

  const Popover = ({eventInfo}) => {
    const target = "Popover" + String(eventInfo.event.id);
    if (!target) {
      return null;
    }
    const Shift = _.get(shiftplan, "plan[" + eventInfo.event.extendedProps.row + "][" + eventInfo.event.extendedProps.day + "]")
    const setApplicants = Shift?.setApplicants || {};
    return (
      <UncontrolledPopover className="px-4" trigger="hover" placement="top" target={target} placementPrefix="bs-popover">
        <Row className="mx-4 text-center">
          <Col>
            <PopoverHeader>
            <h3 className="mb-0 pb-0">{eventInfo.event.title}</h3>
            <small className="m-0 p-0">{eventInfo.event.extendedProps.position}</small>
          </PopoverHeader>
          </Col>
        </Row>
        <Row className="m-2">
          <Col>
          <PopoverBody>
            <p>
          <i className="fas fa-clock"></i>{" "}{eventInfo.timeText}{" "}Uhr
             <div className="m-0 p-0" hidden={_.isEmpty(_.get(Shift, "notice", ""))}>
             <i hidden={_.isEmpty(_.get(Shift, "notice", ""))} className="fas fa-comment"></i>{" "}{_.get(Shift, "notice", "")}
             </div>
             <br/>
             <i className="fas fa-users"></i>{" "}{eventInfo.event.extendedProps.filling}:
             {Object.keys(setApplicants).length > 0 ? Object.keys(Shift.setApplicants).map(applicantId => {
               return <>
                        <br/>
                        <b>{Shift.setApplicants[applicantId]}</b>
                      </>
             }) : <></>}
            
             </p> 
          </PopoverBody>
          </Col>
        </Row>
      </UncontrolledPopover>
    );
  };
  const StatusBadge = () => {
    if(viewTimeGridWeek) {
      if(headerBadge === "Veröffentlicht") {
        return <Progress max="100" value="100" style={{height: "18px"}}color="success"><p className="p-0 m-0">Live</p></Progress>
      } else if (headerBadge === "Review") {
        return <Progress max="100" value="75" style={{height: "18px"}}color="primary"><p className="p-0 m-0">Review</p></Progress>
      } else if (headerBadge === "Freigeben") {
        return <Progress max="100" value="50" style={{height: "18px"}}color="yellow"><p className="p-0 m-0">Bewerbung</p></Progress>
      } else if (headerBadge === "Entwurf") {
        return <Progress max="100" value="25" style={{height: "15px"}}color="primary">Entwurf</Progress>
      } else {
        return null;
      }
    }
    return null;
  }

  const NextButtons = () => {
    if(viewTimeGridWeek) {
      if (headerBadge === "Review") {
        return <Button color="success" onClick={() => dispatch(thunkPublishShiftPlan(shiftplan))}>Zur Veröffentlichung</Button>
      } else if (headerBadge === "Freigeben") {
        return <Button color="success" onClick={() => dispatch(settingModal("showBefuellungStarten"))}>Zur Befüllung</Button>
      } else if (headerBadge === "Entwurf") {
        return <Button color="success"onClick={() => dispatch(settingModal("showSchichtplanFreigeben"))}>Zur Freigabe</Button>
      } else if (headerBadge === "Veröffentlicht") {
          return <div className="py-3 pb-4"></div>;
      } else {
        return <Button color="primary"onClick={() => dispatch(settingModal("showSchichtplanErstellen"))}>Vorlage anwenden</Button>
      }
    }
    return null;
  }
  const renderEventContent = (eventInfo) => {
    if(shiftplan.id !== "") {
      const Shift = _.get(shiftplan, "plan[" + eventInfo.event.extendedProps.row + "][" + eventInfo.event.extendedProps.day + "]")
      const setApplicants = Shift?.setApplicants || {};
      return (
        <div id={"Popover" + String(eventInfo.event.id)}>
        <Popover eventInfo={eventInfo}/>
        <Row className="p-1">
            <Col>
            <b>{eventInfo.timeText}{" Uhr "}<i hidden={_.isEmpty(_.get(Shift, "notice", ""))} className="fas fa-comment ml-2"></i></b>
            <br/>
            <br/>
            <b><i className="fas fa-users"></i>{" "}{eventInfo.event.extendedProps.filling}</b>
             {Object.keys(setApplicants).length > 0 ? Object.keys(Shift.setApplicants).map(applicantId => {
               return <>
                        <br/>
                        <b className="ml-3">{Shift.setApplicants[applicantId]}</b>
                      </>
             }) : <></>}
             
           </Col>
        </Row>
        </div>
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
  if(DisplayCalendarLayout === false) return null;
  return (
    <>
      {alert}
      <Container className="mt-6" fluid>
      <Row className="text-right my-2">
          <Col>
              <NextButtons/>
          </Col>
        </Row>
        <Row>
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
                  </Col>
                  <Col>
                        <Row className="pt-2">
                          <Col>
                          </Col>  
                          <Col lg="6">
                            <StatusBadge/>
                          </Col>
                          <Col>
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
                        initialDate={calenderWeekIndicator ? new Date(calenderWeekIndicator) : new Date()}
                        ref={calendarRef}
                        plugins={[interaction, dayGridPlugin, timeGridPlugin]}
                        slotDuration="00:30:00"
                        allDaySlot={false}
                        initialView="timeGridWeek"
                        firstDay={1}
                        eventInteractive={true}
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
                        eventResize={(info) => handleUpdateShiftTime(info)}
                        eventDrop={(info) => handleUpdateShiftTime(info)}
                        selectable={true}
                        editable={true}
                        locale="de"
                        events={events}
                        eventContent={renderEventContent}
                        eventDisplay="block"
                        // Add new event
                        select={(info) => {
                            console.log("add");
                            if(viewTimeGridWeek && isWeekEmpty) {
                              dispatch(settingModal("showCalendarCreateShiftplan"));
                              return;
                            }
                            if(viewDayGridMonth) {
                              changeView("timeGridWeek");
                            } 

                            if(viewTimeGridWeek) {
                            let getStartTime = String(info.start.getHours()); 
                            const startTime = getStartTime.length === 1 ? "0" + getStartTime + ":00" : getStartTime + ":00";
                            let getDay = info.start.getDay();
                            const day = weekdays[getDay - 1];
                            dispatch(settingShiftStart(startTime));
                            dispatch(settingShiftSlot({day: day}))
                            dispatch(settingModal("addCalendarShift"))
                            }
                        }}
                        dateClick={(info) => selectDate(info)}
                        // Edit calendar event action
                        eventClick={({ event }) => {
                            if(viewDayGridMonth) {
                              changeView("timeGridWeek");
                            }

                            if(viewTimeGridWeek) {
                              dispatch(settingTemporaryEventId(event._def.publicId))
                              const shiftplanIndex = Plans.findIndex(shiftplan => shiftplan.id === event.extendedProps.shiftplanId);
                              dispatch(settingShiftplan(Plans[shiftplanIndex]))
                              dispatch(settingShiftSlot({index: event.extendedProps.row, day: event.extendedProps.day}))
                              dispatch(settingModal("editCalendarShift"))
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
    </>
  );
}

export default CalendarView;
