import { useState, useRef, useEffect } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import interaction from "@fullcalendar/interaction";
import _ from 'lodash';
import isBefore from 'date-fns/isBefore';
import { settingRemindShiftplanID } from "../reducers/temporary";
import { addDays, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { weekdays } from "../constants/Weekdays";
const FormCalendarImportVorlage = () => {
    const dispatch = useDispatch();
    const Plans = useSelector(state => state.DB.plans);
    const [currentVorlageIndex, setCurrentVorlageIndex] = useState(0);
    const [vorlagen, setVorlagen] = useState([...Plans.filter(plan => plan.id.split('#').includes("Veröffentlicht")), ...Plans.filter(plan => plan.id.split('#').includes("Entwurf"))]);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState(false)
    const [positions, setPositions] = useState([]);
    const [shiftplan, setShiftplan] = useState(Plans.findIndex(shiftplan => shiftplan.id === vorlagen[currentVorlageIndex].id));
    const [bussinessHoursStart, setBussinessHoursStart] = useState("12:00");
    const calendarRef = useRef(null);

    useEffect(() => {
        const targetShiftplan = Plans[Plans.findIndex(shiftplan => shiftplan.id === vorlagen[currentVorlageIndex].id)]; 
        setShiftplan(targetShiftplan);
        dispatch(settingRemindShiftplanID(targetShiftplan.id));
    }, [currentVorlageIndex])

    useEffect(() => {
        if(shiftplan?.id) {
            setEventsData();
            //setBussinessHoursStart(getEarlyestShiftStart());
        }
    }, [shiftplan]);

    useEffect(() => {
        if (events.length) {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(new Date(events[0].start));
        getEarlyestShiftStart();
        getPositions();
        }
    }, [events])

    useEffect(() => {
        setEventsData(filter);
    }, [filter])

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

        let currentPositions = [];
        const plan = _.get(shiftplan, "plan", [])
        _.forEach(plan, function (row, rowIndex) {
            let shiftPositiion = _.get(row, "Wochentag.ShiftPosition", "")
            if( !_.isEmpty(shiftPositiion) && 
                currentPositions.indexOf(shiftPositiion) === -1) {
                currentPositions.push(shiftPositiion);
            }
        })
        setPositions(currentPositions);
    }

      const setEventsData = (filter = false) => {
        let eventsData = [];
        const plan = _.get(shiftplan, "plan", []);
        let index = 0
        _.forEach(plan, function (row, rowIndex) {
            if (filter === false || row.Wochentag.ShiftPosition === filter) {
                _.forIn(row, function (value, key, row) {
                    if(_.isObject(value) && key !== "Wochentag" && value.frei !== false) {
                        const splittedDate = plan[0][key].split(".");
                        let startTime;
                        let endTime;
                        let splittedStartTime = row.Wochentag.ShiftStart.split(":");
                        let splttedEndTime = _.isBoolean(row.Wochentag.ShiftEnd) ? ("24:00").split(":") : row.Wochentag.ShiftEnd.split(":")
                        if(plan[0].Wochentag === "Datum") {
                            startTime = new Date(splittedDate[2], Number(splittedDate[1]) - 1, splittedDate[0], splittedStartTime[0], splittedStartTime[1])
                            endTime = new Date(splittedDate[2], Number(splittedDate[1] - 1), splittedDate[0], splttedEndTime[0], splttedEndTime[1])
                        }
                        if(plan[0].Wochentag === "Wochentag") {
                            startTime = addDays(startOfWeek(new Date(), { locale: de, weekStartsOn: 1}), weekdays.indexOf(key));
                            startTime.setHours(splittedStartTime[0])
                            startTime.setMinutes(splittedStartTime[1])
                            endTime = addDays(startOfWeek(new Date(), { locale: de, weekStartsOn: 1}), weekdays.indexOf(key));
                            endTime.setHours(splttedEndTime[0]);
                            endTime.setMinutes(splttedEndTime[1])
                        }
                        
                        let background = "";
                        eventsData.push({
                            id: index,
                            title: row.Wochentag.ShiftName,
                            start: startTime,
                            end: endTime,
                            display: "block",
                            backgroundColor: background,
                            borderColor: background,
                            textColor: "dark",
                            position: row.Wochentag.ShiftPosition,
                            numberOfEmployees: value.anzahl,
                            row: rowIndex,
                            day: key
                    })
                    index +=1
                    }
                })
            }});
        setEvents([...eventsData]);
    }
      const renderEventContent = (eventInfo) => {
        return (
            <Row className="">
                <Col>
                 <b>{eventInfo.timeText}</b>
                 <br/>
                 <b>{eventInfo.event.extendedProps.position}</b>
               </Col>
            </Row>
        )
      }
    return (
        <Row>
            <Col xs="3">
                <Row>
                    <Col>
                        <p >Deine Vorlagen:</p>
                    </Col>
                </Row>
                <hr className="m-1 p-1"/>
                <Card>
                    {vorlagen.map((vorlage, index) => {
                        return (
                            <Row className="mx-1" onClick={() => setCurrentVorlageIndex(index)}>
                                <Col>
                                    <p className={currentVorlageIndex === index ? "text-primary font-weight-bold m-0 p-0" : " m-0 p-0"}>{vorlage.name}</p>
                                </Col>
                            </Row>
                        )
                    })}
                    </Card>
                <Row>
                    <Col>
                   
                    </Col>
                </Row>
            </Col>
            <vr/>
            <Col>
                <Row>
                    <Col>
                        <FullCalendar
                                    className="calendar"
                                    data-toggle="calendar"
                                    id="calendar"
                                    initialDate={new Date()}
                                    ref={calendarRef}
                                    plugins={[interaction, dayGridPlugin, timeGridPlugin]}
                                    slotDuration="01:00:00"
                                    allDaySlot={false}
                                    initialView="timeGridWeek"
                                    firstDay={1}
                                    headerToolbar={""}
                                    height="auto"
                                    slotMinTime={bussinessHoursStart}
                                    eventMaxStack={1}
                                    slotLabelFormat= {{
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        omitZeroMinute: true,
                                        meridiem: 'long'
                                    }}
                                    views={{
                                        timeGridWeek: {
                                        dayHeaderFormat: {weekday: "long"}
                                        }
                                    }}
                                    slotLabelClassNames={["px-3"]}
                                    locale="de"
                                    events={events}
                                    eventContent={renderEventContent}
                                    eventDisplay="block"
                                />
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        {positions.map(position => {
                            return <Button color="link" onClick={() => setFilter(position)}>{position}</Button>
                        })}
                        <Button color="link" onClick={() => setFilter(false)}>Alle</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default FormCalendarImportVorlage;