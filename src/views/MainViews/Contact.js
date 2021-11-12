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
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Button,
  FormText,
  Input,
  CardBody
} from "reactstrap";
import LandingFooter from "../../components/Footers/LandingFooter.js";
// core 
import LandingNavBar from "../../components/Navbars/LandingNavbar.js";
import { thunkSendContactForm } from "../../store/middleware/ContactForm.js";
import store from "../../store.js";
import contactDefaults from "../../components/Application/defaults/ContactDefault.js";
import NotificationAlert from "react-notification-alert";
import { SUCCESS_EMAIL_IS_SEND, WARNING_EMAIL_NOT_SEND } from "../../constants/Alerts.js";

function Contact () {
    const [form, setForm] = useState(contactDefaults);
    const [ErrMsng, setErrMsng] = useState({EmailNotSend: !1, EmailIsSend: !1});
    let notificationAlert = useRef(null)

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
        console.log(form, key, value)
        setForm({...form, [key]: value})
    }

    function onSubmitContactForm() {
        store.dispatch(thunkSendContactForm(form));
        }

    return (
    <>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "...",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
      { ErrMsng.EmailNotSend ? Notify("warning", WARNING_EMAIL_NOT_SEND, "EmailNotSend") : null}
      { ErrMsng.EmailIsSend ? Notify("success", SUCCESS_EMAIL_IS_SEND, "EmailIsSend") : null}
      <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlert} />
        </div>   
        <Container className="mt-6 mb-2">
            <Row className="justify-content-left ml-1 mt-8">
                <h1> Kontakt</h1>
            </Row>
        </Container>
        <Container className=" mb-4 mt-2">
        <Row className="justify-content-center mb-4">
                <Col lg="12">
                  <Card className="bg-white shadow mb-4 mt-4">
                    <CardBody className="p-lg-5">
                      <p className="mb-3">Du möchtest Staffbite testen oder hast Fragen?</p>
                      <Row className="ml-1">
                      <p className="mb-3 mr-1">Schreib uns an </p>
                      <p className="font-weight-bold mb-0 mr-1">info@staffbite.de </p> 
                      <p className="mb-3">oder füll das Formular unten aus.</p>
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
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Contact;
