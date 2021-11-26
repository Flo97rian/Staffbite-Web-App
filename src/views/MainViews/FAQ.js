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
import React, { useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { ImageGroup, Image } from 'react-fullscreen-image'
import { Helmet } from "react-helmet";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";
// core components
import SchichtplanBeispiel from "../../assets/img/theme/Schichtplan-automatisiert-erstellen.png"
import SchichtplanEntwurf from "../../assets/img/theme/Schichtplan-erstellen.png"
import TeamVerwalten from "../../assets/img/theme/Mitarbeiter-erstellen-und-verwalten.png"
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";

function FAQ () {
  const [open, setOpen] = useState({Registrieren: !1, MitarbeiterAnlegen: !1, SchichtenTauschen: !1, Support: !1, ProbeMonat: !1})


  function toggleOpen(id) {
    setOpen({...open, [id]: !open[id]})
  }
    return (
    <>
        <Helmet>
          <title>Automatisierter Schichtplan</title>
          <meta name="description" content="Individuell anpassbar. Automatisierte Schichtpläne"/>
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      <Container className="pt-5 pb-2" fluid>
      <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-4">
                        <h1>Häufig gestelle Fragen</h1>
                    </Row>
                </Container>
            <Container className="mb-4 pt-4">
              <Row className="align-items-center mb-2">
              <Col className="order-md-1 pr-md-5" md="12" lg="12">
                <Card 
                className="p-3"
                onClick={(() => toggleOpen("Registrieren"))}>
                    <h3 className="mb-0">
                      Wie kann ich meinen Betrieb bei Staffbite registrieren?
                      {open.Registrieren ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                    </h3>
                    {open.Registrieren 
                    ? 
                    <>
                      <p className="mt-2">
                      Um deinen Betrieb zu registrieren, kannst du einfach oben auf unserer Website auf „Kostenlos Testen“ klicken. Anschließend benötigst du deine Mailadresse und ein sicheres Passwort. Hierbei fallen keinerlei Kosten an – starte direkt in deinen <Link to="/signup" target="_blank">kostenloser Probemonat</Link>!
                      In diesem Video kannst du mehr über die Registrierung und die ersten Schritte mit Staffbite erfahren.
                      </p>
                      <Link to={{ pathname: "https://youtu.be/R0SpszGT0k8" }} target="_blank">Zum Video: Wie registriere ich meinen Betrieb?</Link>
                    </>
                  :
                  <></>}
                </Card>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
              <Col className="order-md-1 pr-md-5" md="12" lg="12">
              <Card 
                className="p-3"
                onClick={(() => toggleOpen("MitarbeiterAnlegen"))}>
                    <h3 className="mb-0">
                      Wie kann ich meine Mitarbeiter*innen anlegen? 
                      {open.MitarbeiterAnlegen ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                    </h3>
                    {open.MitarbeiterAnlegen 
                    ? 
                    <>
                      <p className="mt-2">
                      Nachdem du dich bei uns registriert hast, kannst du sofort starten. Im Reiter „Team“ kannst du dein Team verwalten. Klicke auf „Mitarbeiter erstellen“ und gib die benötigten Daten ein. Deine Mitarbeiter*innen erhalten anschließend eine Mail mit ihren persönlichen Login-Daten. 
                      </p>
                      <p>
                      Hier findest du ein Video zu den grundlegenden Schritten, um dein Team einzuladen.
                      </p>
                      <Link to={{ pathname: "https://youtu.be/RtKKaWkCPrs" }} target="_blank">Zum Video: Mitarbeiter anlegen</Link>
                    </>
                  :
                  <></>}
                </Card>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
              <Col className="order-md-1 pr-md-5" md="12" lg="12">
              <Card 
                className="p-3"
                onClick={(() => toggleOpen("SchichtenTauschen"))}>
                    <h3 className="mb-0">
                      Wie kann mein Team untereinander Schichten tauschen?
                      {open.SchichtenTauschen ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                      </h3>
                    {open.SchichtenTauschen 
                    ? 
                    <>
                      <p className="mt-2">
                        Nachdem du den fertigen Schichtplan veröffentlicht hast, kann dein Team den Schichtplan online einsehen. Wenn eines deiner Teammitglieder krank ist oder eine Schicht tauschen möchte, kann die Person einfach auf die zugeteilte Schicht klicken. Dort findet sich ein Button „Tauschanfrage senden“. 
                      </p>
                    </>
                  :
                  <></>}
                </Card>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
              <Col className="order-md-1 pr-md-5" md="12" lg="12">
              <Card 
                className="p-3"
                onClick={(() => toggleOpen("Support"))}>
                    <h3 className="mb-0">
                      Wann sind die Supportzeiten? 
                      {open.Support ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                      </h3>
                    {open.Support 
                    ? 
                    <>
                      <p className="mt-2">
                        In kürze Verfügbar!
                      </p>
                    </>
                  :
                  <></>}
                </Card>
                </Col>
              </Row>
              <Row className="align-items-center mb-2">
              <Col className="order-md-1 pr-md-5" md="12" lg="12">
              <Card 
                className="p-3"
                onClick={(() => toggleOpen("ProbeMonat"))}>
                    <h3 className="mb-0">
                      Wie bekomme ich den kostenlosen Probemonat?
                      {open.ProbeMonat ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                      </h3>
                    {open.ProbeMonat 
                    ? 
                    <>
                      <p className="mt-2">
                        In kürze Verfügbar!
                      </p>
                    </>
                  :
                  <></>}
                </Card>
                </Col>
              </Row>
            </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default FAQ;