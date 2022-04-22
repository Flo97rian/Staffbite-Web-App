/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState, useLayoutEffect} from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  UncontrolledAlert,
  Navbar,
  Nav,
  Button,
  CardBody,
  CardText,
  CardTitle,
  NavbarToggler,
  Collapse,
  Badge,
  PaginationItem,
  PaginationLink,
  Pagination,
  Alert,
} from "reactstrap";
// core components
import FadeIn from 'react-fade-in';
import Joyride from 'react-joyride';
import Form from 'react-bootstrap/Form';
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import LandingNavBar from "../../../components/Navbars/LandingNavbar";
import LandingFooter from "../../../components/Footers/LandingFooter";
import { Link } from "react-router-dom";
import DemoInterface from "./DemoClass";
import SchichtplanView from "./Schichtplan/Schichtplan";
import BefuellungsView from "./AutomatisierteBefuellung/Schichtplan";
import OpenModal from "./Schichtplan/OpenModal";
import shiftplanStates from "../../../components/Application/defaults/ShiftplanDefault";
import { thunkStartDemoAlg } from "../../../store/middleware/StartDemoAlg";
import Schichtplan_Demo from "../../../assets/img/demo/Schichtplan_Demo.png"
import Schichtplan_Eintragen_Demo from "../../../assets/img/demo/Schichtplan_Eintragen_Demo.png"
import Uebersicht_Demo from "../../../assets/img/demo/Uebersicht_Demo.png"
import store from "../../../store";
import { isMobile } from "react-device-detect";
const initalShow = {
    logo: !0,
    basicLayout: !1,
    calenderLayout: !1,
    zeiterfassung: !1,
    gastro: !1,
    app: !1,
    automate: !1
};

const initalSchicht = {
    ShiftStart: "00:00",
    ShiftEnd: "24:00",
    ShiftName: "Name",
    ShiftPosition: "Leitung",
    frei: false,
    notice: "",
    prio: !1
}

