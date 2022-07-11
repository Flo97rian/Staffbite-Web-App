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
import {useState, useRef, useEffect} from "react";
// nodejs library that concatenates classes
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { Helmet } from "react-helmet";
// JavaScript library that creates a callendar with events
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';
import interaction from "@fullcalendar/interaction";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
} from "reactstrap";
// core components

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { weekdays } from "../../constants/Weekdays";
import { resettingModal, settingModal } from "../../reducers/modal";
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
import { isSameWeek, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { Tooltip } from "./CalendarDemo/IntroStep";
import { ModalApplyForShift } from "./CalendarDemo/ModalApplyForShift";
import { ModalSendFeedback } from "./CalendarDemo/ModalSendFeedback";
import { ModalInvitationAdmin } from "./CalendarDemo/AdminInvitationModal";
import { IntroTitle } from "./CalendarDemo/IntroTitle";
import catchAnalyticsEvent from "./CalendarDemo/DemoAnalytics";


function CalendarDemo(props) {
  const [alert, setAlert] = useState(null);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [viewTimeGridWeek, setViewTimeGridWeek] = useState(true);
  const [viewDayGridMonth, setViewDayGridMonth] = useState(false);
  const [viewListWeek, setViewListWeek] = useState(false);
  const [clip, setClip] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");
  const [bussinessHoursStart, setBussinessHoursStart] = useState("12:00")
  const isAdmin = useSelector(state => state.demo.demoAdmin?.isAdmin);
  const newAdmin = useSelector(state => (state.demo.demoAdmin?.isAdmin && (state.demo.demoAdmin.securityQuestionId === false || state.demo.demoAdmin.securityQuestionId === undefined)));
  const isEmployee = useSelector(state => state.demo.demoEmployee.isEmployee);
  const isSignedIn = useSelector(state => state.demo.demoSignedIn);
  const demoFetched = useSelector(state => state.demo.demoFetched === "fulfilled");
  const employee = useSelector(state => state.demo.demoEmployee);
  const events = useSelector(state => state.demo.demoPlans);
  const CreateingShiftplan = useSelector(state => state.demo.demoProcessingCreateShiftplan === "loading");
  const EventsChanged = useSelector(state => state.ShiftplanChanged.shiftplanChanged);
  // eslint-disable-next-line
  const calendarRef = useRef(null);
  const containerRef = useRef();
  const introJsRef = useRef();
  const dispatch = useDispatch()
  const [intro, setIntro] = useState({
    
      stepsEnabled: false,
      initialStep: 0,
      continue: true,
      readyToSet: false,
      alreadyShown: false,
      stepIndex: 0,
      steps: [
        {
          disableBeacon:true,
          target: '#adminView',
          placement: 'auto',
          title: "Willkommen bei Staffbite",
          content:  <div>Du befindest dich in der <b>Planer Ansicht</b>. In der <b>Planer Ansicht</b> kannst du deinen Schichtplan <b>erstellen & bearbeiten</b>.</div>,
          highlightClass: "",
          tooltipClass: "",
          buttonText: "Los geht's",
          showButton: false,
          showSkipButton: false,
          hideCloseButton: true,
          hideBackButton: true,
        },
      ],
    })


  
  useEffect(() => {
    handleStart();
  }, [])

  useEffect(() => {
    if(demoFetched) {
      handleShowEntries()
    }
  }, [demoFetched]);

  useEffect(() => {}, [headerTitle])

  useEffect(() => {
    handleShowViewBasedOnWidth()
  }, [window])
  useEffect(() => {
    handleSetBussinessHours();
  }, [events])


  useEffect(() => {
    if(EventsChanged) {
      dispatch(thunkUpdateDemo());
    }
  }, [EventsChanged])

  
  function handleStart() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if("id" in params && !("invitation" in params)) {
      dispatch(settingDemoId(params.id));
      dispatch(thunkFetchDemo(params.id));
      var url = window.location.href;
      setInvitationLink(url + "&invitation=true");
    }
    if("id" in params && "invitation" in params) {
      dispatch(settingDemoId(params.id));
      dispatch(thunkFetchDemo(params.id));
    }
    if(!Object.keys(params).length) {
      dispatch(settingModal("demoIntro"))
    }
    handleShowViewBasedOnWidth()
  }

  function handleShowEntries() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if(newAdmin) {
      createInitialShift();
    }
    if("id" in params && !("invitation" in params) && !newAdmin) {
      dispatch(settingModal("demoEntry"));
      var url = window.location.href;
      setInvitationLink(url + "&invitation=true");
    }
    if("id" in params && "invitation" in params) {
      dispatch(settingModal("demoInvitation"))
    }
    if(!Object.keys(params).length) {
      dispatch(settingModal("demoIntro"))
    }
    handleShowViewBasedOnWidth()
  }

  useEffect(() => {
    if(calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      console.log(calendarApi);
      setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    }
  }, [calendarRef])

  useEffect(() => {
    if(intro.steps.length === 2 && !intro.stepsEnabled && intro.readyToSet) {
      if(!intro.alreadyShown) {
        setIntro({...intro, stepsEnabled: true});
      }
    }
  }, [intro])

  useEffect(() => {
  }, [isAdmin]);


  const createInitialShift = () => {
    if(demoFetched && !events.length) {
      const calendarApi = calendarRef.current.getApi();
      const DateOfCurrentWeek = calendarApi.getDate();
      let StartOfWeek = startOfWeek(new Date(DateOfCurrentWeek), {locale: de, weekStartsOn: 1});
      let start = new Date(StartOfWeek.setHours("12"));
      let end = new Date(StartOfWeek.setHours("18"));
      let initialShift = {
        id: 0,
        title: "Erste Schicht",
        start: start.toString(),
        end: end.toString(),
        display: "block",
        description: "Moin",
        NumberOfEmployees: 2,
        backgroundColor: "#fb6340",
        borderColor: "#fb6340",
        textColor: "dark",
        notice: "",
        applicants: {},
        setApplicants: {},
        applicantsAfterPublish: {},
      };
      dispatch(settingDemoPlans([...events, initialShift]));
    }
  };

  const createTour = () => {
    if( newAdmin &&
        intro.stepsEnabled === false &&
        intro.readyToSet === false &&
        intro.steps.length === 1
      ) {
        const firstShift = {
          target: '#firstShift',
          placement: 'auto',
          title: "Deine erste Schicht",
          highlightClass: "",
          content: <div><b>Bearbeite</b> deine <b>erste Schicht</b>. Wähle die Schicht aus, um sie zu <b>bearbeiten</b>.</div>,
          spotlightClicks: true,
          showSkipButton: false,
          hideCloseButton: true,
          hideBackButton: true,
        }
        const editFirstShift = {
          target: '#editfirstShift',
          placement: viewListWeek ? "center" : 'auto',
          title: "Bearbeite deine Schicht",
          viewMobile: viewListWeek,
          continue: false,
          highlightClass: "",
          buttonText: viewListWeek ? "Los geht's" : "",
          content:  <div>Passe den <b>Namen</b>, die <b>Anzahl benötigter Mitarbeiter</b>, den <b>Beginn</b> und das <b>Ende</b> für deine Bedürfnisse an. <b>Bestätige</b> anschließend deine ersten Änderungen.</div>,
          spotlightClicks: true,
        }
        const addSecondShift = {
          target: viewListWeek ? "#addListShift" : "#addCalendarShift",
          placement: viewListWeek ? "auto" : 'auto',
          title: "Füge eine Schicht hinzu",
          viewMobile: viewListWeek,
          highlightClass: "",
          content:  <div><b>Füge</b> eine <b>weitere Schicht</b> hinzu. {viewListWeek ? <div>Klicke auf das <i className="fas fa-plus"></i> Symbol, um eine Schicht hinzuzufügen</div> : <div>Klicke auf eine freie Fläche im Kalender, um eine Schicht hinzuzufügen.</div>}</div>,
          spotlightClicks: true,
        }
        const shareShiftplan = {
          target: "#sharePlan",
          placement: 'auto',
          title: "Teile deinen Schichtplan",
          viewMobile: viewListWeek,
          highlightClass: "",
          content:  <div><b>Teile</b> deinen Schichtplan mit deinem Team, damit sich dein Team eintragen kann.</div>,
          spotlightClicks: true,
        }
        const shareShiftplanLink = {
          target: "#sharePlan",
          placement: viewListWeek ? "auto" : 'auto',
          title: "Link teilen",
          viewMobile: viewListWeek,
          highlightClass: "",
          content:  <div>Über den Link, kann deine Team ihre Verfügbarkeiten angeben und den Schichtplan einsehen. Sie können allerdings keine Änderungen vornehmen.</div>,
          spotlightClicks: true,
        }
      setIntro({...intro, stepsEnabled: true, readyToSet: true, steps: [...intro.steps, firstShift, editFirstShift, addSecondShift, shareShiftplan]});
    }
  }

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type, lifecycle } = data;
    if(lifecycle === "complete") {
      switch (index) {
        case 0:
          setIntro({...intro, stepIndex: index + 1});
          catchAnalyticsEvent(7);
          break;
        case 2:
          setIntro({...intro, stepsEnabled: false});
          break;
        case 3:
          setIntro({...intro, stepsEnabled: false});
          break;
        case 4:
          setIntro({...intro, stepsEnabled: false});
        default:
          break;
      
      }
    }
  };

  const updateStepIndex = (restart = false, disable = false) => {
    if(newAdmin) {
      if(!intro.stepsEnabled && !restart && !disable) {
        setIntro({...intro, stepsEnabled: false});
      }
      if(!intro.stepsEnabled && restart) {
        setIntro({...intro, stepsEnabled: true, stepIndex: intro.stepIndex + 1});
        catchAnalyticsEvent(9);
      }
      if(intro.stepsEnabled && !disable) {
        setIntro({...intro, stepIndex: intro.stepIndex + 1});
        catchAnalyticsEvent(8);
      }
      if(intro.stepsEnabled && disable) {
        setIntro({...intro, stepsEnabled: false});
      }
    }
  }

  const handleShowViewBasedOnWidth = () => {
    const { innerWidth: width } = window;
    if(width < 875) {
      changeView("listWeek");
      setViews("listWeek")
    }
    if(width > 875) {
      changeView("timeGridWeek");
      setViews("timeGridWeek")
    }
  }


  const setViews = (newView) => {
    if(newView === "listWeek") {
      setViewListWeek(true);
      setViewTimeGridWeek(false);
      setViewTimeGridWeek(false);
    }

    if(newView === "timeGridWeek") {
      setViewTimeGridWeek(true);
      setViewListWeek(false);
      setViewDayGridMonth(false);
    }

    if(newView === "dayGridMonth") {
      setViewDayGridMonth(true);
      setViewTimeGridWeek(false);
      setViewListWeek(false);
    }
  };

  const handleSetBussinessHours = () => {
    const calendarApi = calendarRef.current.getApi();
    const currentDate = calendarApi.getDate();
    let currentWeeksEvents = events.filter(event => isSameWeek( new Date(event.start), new Date(currentDate), {locale: de, weekStartsOn: 1}));
    let currentEarlyestHours = 12;
    currentWeeksEvents.forEach(event => {
      if(new Date(event.start).getHours() < currentEarlyestHours) {
        currentEarlyestHours = new Date(event.start).getHours();
      }
    })
    setBussinessHoursStart(String(currentEarlyestHours) + ":00");
  }

  const changeView = (newView) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
    setViews(newView);
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
  };

  const changeToToday = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridWeek", new Date().toISOString());
    handleShowViewBasedOnWidth();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    handleSetBussinessHours()
  };

  const changeToNext = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.next();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    handleSetBussinessHours()
  };

  const changeToPrev = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
    setHeaderTitle(calendarApi.currentDataManager.data.viewTitle)
    handleSetBussinessHours()
  };

  const CalendarTitle = () => {
    return (
      <h5 className="h3 mb-0">{headerTitle}</h5>
    )
  }

  const handleInvitationLink = () => {
    if(newAdmin) {
      updateStepIndex(false, true);
      catchAnalyticsEvent(4);
      dispatch(settingModal("demoInvitationAdmin"));
    }
    if(!newAdmin) {
        dispatch(settingModal("demoInvitationAdmin"));
      }
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
    const { innerWidth: width } = window;
    const displayOnSmallDevices = width < 875;
    if(isAdmin) {
    return (
      <div id="firstShift" style={{cursor: "pointer"}} onClick={() => updateStepIndex()}>
        <Row className="p-1">
            <Col>
            <div hidden={displayOnSmallDevices}>
            <b>{" "}{eventInfo.timeText}{" "}Uhr</b>
            <br/>
            <br/>
            </div>
            <b>{eventInfo.event.title}</b>
            <br/>
            <b><i className="fas fa-user-clock"></i>{" "}{Object.keys(eventInfo.event.extendedProps.applicants).length} {displayOnSmallDevices && viewDayGridMonth ? "" : "Bewerber"}</b>
            <br/>
            <b><i className="fas fa-users"></i>{" "}{Object.keys(eventInfo.event.extendedProps.setApplicants).length + "/" + eventInfo.event.extendedProps.NumberOfEmployees} {displayOnSmallDevices && viewDayGridMonth ? "" : "Mitarbeiter"}</b>
          </Col>
        </Row>
      </div>
    )
  }
  if(isEmployee) {
    const applyed = eventInfo.event.extendedProps.applicants[employee.id]
    const isSetInShift = eventInfo.event.extendedProps.setApplicants[employee.id]
    return (
      <Row className="p-1">
          <Col>
            <div hidden={displayOnSmallDevices}>
            <b>{" "}{eventInfo.timeText}{" "}Uhr</b>
            <br/>
            <br/>
            </div>
            <b>{eventInfo.event.title}</b>
            <div hidden={!applyed}>
            <br hidden={displayOnSmallDevices}/>
            <b><i className="fas fa-user-clock"></i>{" "}{displayOnSmallDevices && viewDayGridMonth ? "" : "Beworben"}</b>
            </div>
            <div hidden={!isSetInShift}>
              <br hidden={displayOnSmallDevices}/>
              <b><i className="fas fa-user-check"></i>{" "}{displayOnSmallDevices && viewDayGridMonth ? "" : "Deine Schicht"}</b>
            </div>
         </Col>
      </Row>
    )
  }
  return null;
};
  return (
    <>
        <Helmet>
          <title>{"Online Schichtpläne erstellen || Ohne Anmeldung. Ohne Risiko ausporbieren"}</title>
          <meta name="description" charSet="utf-8" content=""/>
          <meta property="og:title" content=""/>
          <meta property="og:description" content="Wir bieten die Möglichkeit bequem und von überall Schichtpläne online & per App zu erstellen, automatisiert zu Befüllen. Durch Einfachheit und Übersichtlichkeit kann die Schichtplanung in wenigen Minuten vollendet werden."/>
          <meta property="og:url" content="https://www.staffbite.de"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Digitale Schichtplanung jederzeit online und per App."/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="Wir bieten die Möglichkeit bequem und von überall Schichtpläne online & per App zu erstellen, automatisiert zu Befüllen. Durch Einfachheit und Übersichtlichkeit kann die Schichtplanung in wenigen Minuten vollendet werden."/>
          <meta property="twitter:url" content="https://www.staffbite.de"></meta>
          <meta property="twitter:type" content="website"></meta>
          <link rel="canonical" href="https://www.staffbite.de" />
        </Helmet>
      {alert}
      <ReactBSAlert
      show={CreateingShiftplan}
      type='info'
      title="In Bearbeitung"
      showConfirm={false}
     >
      <Row>
        <Col>
          <p>Dein Schichtplan wird jetzt erstellt</p>
        </Col>
      </Row>
     </ReactBSAlert>
      <Joyride
          run={intro.stepsEnabled}
          stepIndex={intro.stepIndex}
          continuous={intro.continue}
          locale={{
            back: "Zurück",
            next: "Verstanden",
            skip: "Beenden",
            last: "Los geht's"
          }}
          tooltipComponent={Tooltip}
          callback={handleJoyrideCallback}
          showProgress={true}
          steps={intro.steps}
          disableScrolling={true}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
      <Container className="mt-4" fluid ref={containerRef}>
        <Row>
          <Col xs="0" md="4"></Col>
          <Col xs="12" md="4">
          <div>
          <Row hidden={!isAdmin} className="text-center">
              <Col>
              <div  className=" pt-5" id="adminView">
                <h3>Planer Ansicht</h3>
              </div>
              </Col>
          </Row>
          <Row hidden={!isAdmin} className="text-center mb-4">
              <Col>
                <div id="sharePlan">
                <Button size="sm" color="link" onClick={() => handleInvitationLink()}>
                  Einladungslink teilen
                  <i className="fas fa-share ml-1"></i>
                </Button>
                </div>
              </Col>
          </Row>
          </div>
          </Col>
          <Col xs="0" md="4"></Col>
        </Row>
          <Row hidden={!isEmployee} className="text-center mb-4">
              <Col>
                <h3>Mitarbeiter Ansicht</h3>
              </Col>
          </Row>
            <Row>
              <Col>
                <Row className="text-left">
                  <Col>
                    <Button color="link" onClick={() => dispatch(settingModal("demoSendFeedback"))}>Feedback</Button>
                  </Col>
                </Row>
              </Col>
              <Col>
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
              </Col>
        </Row>
        <Row className="pt-2">
          <div className="col">
            <Card className="card-calendar shiftplan">
              <CardHeader>
                <Row>
                  <Col>
                    <CalendarTitle />
                  </Col>
                  <Col>
                    <Row className="text-right">
                      <Col>
                          <Button color="link" size="sm" onClick={() => changeToToday()}>Heute</Button>
                          <Button
                          hidden={viewDayGridMonth}
                          className="btn-neutral"
                          color="link"
                          data-calendar-view="month"
                          onClick={() => changeView("dayGridMonth")}
                          size="sm"
                        >
                          Monat
                        </Button>
                        <Button
                        hidden={(viewListWeek || viewTimeGridWeek)}
                          className="btn-neutral"
                          color="link"
                          data-calendar-view="basicWeek"
                          onClick={() => handleShowViewBasedOnWidth()}
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
                          </Col>
                        </Row>
                  </Col>
                  <Col>      
                  <Row className="text-right">
                    <Col>
                        <Button hidden={(!viewListWeek || !isAdmin)} color="link" size="sm"
                        onClick={() => {
                          dispatch(settingModal("demoAddShift"));
                          updateStepIndex();
                          }}><i className="fas fa-plus" id="addListShift"/>
                        </Button>
                        <Button color="link" size="sm" onClick={() => changeToPrev()}><i className="fas fa-arrow-left"/></Button>
                        <Button color="link" size="sm" onClick={() => changeToNext()}><i className="fas fa-arrow-right"/></Button>
                    </Col>
                  </Row>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0 calendarHint" id="addCalendarShift">
                <Row>
                  <Col>
                  <FullCalendar
                        className="calendar"
                        data-toggle="calendar"
                        id="calendar"
                        ref={calendarRef}
                        plugins={[interaction, dayGridPlugin, timeGridPlugin, listPlugin]}
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
                            dayHeaderFormat: {weekday: "long", month: 'long', day: 'numeric'},
                          },
                          listWeek: {
                            titleFormat: { month: '2-digit', day: '2-digit' },
                            dayHeaderFormat: {weekday: "short", month: 'short', day: 'numeric'},
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
                        eventDidMount={() => createTour()}
                        windowResize={() => handleShowViewBasedOnWidth()}
                        locale="de"
                        eventDisplay="block"
                        // Add new event
                        select={(info) => {
                          if (viewTimeGridWeek && isAdmin) {
                            let getDay = info.start.getDay();
                            const day = weekdays[getDay];
                            dispatch(settingStart(info.start.toString()));
                            dispatch(settingShiftSlot({day: day}))
                            updateStepIndex(false, true);
                            dispatch(settingModal("demoAddShift"))
                          }
                          if(viewDayGridMonth) {
                            handleShowViewBasedOnWidth();
                          }

                        }}
                        // Edit calendar event action
                        eventClick={({ event }) => {
                          if (viewTimeGridWeek && isAdmin) {
                            dispatch(settingTemporaryEventId(event._def.extendedProps.id))
                            dispatch(settingModal("demoEditShift"))
                          }

                          if(viewTimeGridWeek && isEmployee) {
                            if(event._def.extendedProps.setApplicants[employee.id]) {
                              dispatch(settingTemporaryEventId(event._def.extendedProps.id));
                              dispatch(settingModal("demoApplyForShift"));
                            }

                            if(!event._def.extendedProps.setApplicants[employee.id]) {
                              dispatch(settingTemporaryEventId(event._def.extendedProps.id));
                              dispatch(settingModal("demoApplyForShift"));
                            }
                          }

                          if(viewListWeek && isEmployee) {
                            if(event._def.extendedProps.setApplicants[employee.id]) {
                              dispatch(settingTemporaryEventId(event._def.extendedProps.id));
                              dispatch(settingModal("demoApplyForShift"));
                            }

                            if(!event._def.extendedProps.setApplicants[employee.id]) {
                              dispatch(settingTemporaryEventId(event._def.extendedProps.id));
                              dispatch(settingModal("demoApplyForShift"));
                            }
                          }
                          if (viewListWeek && isAdmin) {
                            dispatch(settingTemporaryEventId(event._def.extendedProps.id))
                            dispatch(settingModal("demoEditShift"))
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
      <ModalAddShift isListView={viewListWeek} updateStepIndex={updateStepIndex}/>
      <ModalEditShift updateStepIndex={updateStepIndex}/>
      <ModalEmployees calendarRef={calendarRef.current}/>
      <ModalApplyForShift />
      <ModalSendFeedback />
      <ModalInvitationAdmin />
    </>
  );
}

export default CalendarDemo;
