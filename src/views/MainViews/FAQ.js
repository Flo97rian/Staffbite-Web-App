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
import React, { useState, useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import ReactGA from "react-ga";
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
import { FAQ_DESCRIPTION, FAQ_TITLE } from "../../constants/MetaTexts";

function FAQ (props) {
  const [open, setOpen] = useState({Registrieren: !1, MitarbeiterAnlegen: !1, SchichtenTauschen: !1, Support: !1, ProbeMonat: !1, MARegistrieren: !1, AV: !1})
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/faq";
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 


  function toggleOpen(id) {
    setOpen({...open, [id]: !open[id]})
  }
    return (
    <>
        <Helmet>
          <title>{FAQ_TITLE}</title>
          <meta name="description" content={FAQ_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/faq" />
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
                    <h2 className="h3 mb-0">
                      Wie kann ich meinen Betrieb bei Staffbite registrieren?
                      {open.Registrieren ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                    </h2>
                    {open.Registrieren 
                    ? 
                    <>
                      <p className="mt-2">
                      Um deinen Betrieb zu registrieren, kannst du einfach oben auf unserer Website auf „Kostenlos testen“ klicken. Anschließend benötigst du deine Mailadresse und ein sicheres Passwort. Hierbei fallen keinerlei Kosten an – starte direkt in deinen <Link to="/signup" target="_blank">kostenlosen Probemonat</Link>!
                      
                      </p>
                      In diesem Video kannst du mehr über die Registrierung und die ersten Schritte mit Staffbite erfahren:
                      <Link to={{ pathname: "https://youtu.be/R0SpszGT0k8" }} target="Zum Video:"> Wie registriere ich meinen Betrieb?</Link>
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
                    <h2 className="h3 mb-0">
                      Wie kann ich meine Mitarbeiter*innen anlegen? 
                      {open.MitarbeiterAnlegen ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                    </h2>
                    {open.MitarbeiterAnlegen 
                    ? 
                    <>
                      <p className="mt-2">
                      Nachdem du dich bei uns registriert hast, kannst du sofort starten. Im Reiter „Team“ kannst du dein Team verwalten. Klicke auf „Mitarbeiter einladen“ und gib die benötigten Daten ein. Deine Mitarbeiter*innen erhalten anschließend eine Mail mit ihren persönlichen Login-Daten. 
                      </p>
                      Hier findest du ein Video zu den grundlegenden Schritten, um dein Team einzuladen:
                      <Link to={{ pathname: "https://youtu.be/RtKKaWkCPrs" }} target="_blank">Mitarbeiter anlegen</Link>
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
                onClick={(() => toggleOpen("MARegistrieren"))}>
                    <h2 className="h3 mb-0">
                      Wie sind die ersten Schritte bei Staffbite als Mitarbeiter*in?
                      {open.MARegistrieren ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                    </h2>
                    {open.MARegistrieren 
                    ? 
                    <>
                      <p className="mt-2">
                      Schau als erstes direkt in deine Mails. Um dich anmelden zu können, musst du bereits von der verantwortlichen Person aus deinem Betrieb eingeladen worden sein. Schau am besten auch im Spam-Ordner nach, falls du die Mail nicht findest.
                      </p>
                      <p className="mt-2">
                      Nachdem du den nötigen Prozess durchlaufen hast, kannst du dich mit deinen individuellen Daten anmelden. Wenn bereits ein Schichtplan erstellt wurde, dann klick oben in der Leiste auf „Eintragen“. Dort kannst du dich einfach und bequem eintragen.
                      </p>
                      Wenn du noch mehr Informationen haben möchtest, guck dir doch dieses Video an: 
                      <Link to={{ pathname: "https://youtu.be/vo-mdjMPtyY" }} target="_blank">Erste Schritte als Mitarbeiter*in</Link>
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
                    <h2 className="h3 mb-0">
                      Wie kann mein Team untereinander Schichten tauschen?
                      {open.SchichtenTauschen ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                      </h2>
                    {open.SchichtenTauschen 
                    ? 
                    <>
                      <p className="mt-2">
                        Nachdem du den fertigen Schichtplan veröffentlicht hast, kann dein Team den Schichtplan online einsehen.
                      </p>
                      Wenn eines deiner Teammitglieder krank ist oder eine Schicht tauschen möchte, kann die Person einfach auf die zugeteilte Schicht klicken. 
                      Dort findet sich ein Button „Tauschanfrage senden“.
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
                    <h2 className="h3 mb-0">
                      Wie erhalte ich Support? 
                      {open.Support ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                      </h2>
                    {open.Support 
                    ? 
                    <>
                      <p className="mt-2">
                        Wenn du Support benötigst, schreib uns einfach eine Mail an: info@staffbite.de - wir melden uns schnellstmöglich bei dir!
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
                    <h2 className="h3 mb-0">
                      Wie bekomme ich den kostenlosen Probemonat?
                      {open.ProbeMonat ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                      </h2>
                    {open.ProbeMonat 
                    ? 
                    <>
                      <p className="mt-2">
                        Um den Probemonat zu bekommen, musst du dich einfach <Link to="/signup" target="_blank">registrieren</Link>. Es fallen keinerlei Kosten für dich an.
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
                onClick={(() => toggleOpen("AV"))}>
                    <h2 className="h3 mb-0">
                      Wo finde ich die Auftragsdatenverarbeitung?
                      {open.AV ? <i className="fas fa-angle-up float-right mr-3 mt-1"></i>: <i className="fas fa-angle-down fas-lg float-right mr-3 mt-1"></i>}
                    </h2>
                    {open.AV 
                    ? 
                    <>
                      <p className="mt-2">
                      Da wir im Rahmen unserer Lösung personenbezogene Daten deiner Mitarbeiter*innen (z.B. E-Mail, Name und Position) benötigen, stellen wir dir eine AV (Auftragsdatenverarbeitung) zur Verfügung.
                      </p>
                      <p className="mt-2">
                      Unter dem unten stehenden Link findest du die AV. Schreib uns einfach eine kurze Mail an info@staffbite.de, damit du eine unterschriebene Version erhälst.
                      </p>
                      <p className="mt-2">
                        Hier findest du die Blanko-Version: <Link to="/AV" target="_blank">Auftragsdatenverarbeitung</Link>.
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