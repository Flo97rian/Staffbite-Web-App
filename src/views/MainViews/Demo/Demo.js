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
import React, {useEffect, useState} from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  Button,
  Badge,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";
// core components
import Joyride from 'react-joyride';
import Form from 'react-bootstrap/Form';
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import LandingNavBar from "../../../components/Navbars/LandingNavbar";
import LandingFooter from "../../../components/Footers/LandingFooter";
import { Link } from "react-router-dom";
import DemoInterface from "./DemoClass";
import SchichtplanView from "./Schichtplan/Schichtplan";
import OpenModal from "./Schichtplan/OpenModal";
const initalShow = {
    logo: !0,
    basicLayout: !1,
    calenderLayout: !1,
    zeiterfassung: !1,
    gastro: !1,
    app: !1,
    automate: !1
};

function Demo (props) {
    const [show, setShow] = useState({...initalShow, logo: !0, basicLayout: !0});
    const [alreadyShown, setAlreadyShown] = useState(["basicLayout"]);
    const [modal, setModal] = useState(!1);
    const [teamSize, setTeamSize] = useState(15);
    const [branche, setBranche] = useState("Gastronomie");
    const [modalKey, setModalKey] = useState("");
    const [applicationState, setApplicationState] = useState();
    const [schichtplan, setSchichtplan] = useState(null);
    const [state, setState] = useState({
        run: !1,
        steps: [
            {
                target: 'body',
                placement: 'center',
                locale: { 
                    next: <strong aria-label="skip">Nächster Schritt</strong>,
                   },
                content: "ONBOARDING_OVERVIEW_SHIFTRADE",
                title: "Digitaler Schichtplan"
              },
          {
            target: '.card_schichtplan',
            placement: 'top',
            locale: { 
                next: <strong aria-label="skip">Nächster Schritt</strong>,
               },
            content: "ONBOARDING_OVERVIEW_SHIFTRADE",
            title: "Die Wochenübersicht"
          },
          {
            target: '.card_wochentage',
            placement: 'bottom',
            content: "ONBOARDING_OVERVIEW_SHIFTPLAN",
            locale: { 
              back: <strong aria-label="skip">Zurück</strong>,
              next: <strong aria-label="skip">Nächster Schritt</strong>,
             },
            title: "Wochentage"
          },
          {
            target: '.card_schichtenname',
            placement: 'right',
            content: "ONBOARDING_OVERVIEW_SHIFTPLAN",
            locale: { 
              back: <strong aria-label="skip">Zurück</strong>,
              last: <strong aria-label="skip">Beenden</strong>
             },
            title: "Schichten"
          }
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
  },[schichtplan])

    useEffect(() => {
    },[show])

    useEffect(() => {
    },[state])

  function pageViewsTracking () {
    const pathname = "/demo";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 

  function handleWasShown (active) {
    setShow({...initalShow, [active]: !0})
    setAlreadyShown([...alreadyShown, active]);
  }
  function handleShowModal(key) {
      setModalKey(key);
      setModal(!0);
  }

  function handleCloseModal () {
      setModalKey("");
      setModal(!1);
  }

  function showLogo() {
    if(show.logo) {
        return (
                <Row className="mt-2 mb-6">
                    <Col>
                    <img
                      alt="Abbildung der Gründer von Staffbite. Links steht Florian Zellmann. Rechts steht Daniel Zellmann."
                      className="rounded-circle img-left img-fluid  shadow-lg--hover"
                      src={require("../../../assets/img/brand/Staffbite_Logo.png").default}
                      height="150px"
                      width="150px"
                    />
                    </Col>
                </Row>
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
            <Card className="shadow">
                <Row className="ml-4 mt-4">
                    <Col className="text-center">
                        <h2 className="display-4">Mitarbeiter App</h2>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col className="">
                        <h4>Mitarbeiter App</h4>
                    </Col>
                </Row>
            </Card>
        );
      }
      return null;
  }

  function showZusammenfassung() {
    return (
        <Row className="fixed-bottom mb-0">
            <Col xs="3"></Col>
            <Col xs="5">
                <Card className="mb-0" onClick={() => handleShowModal("zusammenfassung")}>
                    <Row className="p-1 pt-2 px-3">
                        <Col>
                            <Row>
                            <a
                            className="avatar avatar-sm background-staffbite-success rounded-circle mt-2 mx-4"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            <p className="font-weight-normal ml-2 mt-2 mr-2 lead">
                                {teamSize < 25 ? String((9.90 + 2.50 * teamSize) + " ") : "74,90 "}
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
            <Col xs="4"></Col>
        </Row>
    );
  }

  function showBasicLayout() {
      if (show.basicLayout) {
        return (
                <Row className="mt-8">
                    <Col>
                        <Row className="text-center">
                            <Col>
                                <h2 className="text-center display-4">Dein digitaler Schichtplan</h2>
                            </Col>
                        </Row>
                        <Row className="mt-6 card_schichtplan">
                            <Col>
                                <SchichtplanView
                                schichtplan={schichtplan}
                                handleShowModal={handleShowModal}
                                handleCloseModal={handleCloseModal}
                                modal={modal}
                                modalKey={modalKey}
                                ></SchichtplanView>
                            </Col>
                        </Row>
                        <Row className="mt-6">
                            <Col>
                                <p className="lead">Allgemeine Einstellungen</p>
                            </Col>
                        </Row>
                        <Row className="mt-0 mb-4">
                            <Col>
                                <Row className="mt-2">
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Mindestanforderungen für Schichten festlegen?
                                                </p>
                                            </Col>
                                            <Col>
                                                <Form.Check classname="ml-6" custom type="switch"></Form.Check>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Positionsanforderungen für Schicht festlegen?
                                                </p>
                                            </Col>
                                            <Col>
                                                <Form.Check classname="ml-6" custom type="switch"></Form.Check>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Schichten dürfen eigentständig von Mitarbeitern getauscht werden?
                                                </p>
                                            </Col>
                                            <Col>
                                                <Form.Check classname="ml-6" custom type="switch"></Form.Check>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <h2 className="">Erweiterte Einstellungen</h2>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <p className="lead">Mitarbeiter Benachrichtigungen</p>
                            </Col>
                        </Row>
                        <Row className="mt-0 mb-8">
                            <Col>
                                <Row className="mt-2">
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Automatische Benachrichtigung zum Eintragen senden?
                                                </p>
                                            </Col>
                                            <Col>
                                                <Form.Check classname="ml-6" custom type="switch"></Form.Check>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Automatische Benachrichtigung bei neuem Schichtplan senden?
                                                </p>
                                            </Col>
                                            <Col>
                                                <Form.Check classname="ml-6" custom type="switch"></Form.Check>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <p>
                                                    Automatische Erinnerung an das Team senden?
                                                </p>
                                            </Col>
                                            <Col>
                                                <Form.Check classname="ml-6" custom type="switch"></Form.Check>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
          <Card className="shadow">
              <Row className="ml-4 mt-2">
                  <Col>
                      <h4>Automatisierte Befüllung</h4>
                  </Col>
              </Row>
          </Card>
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
            <Row className="mt-0 text-center">
                <Col>
                    <Row className=" mt-0 text-center">
                    <Button color="text-uppercase lead border-lg rounded-pill border-staffbite-primary border-width btn-outline mt-1" style={{"borderWidth": "0.2rem"}}>
                        <p className="lead p-0 m-0">
                            {title}
                            {" "}{" "}
                            <i className="fas fa-arrow-right ml-6" onClick={() => setShow({...initalShow, [active]: !0})}></i>
                            </p>
                    </Button>
                    </Row>
                </Col>
            </Row>
        )
    } else if (!show[active]) {
        return (
            <Row className="mt-2">
                <Col>
                    <Row>
                        <p className="mt-2 lead" onClick={() => handleWasShown(active)}>
                            {alreadyShown.includes(active) ? 
                            <a
                            className="avatar avatar-xs background-staffbite-success rounded-circle mr-3"
                            >
                            <i className="fas fa-check"></i>
                            </a>
                            : 
                            <a
                            className="avatar avatar-xs rounded-circle mr-3 pt-4"
                            >
                            </a>
                            }
                            {title}
                            {" "}{" "}
                            <i className="fas fa-arrow-right ml-2"></i>
                        </p>
                    </Row>
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
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              zIndex: 10000,
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
        <section className="section">
              <Row className="mb-4 mt-4 ml-2">
                  <Col lg="12" xl="9">
                      {showZusammenfassung()}
                      {showLogo()}
                      {showGastro()}
                      {showBasicLayout()}
                      {showCalenderLayout()}
                      {showZeiterfassung()}
                      {showApp()}
                      {showAutomate()}
                  </Col>
                  <Col lg="12" xl="3" className="mr-0">
                        <Row className="ml-4 mt-2 text-center">
                            <Col className="mr-0">
                                <Row className="mt-4 text-center">
                                    <h2 className="mb-0 pb-0">Konfiguriere deine Demo</h2>
                                </Row>
                                {/*<Row className="mt-1">
                                    <p className="lead">
                                        Wähle deine Branche:
                                        <Input type="select" className="form-control-alternative edit-event--description input-autosize form-control">
                                            <option>Gastronomie</option>
                                            <option>Einzelhandel</option>
                                            <option>Kaffee</option>
                                        </Input>
                                    </p>
                                </Row>
                                <Row className="mt-2">
                                    <p className="lead">
                                        Wähle dein Bewerbungssystem:
                                        <Input type="select" className="form-control-alternative edit-event--description input-autosize form-control">
                                            <option>Bewerbungssystem</option>
                                            <option>Ampelsystem</option>
                                        </Input>
                                    </p>
                                </Row>*/}
                                {/*<Row className="mt-2">
                                    <p className="font-weight-bold lead">
                                        Usere Empfehlungen:
                                    </p>
                                </Row>*/}
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
                                            <p className="font-weight-normal p-0 m-0 text-md">
                                                Unsere Empfehlung:
                                                {" "}{" "}
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>
                                {renderConfigSelected("Digitaler Schichtplan", "basicLayout")}
                                {renderConfigSelected("Automatisierte Befüllung", "automate")}
                                {renderConfigSelected("Mitarbeiter App", "app")}
                                {renderConfigSelected("Zeiterfassung", "zeiterfassung")}
                                <Row className="mt-6 mb-4">
                                    <Col className="text-center">
                                        <Button color="primary font-weight-light border-lg rounded-pill">
                                            Fortfahren
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                  </Col>
              </Row>
          </section>
      </Container>
      <OpenModal
      modal={modal}
      modalkey={modalKey}
      handleCloseModal={handleCloseModal}
      handleStartTour={handleStartTour}
      branche={branche}
      teamSize={teamSize}
      ></OpenModal>
    </>
  );
};
export default Demo;