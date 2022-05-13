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
import React, {useState, useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  FormGroup,
  Button,
  Input,
  CardBody
} from "reactstrap";
import LandingFooter from "../../components/Footers/LandingFooter.js";
// core 
import LandingNavBar from "../../components/Navbars/LandingNavbar.js";
import { thunkSendContactForm } from "../../store/middleware/ContactForm.js";
import store from "../../store.js";
import contactDefaults from "../../constants/ContactDefault"
import NotificationAlert from "react-notification-alert";
import { SUCCESS_EMAIL_IS_SEND, WARNING_EMAIL_NOT_SEND } from "../../constants/Alerts.js";
import ReactGA from "react-ga";
import { KONTAKT_DESCRIPTION, KONTAKT_TITLE } from "../../constants/MetaTexts.js";
import { Link } from "react-router-dom";
import ThemenSlider from "./Themen/ThemenSlider.js";
import Team from "../../assets/img/theme/Florian-Zellmann-und-Daniel-Zellmann.png"
import AboutUs from "./AboutUs.js";


function Contact (props) {
    const [form, setForm] = useState(contactDefaults);
    const [ErrMsng, setErrMsng] = useState({EmailNotSend: !1, EmailIsSend: !1});
    let mainContent = useRef("mainContent")

    let notificationAlert = useRef(null)
    useEffect(() => {
      pageViewsTracking()
    },[])

    useEffect(() => {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }, []);
  
    function pageViewsTracking () {
      const pathname = "/contact";
      let pageView;
      if(pathname === "*") pageView = "/not_found";
      else pageView = pathname;
    
      ReactGA.pageview(pageView);
    } 
    const selectErrorMessage = state => state.ErrorMessages;


    const ErrorMessages = useSelector(selectErrorMessage)

    useEffect(() => {
        setErrMsng({...ErrorMessages})
    }, []);

    useEffect(() => {
        setErrMsng({...ErrorMessages})
    }, [ErrorMessages]);

    
  function Notify (type, title, err) {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
          </span>
          <span data-notify="message">
            {title}
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
    setErrMsng({...ErrMsng, [err]: !1})
  };


    function onInputChange(event) {
        let key = event.target.name;
        let value = event.target.value;
        setForm({...form, [key]: value})
    }

    function onSubmitContactForm() {
        store.dispatch(thunkSendContactForm(form));
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
        }

    return (
      <>
    <div ref={mainContent}>
        <Helmet>
          <title>{KONTAKT_TITLE}</title>
          <meta name="description" charSet="utf-8" content={KONTAKT_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/contact" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite.",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
      { ErrMsng.EmailNotSend ? Notify("warning", WARNING_EMAIL_NOT_SEND, "EmailNotSend") : null}
      { ErrMsng.EmailIsSend ? Notify("success", SUCCESS_EMAIL_IS_SEND, "EmailIsSend") : null}
      <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlert} />
        </div>   
        <Container className="mt-6 mb-2">
            <Row className="justify-content-left ml-1 mt-4">
                <h1> Kontakt</h1>
            </Row>
        </Container>
        <Container className="pt-5" fluid>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col className="mb-5 mb-lg-0" lg="12" md="12">
                  <div className="px-4">
                    <img
                      alt="Abbildung der Gründer von Staffbite. Links steht Florian Zellmann. Rechts steht Daniel Zellmann."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={Team}
                      height="800px"
                      width="1000px"
                    />
                    <div className="pt-4 text-center">
                    <h2 className="title">
              <Row className="text-center">
                <Col>
                  <Link to="/contact">
                    <Button className="btn-icon btn-3 mt-2" color="success" type="button"><p className="p-0 m-0">Persönliches Erstgespräch vereinbaren</p></Button>
                  </Link>
                </Col>
              </Row>
                      <Row className="mt-4 mt-sm-5">
                        <Col xs="6">
                          <h3 className="d-block mb-1">Florian Zellmann</h3>
                        </Col>
                        <Col xs="6">
                          <h3 className="d-block mb-1 ">Daniel Zellmann</h3>
                        </Col>
                      </Row>
                      </h2>
                    </div>
                    <Row className="mt-sm-6">
                      <h2 className="mt-2">Florian Zellmann</h2>
                      <p>
                      Florian Zellmann ist Mitgründer von Staffbite und verantwortlich für die technische Umsetzung. Er interessiert sich seit einigen Jahren für verschiedenste Aspekte der Softwareentwicklung. Neben einem breiten Wissen bezüglich künstlicher Intelligenz, Algorithmen und Datenverarbeitung liegt sein Schwerpunkt vor allem auf responsiven Programmiersprachen, um das Nutzererlebnis unserer Kunden stetig zu verbessern. Im Studium arbeitete Florian in der Gastronomiebranche und lernte die Herausforderungen der Betriebe selbst kennen.
                      </p>
                    </Row>
                    <Row className="mt-sm-3">
                      <h2>Daniel Zellmann</h2>
                      <p>
                      Daniel Zellmann (M.A. Business Management) ist Mitgründer von Staffbite. Er ist verantwortlich für die operativen Geschäfte. Vor der Gründung von Staffbite arbeitete er mehrere Jahre als IT-Berater. Während der verschiedenen Kundenprojekte in ganz Deutschland sammelte er viel Erfahrung im Aufbau von skalierbaren Cloud-Infrastrukturen, Datenanalyse und der Automatisierung von Arbeitsabläufen. Sein Schwerpunkt liegt derzeit auf der kundenzentrierten Produktentwicklung. 
                      </p>
                    </Row>
                    <Row className="mt-sm-4">
                      <Link to="/impressum">Hier gehts zum Impressum</Link>
                    </Row>
                  </div>
                </Col>
              </Row>
        </Container>
      </Container>
        <Container className=" mb-4 mt-2">
        <Row className="justify-content-center mb-4">
                <Col lg="12">
                  <Card className="bg-white shadow mb-4 mt-4">
                    <CardBody className="p-lg-5">
                      <p className="ml-1 mb-3">Du möchtest ein Erstgespräch vereinbaren, um zu erfahren ob Staffbite zu dir passt oder hast weitere Fragen?</p>
                      <Row className="ml-1">
                      <p className="mb-3 mr-1">Schreib uns einfach bei WhatsApp unter: </p>
                      <p className="font-weight-bold mb-0 mr-1">0157 30 64 46 50 </p> 
                      <p className="mb-3">📲 oder füll das Formular unten aus.</p>
                      </Row>
                      <Row className="ml-1">
                        <p className="mb-3 mr-1">Du kannst auch direkt in deinen</p>
                        <Link to="/auth" > kostenlosen Probemonat</Link>
                        <p className="mb-0 ml-1"> starten und dir eine eigene Meinung bilden!</p>
                      </Row>
                      <Row className="ml-1">
                        <p className="mb-3 ml-1"> Wir freuen uns über dein Feedback! </p>
                      </Row>
                      <FormGroup className="pt-4">
                          <Row>
                              <Col lg="6">
                              <Row>
                                    <Col lg="6">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            Vorname
                                        </label>
                                        <Input type="text" name="firstname" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                                  <Col lg="6">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            Nachname
                                        </label>
                                        <Input type="text" name="lastname" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                              </Row>
                              </Col>
                          </Row>
                          <Row className="pt-4">
                          <Col lg="6">
                              <Row>
                                    <Col lg="12">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            E-Mail
                                        </label>
                                        <Input type="text" name="email" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                              </Row>
                              </Col>
                          </Row>
                          <Row className="pt-4">
                          <Col lg="6">
                              <Row>
                                    <Col lg="12">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            Tel. (optional)
                                        </label>
                                        <Input type="text" name="tel" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                              </Row>
                              </Col>
                          </Row>
                          <Row className="pt-4">
                          <Col lg="6">
                              <Row>
                                    <Col lg="12">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            Firma (optional)
                                        </label>
                                        <Input type="text" name="org" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                              </Row>
                              </Col>
                          </Row>
                          <Row className="pt-4">
                          <Col lg="6">
                              <Row>
                                    <Col lg="12">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            Betreff
                                        </label>
                                        <Input type="text" name="subject" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                              </Row>
                              </Col>
                          </Row>
                          <Row className="pt-4">
                          <Col lg="6">
                              <Row>
                                    <Col lg="12">
                                        <label className="form-control-label" htmlFor="basic-url">
                                            Deine Nachricht
                                        </label>
                                        <Input type="textarea" name="message" placeholder="Wir freuen uns auf deine Nachricht!" onChange={(e) => onInputChange(e)}></Input>
                                  </Col>
                              </Row>
                              </Col>
                          </Row>
                          </FormGroup>
                          <Button color="primary" onClick={() => onSubmitContactForm()}>Nachricht senden</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
        </Container>
        <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
    </>
  );
};
export default Contact;