function Demo (props) {
    const [show, setShow] = useState({...initalShow, logo: !0, basicLayout: !0});
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth > 1280 ? true : false);
    const [isOpen, setIsOpen] = useState(true)
    const [userInput, setUserInput] = useState(initalSchicht)
    const [showBewerber, setShowBewerber] = useState(false)
    const [showFilled, setShowFilled] = useState(false)
    const [alreadyShown, setAlreadyShown] = useState(["basicLayout"]);
    const [modal, setModal] = useState(!1);
    const [teamSize, setTeamSize] = useState(15);
    const [shiftSlot, setShiftSlot] = useState(!1);
    const [branche, setBranche] = useState("Gastronomie");
    const [modalKey, setModalKey] = useState("");
    const [applicationState, setApplicationState] = useState();
    const [schichtplan, setSchichtplan] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [state, setState] = useState({
        run: !1,
        steps: [
            {
                target: 'body',
                placement: 'center',
                locale: { 
                    next: <strong aria-label="skip">Nächster Schritt</strong>,
                    skip: <strong aria-label="skip">Beenden</strong>,
                   },
                content: "In den nächsten vier Schritten zeigen wir dir, wie du deinen individuellen Schichtplan erstellen kannst!",
                title: "Willkommen zu deinem digitalen Schichtplan"
              },
          {
            target: '.card_schichtplan',
            placement: 'top',
            locale: { 
                next: <strong aria-label="skip">Nächster Schritt</strong>,
                back: <strong aria-label="skip">Zurück</strong>,
                skip: <strong aria-label="skip">Beenden</strong>,
               },
            content: "In der Wochenansicht kannst du deinen Schichtplan nach deinen Anforderungen konfigurieren.",
            title: "Die Wochenübersicht"
          },
          {
            target: '.card_schichtenname',
            placement: 'top',
            content: "Im Schichtreiter kannst du Schichten bearbeiten. Du kannst den Namen, die Position, den Start- & Endzeitpunkt, sowie die benötigte Anzahl an Mitarbeitern für diese Schicht festlegen.",
            locale: { 
              next: <strong aria-label="skip">Nächster Schritt</strong>,
              back: <strong aria-label="skip">Zurück</strong>,
              skip: <strong aria-label="skip">Beenden</strong>,
             },
            title: "Der Schichtreiter"
          },
          {
            target: '.card_shift',
            placement: 'top',
            content: "Zusätzlich kannst du für einzelne Schichten Qualifikationsanforderungen und Notizen festlegen. Wir wünschen dir viel Spaß beim Ausprobieren!",
            locale: { 
              back: <strong aria-label="skip">Zurück</strong>,
              last: <strong aria-label="skip">Los geht's</strong>,
             },
            title: "Die einzelne Schicht"
          },
        ]
      })
    const { run, steps } = state;


    function handleStartTour(teamSize, branche) {
        setModal(!1);
        setModalKey("");
        setTeamSize(teamSize);
        setBranche(branche);
        setState({...state, run: !0});
    };
  useEffect(() => {
    pageViewsTracking()
    let application = new DemoInterface();
    setSchichtplan(application.getShiftplanPlan())
    handleShowModal("tour")
  },[])

  useEffect(() => {
      console.log("change");
  },[schichtplan])

    useEffect(() => {
    },[show])

    useEffect(() => {
    },[shiftSlot])

    useEffect(() => {
        console.log("fire");
    function handleResize() {
        console.log(window.innerWidth);
        if(window.innerWidth > 1280 && currentWidth !== true) {
            setCurrentWidth(true);
        }
        if(window.innerWidth < 1280 && currentWidth !== false) {
            setCurrentWidth(false);
        }
    }
        
    window.addEventListener('resize', handleResize)
    })

    useEffect(() => {
    },[state])

  function pageViewsTracking () {
    const pathname = "/demo";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 

  function handleShow (active) {
    ReactGA.event({
        category: 'Demo',
        action: 'Go to ' + active,
        })
    setShow({...initalShow, [active]: !0})
    setAlreadyShown([...alreadyShown, active]);
    if(showBewerber) {
        setShowBewerber(false);
    }
    if (showFilled) {
        setShowFilled(false);
    }
  }

  function handleWasShown (active) {
    ReactGA.event({
        category: 'Demo',
        action: 'Navbar show ' + active,
        })
    setShow({...initalShow, [active]: !0})
    setAlreadyShown([...alreadyShown, active]);
  }
  function handleShowModal(key, row = !1, day = !1) {
    if(key === "zusammenfassung") {
        ReactGA.event({
            category: 'Demo',
            action: 'show' + key,
        })
    }
      handleShiftSlot(row, day);
      setModalKey(key);
      setModal(!0);
  }

  function handleCloseModal () {
      setModalKey("");
      setModal(!1);
  }

  function handleShiftSlot(index, row) {
      console.log(index, row);
    setShiftSlot({row: index, col: row});
  }

    // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter)
    const handleEditShiftDetails = (index) => {
        let copyPlan = new DemoInterface()
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.updateSchichtInfo(index, userInput);
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan(shiftplan);
        setUserInput({...initalSchicht});
        setModal(!1);
      };

    const handleResetShiftNotice = () => {
        let copyPlan = new DemoInterface();
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.resetNotice(shiftSlot);
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan(shiftplan);
    };

    const handleSetApplicant = () => {
        let copyPlan = new DemoInterface()
        copyPlan.setShiftplanPlan(schichtplan);
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan(shiftplan);
        setUserInput({...initalSchicht});
        setModal(!1);
    }

    // Diese Funktion sorgt für die Bearbeitung von einzelnen Schichten innerhalb eines Schichtplanes (Name, Start, Ende, benötigte Mitarbeiter)
    const handleEditShift = (index, day) => {
        let copyPlan = new DemoInterface()
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.updateSingleShift(userInput, index, day);
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan(shiftplan);
        setUserInput({...initalSchicht});
        setModal(!1);
      };

    const handleSelectPrio = (qualifikation) => {
        let copyPlan = new DemoInterface();
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.updatePrio(qualifikation, shiftSlot);
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan(shiftplan);
        setUserInput({...initalSchicht});
    }

    const handleSimulateApplicants = () => {
        ReactGA.event({
            category: 'Demo',
            action: 'Simulate Applicants'
            })
        let copyPlan = new DemoInterface();
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.simulateApplicants();
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan([...shiftplan]);
        setShowBewerber(true);
        setUserInput({...initalSchicht});
    }

    async function handleBefuellung() {
        ReactGA.event({
            category: 'Demo',
            action: 'Start Algorithmus'
            })
        let copyPlan = new DemoInterface();
        copyPlan.setShiftplanPlan(schichtplan);
        let shiftplan = copyPlan.getShiftplanPlan()
        let employees = copyPlan.getEmployees();
        let demoResponse = await store.dispatch(thunkStartDemoAlg(shiftplan, employees));
        setShowBewerber(false);
        setSchichtplan(demoResponse.plan);
        setEmployees(demoResponse.employees);
        setShowFilled(true);
        
    }


    async function handleEditSetApplicants(DragAndDropRef) {
        let copyPlan = new DemoInterface();
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.setEmployees(employees);
        copyPlan.setApplicantInShiftplan(DragAndDropRef.current, shiftSlot);
        let newEmployees = copyPlan.getEmployees()
        let shiftplan = copyPlan.getShiftplanPlan()
        setEmployees(newEmployees);
        setSchichtplan(shiftplan);
        setShowBewerber(false);
        setShowFilled(true);
        setModal(false);
    }

    const handleActiveInactiveShift = () => {
        let copyPlan = new DemoInterface();
        copyPlan.setShiftplanPlan(schichtplan);
        copyPlan.shiftIsActive(shiftSlot.row, shiftSlot.col);
        let shiftplan = copyPlan.getShiftplanPlan()
        setSchichtplan([...shiftplan])
        }

    // Handling von Userinputs
    const handleInputChange = (event) => {
    let key = event.target.name;
    let val = stateSwitch(event.target.value, event);
    setUserInput({...userInput, [key]: val });
    };

      // Überprüfung von Userinputs, ob der Input vom Typ Switch ist
    const stateSwitch = (value, event) => {
    if (value !== "on") return value;
      let state = handleInputSwitch(event);
      return state;
    };

    // Diese Funktion ändert den Wert eines Switches, je nach userinput
    const handleInputSwitch = (event) => {
        if (event.target.checked !== !0) return !1;
            return !0;
        };
  function showLogo() {
    if(show.logo) {
        return (
            <>
                <Row className="mt-2 mb-6">
                    <Col>
                        <Link to="/">
                            <img
                            alt="Abbildung des Logos von Staffbite"
                            className="img-left img-fluid"
                            src={require("../../../assets/img/brand/Staffbite_Logo.png").default}
                            height="150px"
                            width="150px"
                            />
                        </Link>
                    </Col>
                </Row>
                {isMobile && window.innerWidth < 600 ?
                <Row>
                    <UncontrolledAlert>
                         <p>Diese Demo ist nicht für Smartphones ausgelget. Halte dein Smartphone seitlich oder besuche unsere Demo gerne an einem Laptop. </p>
                    </UncontrolledAlert>
                </Row>
                 : 
                <></>
                }
            </>
        );
    }
    return null;
  }


  function showGastro() {
    if (show.gastro) {
        return (
            <Card className="shadow">
                <Row className="ml-4 mt-2">
                    <Col className="text-center">
                        <h2>Gastronomie</h2>
                    </Col>
                </Row>
                <Row className="ml-4 mt-2">
                    <Col className="text-center">
                        <p className="lead">Willkommen in userer Demo für die Gastronomie</p>
                    </Col>
                </Row>
                <Row className="ml-4 mt-2">
                    <Col className="text-center">
                        <p>Wähle auf der rechten Seite die Vorschau für unsere Funktionalitäten aus 
                            <br/>
                            und konfiguriere mit wenigen Klicks die ideale Lösung für deinen Betrieb.
                            <br/>
                            <br/>
                            Anschließend kannst du mit deiner Konfiguration direkt in unseren kostenlosen Probemonat starten.</p>
                    </Col>
                </Row>
            </Card>
        );
      }
      return null;
  }

  function showApp() {
    if (show.app) {
        return (
            <FadeIn
            delay={100}
            transitionDuration={1800}
            >
                <Row className="ml-4 mt-4">
                    <Col className="text-center">
                        <h2 className="display-4">Eine App für deine Mitarbeiter</h2>
                        <p>
                            Entdecke unsere Mitarbeiter App. Die App kann dein Team kostenlos
                            <br/>
                            im App & Playstore herunterladen!
                        </p>
                    </Col>
                </Row>
                <Row className="mt-6">
                    <Col className="" xs="4" sm="4">
                        <img
                        className="pt-0 pb-0"
                        alt="Fertiger Schichtplan für dich und dein Team"
                        src={Uebersicht_Demo}
                        title="Beispiel eines vollständigen Schichtplans"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    <Col className="" xs="7" sm="7">
                        <Row className="mt-0 mx-2">
                            <Col>
                                <h4 className="display-4">Die Vorteile auf einen Blick</h4>
                            </Col>
                        </Row>
                        <Row className="mt-2 ml-2">
                        <Col>
                            <Card>
                                    <CardBody className="py-3">
                                        <Row>
                                        <Col xs="12">
                                            <CardTitle className="lead mt-0 mb-0 text-primary">
                                                Jederzeit einsehbar
                                            </CardTitle>
                                            <CardText>
                                                Per App kann dein Team jederzeit Schichtpläne & Tauschanfragen einsehen. So gehören Excel & Co. der Vergangenheit an.
                                            </CardText>
                                        </Col>  
                                    </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="mt-2 ml-2">
                        <Col>
                            <Card>
                                    <CardBody className="py-3">
                                        <Row>
                                        <Col xs="12">
                                            <CardTitle className="lead mt-0 mb-0 text-primary">
                                                Push-Benachrichtigungen & Erinnerungen
                                            </CardTitle>
                                            <CardText>
                                                Ist ein neuer Plan zum Eintragen oder Einsehen fertig? Dein Team erhält eine Nachricht direkt auf ihr Smartphone.
                                            </CardText>
                                        </Col>  
                                    </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="mt-2 ml-2">
                        <Col>
                            <Card>
                                    <CardBody className="py-3">
                                        <Row>
                                        <Col xs="12">
                                            <CardTitle className="lead mt-0 mb-0 text-primary">
                                                Tauschanfragen
                                            </CardTitle>
                                            <CardText>
                                                Ein Mitarbeiter fällt kurzfristig aus? Per Knopfdruck erhalten alle verfügbaren Mitarbeiter eine Nachricht, ob Sie einspringen können.
                                            </CardText>
                                        </Col>  
                                    </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-6">
                    <Col className="" xs="4" sm="4">
                        <img
                        className="pt-0 pb-0"
                        alt="Fertiger Schichtplan für dich und dein Team"
                        src={Schichtplan_Demo}
                        title="Beispiel eines vollständigen Schichtplans"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    <Col xs="4">
                        <Row className="mt-2">
                            <Col>
                                <h4 className="display-4">Probiere es selber aus</h4>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Card>
                                        <CardBody>
                                            <Row>
                                            <Col xs="12">
                                                <CardTitle className="lead-text mt-0 mb-0 text-primary">
                                                    iOS & Android
                                                </CardTitle>
                                                <CardText>
                                                    Die Mitarbeiter App findest du im App- & Playstore. Lade Sie runter und überzeuge dich selbst!
                                                </CardText>
                                            </Col>  
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Card>
                                        <CardBody>
                                            <Row>
                                            <Col xs="12">
                                                <CardTitle className="lead-text mt-0 mb-0 text-primary">
                                                    Das Feedback
                                                </CardTitle>
                                                <CardText>
                                                    Durch euer Feedback können & wollen wir noch besser werden. Aus diesem Grund freuen wir uns immer über euer Feedback! 
                                                </CardText>
                                            </Col>  
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="" xs="4" sm="4">
                        <img
                        className="pt-0 pb-0"
                        alt="Fertiger Schichtplan für dich und dein Team"
                        src={Schichtplan_Eintragen_Demo}
                        title="Beispiel eines vollständigen Schichtplans"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                </Row>
                <Row className="mt-2 mb-8">
                {renderForthAndBack()}
                </Row>
            </FadeIn>
        );
      }
      return null;
  }

  function showZusammenfassung() {
      let moreThenTwentyFive = teamSize > 25;
      let price;
      if (!moreThenTwentyFive) {
        let currentPrice = 9.90 + 2.50 * teamSize;
        price = String(currentPrice.toFixed(2)) + " ";
        price = price.replace(".", ",")

      } else {
        price =  "74,90 "
      }
    return (
        <Row className="fixed-bottom align-content-center mb-0">
            <Col xs="1" lg="3"></Col>
            <Col xs="10" lg="5">
                <Card className="mb-0" style={{"cursor": "pointer"}} onClick={() => handleShowModal("zusammenfassung")}>
                    <Row className="p-1 pt-2 px-3">
                        <Col>
                            <Row>
                            <a
                            className="avatar avatar-sm background-staffbite-success rounded-circle mt-2 mx-4"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            <p className="font-weight-normal ml-2 mt-2 mr-2 lead">
                                {price}
                                € mtl.
                                </p>
                                <p className="mt-2 ml-2">
                                |
                                </p>
                                <p className="mt-2 ml-4 pt-1">
                                Details einsehen
                                <i className="fas fa-arrow-right ml-3"></i>
                                </p>             
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col xs="1" lg="3"></Col>
        </Row>
    );
  }

  function showBasicLayout() {
      if (show.basicLayout) {
        return (
            <FadeIn
            delay={100}
            transitionDuration={1800}
            >
                <Row className="mt-4">
                    <Col>
                        <Row className="text-center">
                            <Col>
                                <h2 className="display-4">Entdecke digitale Schichtplanung</h2>
                                <p>
                                    Du kannst gleich loslegen! Wähle eine einzelne Schicht an oder 
                                    klicke auf der linken Seite 
                                    <br/>
                                    auf die Details für eine ganze Woche. Probiere es einfach aus!
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-4 card_schichtplan">
                            <Col>
                                <SchichtplanView
                                schichtplan={schichtplan}
                                handleShowModal={handleShowModal}
                                handleCloseModal={handleCloseModal}
                                handleShiftSlot={handleShiftSlot}
                                modal={modal}
                                modalKey={modalKey}
                                ></SchichtplanView>
                            </Col>
                        </Row>
                        {renderForthAndBack()}
                        <Row className="mt-4">
                            <Col>
                                <p className="display-4">Flexible Anpasungsmöglichkeiten</p>
                            </Col>
                        </Row>
                        <Row className="mt-0 mb-4">
                            <Col>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardBody>
                                                <Row>
                                                <Col xs="11">
                                                    <CardTitle className="lead-text mt-0 mb-0 text-primary">
                                                        Rollen & Positionen
                                                    </CardTitle>
                                                    <CardText>
                                                        Lege spezielle Rollen und Positionen nach deinen Wünschen fest.
                                                    </CardText>
                                                </Col>  
                                                {/*<Col xs="1">
                                                    <Row className="float-right mr-2">
                                                        <i
                                                        className="fas fa-arrow-down fa-lg mt-3"
                                                        ></i>
                                                    </Row>
                                                </Col>*/}
                                            </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Card>
                                            <CardBody>
                                                <Row>
                                                <Col xs="11">
                                                    <CardTitle className="lead-text mt-0 mb-0 text-primary">
                                                        Qualifikationsanforderungen
                                                    </CardTitle>
                                                    <CardText>
                                                        Du benötigst an bestimmten Tagen Mitarbeiter mit besonderer Erfahrung? 
                                                    </CardText>
                                                </Col>  
                                                {/*<Col xs="1">
                                                    <Row className="float-right mr-2">
                                                        <i
                                                        className="fas fa-arrow-down fa-lg mt-3"
                                                        ></i>
                                                    </Row>
                                                </Col>*/}
                                            </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardBody>
                                                <Row>
                                                <Col xs="11">
                                                    <CardTitle className="lead-text mt-0 mb-0 text-primary">
                                                        Push-Benachrichtigungen
                                                    </CardTitle>
                                                    <CardText>
                                                        Informiere deine Mitarbeiter jederzeit, wenn ein neuer Schichtplan zum Eintragen oder Einsehen breit ist.
                                                    </CardText>
                                                </Col>  
                                                {/*<Col xs="1">
                                                    <Row className="float-right mr-2">
                                                        <i
                                                        className="fas fa-arrow-down fa-lg mt-3"
                                                        ></i>
                                                    </Row>
                                                </Col>*/}
                                            </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </FadeIn>
        );
      }
      return null;
  }
  function showCalenderLayout() {
    if (show.calenderLayout) {
      return (
          <Card className="shadow">
              <Row className="ml-4 mt-2">
                  <Col>
                      <h4>Calender Layout</h4>
                  </Col>
              </Row>
          </Card>
      );
    }
    return null;
}

function showAutomate() {
    if (show.automate) {
      return (
          <FadeIn
          delay={100}
          transitionDuration={1800}
          >
        <Row className="mt-6">
        <Col>
            <Row className="text-center">
                <Col>
                    <h2 className="text-center display-4">Entdecke unsere Automatisierung</h2>
                    <p>Probier es gerne aus und überzeuge dich selbst! Mit einem Klick kannst du Bewerber simulieren <br/>und im Anschluss die Automatisierung der Befüllung testen.</p>
                    <Row className="mt-3 text-center">
                        <Col> 
                    {!showBewerber 
                    ? 
                    <p className="lead text-primary" style={{"cursor": "pointer"}} onClick={() => handleSimulateApplicants()}>Jetzt Bewerber simulieren</p>
                    :
                    <p className="lead text-primary" style={{"cursor": "pointer"}} onClick={() => handleBefuellung()}>Jetzt Automatisierung starten</p>
                    }
                </Col>
            </Row>
                </Col>
            </Row>
            <Row className="mt-4 card_schichtplan">
                <Col>
                    <BefuellungsView
                    schichtplan={schichtplan}
                    handleShowModal={handleShowModal}
                    handleCloseModal={handleCloseModal}
                    handleShiftSlot={handleShiftSlot}
                    modal={modal}
                    employees={employees}
                    showBewerber={showBewerber}
                    showFilled={showFilled}
                    modalKey={modalKey}
                    ></BefuellungsView>
                </Col>
            </Row>
            {renderForthAndBack()}
        </Col>
    </Row>
    </FadeIn>
      );
    }
    return null;
}

function showZeiterfassung() {
    if (show.zeiterfassung) {
      return (
          <Card className="shadow">
              <Row className="ml-4 mt-2">
                  <Col>
                      <h4>Zeiterfassung</h4>
                  </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                </Col>
                <Col className="text-center">
                    <Button color="success">
                        Hinzufügen
                    </Button>
                </Col>
            </Row>
          </Card>
      );
    }
    return null;
}

function renderConfigSelected(title, active) {
    if(show[active]) {
        return (
            <Row className="mt-2 text-center">
                <Col>
                <Row>
                        <p className="mt-1 font-weight-bold lead mb-0" style={{"cursor": "pointer"}} onClick={() => handleWasShown(active)}>
                            <a
                            className="avatar avatar-xs background-staffbite-success rounded-circle mr-3"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            {title}
                        </p>
                    </Row>
                </Col>
            </Row>
        )
    } else if (!show[active]) {
        return (
            <Row className="mt-1">
                <Col>
                    <Row>
                        <p className="mt-1 mb-0" style={{"cursor": "pointer"}} onClick={() => handleWasShown(active)}>
                            {alreadyShown.includes(active) ? 
                            <a
                            className="avatar avatar-xs background-staffbite-success rounded-circle mr-3"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            : 
                            <a
                            className="avatar avatar-xs background-light rounded-circle mr-3"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            }
                            {title}
                        </p>
                    </Row>
                </Col>
            </Row>
        )
    }
}

function toggle() {
    setIsOpen(!isOpen);
}
function renderNav () {
    let show = !0;
    if (show) {
        return (
            <>
            <Nav vertical >
            <Container>
            <Row className="mt-6">
                                <Col className="mr-0">
                                    <Row className="mt-4 text-center">
                                        <h2 className="mb-0 pb-0">Konfiguriere deine Demo</h2>
                                    </Row>
                                    <Row className="mt-6 mb-0 text-center">
                                        <Col>
                                            <Row className="text-center">
                                                <p className="font-weight-bold lead p-0 mx-5 m-0 text-md">
                                                    {teamSize}
                                                </p>
                                                <p className="font-weight-bold lead p-0 mx-2 m-0 text-md">
                                                    {branche}
                                                </p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1 mb-0 text-center">
                                        <Col>
                                            <Row className="text-center">
                                                <p className="font-weight-light p-0 mx-4 m-0 text-md">
                                                    Teamgröße
                                                </p>
                                                <p className="font-weight-light p-0 mx-4 m-0 text-md">
                                                    Branche
                                                </p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="mt-6 mb-0 text-center">
                                        <Col>
                                            <Row className="text-center">
                                                <p className="font-weight-normal p-0 m-0 text-md lead">
                                                    Unsere Empfehlung:
                                                    {" "}{" "}
                                                </p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {renderConfigSelected("Digitaler Schichtplan", "basicLayout")}
                                    {renderConfigSelected("Automatisierte Befüllung", "automate")}
                                    {renderConfigSelected("Mitarbeiter App", "app")}
                                    <Row className="mt-6 mb-4">
                                        <Col className="">
                                            <Button color="primary font-weight-light border-lg rounded-pill px-7 py-2" onClick={() => handleShowModal("zusammenfassung")}>
                                                <p className="p-0 m-0">
                                                    Direkt starten
                                                </p>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                    </Container>
                    </Nav>
        </>
        )
    }
}

function renderForthAndBack () {

    let showKeys = ["basicLayout", "automate", "app"]
    let currentKeys = showKeys.filter(key => show[key] === true);
    let indexOfKey = showKeys.indexOf(currentKeys[0]);
    if (indexOfKey === 0) {
        return (
            <Row className="text-right mt-2 mr-3">
                <Col>
                    <p className=" lead text-primary" style={{"cursor": "pointer"}} onClick={() => handleShow(showKeys[indexOfKey + 1])}>
                        Hier geht's zur Automatisierung
                        {' '}
                        <i className="fas fa-arrow-right ml-3"></i>
                    
                    </p>
            </Col>
            </Row>
        )
    } else if (indexOfKey === 1) {
        return (
            <Row className="mb-6">
                <Col>
                    <p className="lead text-primary" style={{"cursor": "pointer"}} onClick={() => handleShow(showKeys[indexOfKey - 1])}>
                        <i className="fas fa-arrow-left mr-3"></i>
                        {' '}
                        Zurück zum Schichtplan
                    </p>
                </Col>
                <Col>
                        <p className="lead text-right text-primary mr-4" style={{"cursor": "pointer"}} onClick={() => handleShow(showKeys[indexOfKey + 1])}>
                            Weiter zur Mitarbeiter App
                            {' '}
                        <i className="fas fa-arrow-right ml-3"></i>
                        </p>
                </Col>
            </Row>
        )
    } else if (indexOfKey === 2) {
        return (
            <Row className="text-left mt-4 mx-3">
            <Col>
                <p className="lead text-primary" style={{"cursor": "pointer"}} onClick={() => handleShow(showKeys[indexOfKey - 1])}>
                    <i className="fas fa-arrow-left"></i>
                    {' '}
                    Zurück zur Automatisierung
                </p>
        </Col>
        </Row>
        )
    }
}
    return (
    <>
        <Helmet>
        </Helmet>
        <Joyride
          continuous={true}
          run={run}
          disableScrolling={true}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
              primaryColor: "#2dce89"
            },
          }}
        />
        {/* 
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
                */}
      {/* Page content */}
      <Container className="mr-0 container_top" fluid>
          <Row>
              <Col>
        <section className="section">
              <Row className="mb-4 mt-4 ml-2">
                  <Col md="12" lg="12">
                      {showZusammenfassung()}
                      {showLogo()}
                      {showGastro()}
                      {showBasicLayout()}
                      {showCalenderLayout()}
                      {showZeiterfassung()}
                      {showApp()}
                      {showAutomate()}
                  </Col>
              </Row>
          </section>
          </Col>
          {currentWidth ? <Col md="0" lg="3">
          {renderNav()}
          </Col>
          :
          <></>
        }
          </Row>
      </Container>
      <OpenModal
      modal={modal}
      modalkey={modalKey}
      userInput={userInput}
      onChange={handleInputChange}
      handleActiveInactiveShift={handleActiveInactiveShift}
      handleCloseModal={handleCloseModal}
      handleStartTour={handleStartTour}
      handleEditShiftDetails={handleEditShiftDetails}
      handleEditShift={handleEditShift}
      handleSelectPrio={handleSelectPrio}
      handleEditSetApplicants={handleEditSetApplicants}
      handleResetShiftNotice={handleResetShiftNotice}
      employees={employees}
      branche={branche}
      shiftSlot={shiftSlot}
      Schichtplan={schichtplan}
      teamSize={teamSize}
      ></OpenModal>
    </>
  );
};
export default Demo;