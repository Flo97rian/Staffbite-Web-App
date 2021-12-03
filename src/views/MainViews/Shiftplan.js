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
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ImageGroup, Image } from 'react-fullscreen-image'
import { Helmet } from "react-helmet";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
//import SchichtplanBeispiel from "../../assets/img/theme/Schichtplan-automatisiert-erstellen.png"
import SchichtplanEntwurf from "../../assets/img/theme/Schichtplan-erstellen.png"
import TeamVerwalten from "../../assets/img/theme/Team-verwalten.png"
import SchichtplanBeispiel from "../../assets/img/theme/Schichtplan-befüllen.png"
//import TeamVerwalten from "../../assets/img/theme/Mitarbeiter-erstellen-und-verwalten.png"
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";

function Shiftplan () {
    return (
    <>
        <Helmet>
          <title>Staffbite | Dein Schichtplan</title>
          <meta name="description" content="Individuell anpassbar. Automatisierte Schichtpläne"/>
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5 pb-2" fluid>
      <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-4">
                        <h1> Unsere digitalen Schichtpläne</h1>
                    </Row>
                </Container>
      <section className="section" id={"sectioncreate"}>
            <Container className="mb-4 pt-4">
              <Row className="align-items-center mb-4 mt-3">
              <Col className="order-md-1 pr-md-5" md="12" lg="6">
                    <h2 className="h3">Einfache und unkomplizierte Schichtpläne für dich und dein Team </h2>
                    <p>
                    Mit unserer Lösung kannst du in kürzester Zeit deine Schichtpläne digital erstellen. Du kannst mit wenigen Klicks die wichtigsten Informationen zu deinen Schichten angeben. Den vorbereiteten Plan gibst du anschließend deinem Team frei. 
                    </p>
                    <p>
                    Jetzt musst du nur noch abwarten, bis dein Team sich in den Plan eingetragen hat. Dein Team bekommt ebenfalls einen Zugang zu Staffbite und kann sich jederzeit per Smartphone, Tablet oder Laptop in den Plan eintragen. Über unser Reporting kannst du außerdem nachschauen wer sich noch nicht eingetragen hat. 
                    </p>
                    <Link to="/" >Erklärungsvideos folgen bald</Link>
                </Col>
                <Col className="order-md-2"  md="12" lg="6">
                  <img
                    className="shadow-lg rounded img-center img-fluid"
                    alt="Abbildung einer anpassbaren Schichtplan Vorlage von Staffbite"
                    src={SchichtplanEntwurf}
                    title="Schichtplan Vorlage erstellen"
                    height="100%"
                    width="100%"
                  />
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionteam"}>
            <Container className="mb-4 pt-4">
              <Row className="align-items-center mb-4 mt-8">
                <Col className="order-md-1 pr-md-5" xs="12" md="12" lg="6">
                    <h2 className="h3">Behalte dein Team im Blick</h2>
                    <p>
                    Damit sich dein Team in den Schichtplan eintragen kann, musst du deine Mitarbeiter*innen nur einmalig einladen. Dafür brauchst du nur ihren Namen, ihre E-Mail-Adresse und die Anzahl der Schichten, die sie pro Woche arbeiten sollen. 
                    </p>
                    <p>
                    Außerdem kannst du angeben wie viel Erfahrung sie bereits haben und welche Position (z.B. Service, Küche, etc.) sie ausfüllen. Diese Informationen kannst du später nutzen, um deine Schichtpläne noch besser zu gestalten. 
                    </p>
                    <Link to={{ pathname: "https://www.youtube.com/watch?v=RtKKaWkCPrs" }} target="_blank">Dein Team erstellen & verwalten</Link>
                </Col>
                <Col className="order-md-2" md="12" lg="6">
                  <img
                    alt="Übersicht zur Erstellung und Verwaltung deines Teams"
                    src={TeamVerwalten}
                    title="Team erstellen und verwalten"
                    height="100%"
                    width="100%"
                  />
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionalg"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
              <Col className="order-md-1"  xs="12" md="12" lg="6">
                  <div className="pr-md-5">
                    <h2 className="h3">Deine Zeit ist zu wertvoll, um sie mit der Schichtplanung zu verbringen</h2>
                    <p>
                    Nachdem dein Team sich in deinen Schichtplan eingetragen hat, kannst du die automatisierte Befüllung starten. Dafür reicht ein Klick aus. Wenige Sekunden später ist dein Schichtplan fertig. Dein Team wird ausschließlich in Schichten eingeteilt, in die sie sich eingetragen haben. Somit entsteht ein fairer Schichtplan für dein ganzes Team. 
                    </p>
                    <p>
                    Bisher hast du wahrscheinlich stundenlang per Hand mit Papier und einer Excel-Tabelle deinen Schichtplan befüllt. Mit unserer Lösung ist das Vergangenheit! Wir wollen dir helfen sowohl Zeit als auch Nerven zu sparen. 
                    </p>
                    <Link to="/" >Erklärungsvideos folgen bald</Link>
                  </div>
                </Col>
                <Col className="order-md-2" xs="12" md="12" lg="6">
                  <img
                    alt="Abbildung eines automatisiert erstellen Schichtplans von Staffbite"
                    title="Schichtplan automatisiert erstellen"
                    src={SchichtplanBeispiel}
                    height="100%"
                    width="100%"
                  />
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionapp"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-8">
                <Col className="order-md-1"  xs="12" md="12" lg="6">
                  <img
                    alt="Abbildung der Mitarbeiter Übersicht von Staffbite"
                    title="Mitarbeit Übersicht"
                    src={TeamVerwalten}
                    height="300px"
                    width="500px"
                  />
                </Col>
                <Col className="order-md-2" xs="12" md="12" lg="6">
                  <div className="pr-md-5 mt-3">
                    <h2 className="h3">Vorteile für dein Team</h2>
                    <p>
                    In vielen Betrieben sind Schichtpläne ein Streitthema. Unzufriedenheiten des Teams stehen an der Tagesordnung. Wir wollen diese Probleme lösen. Durch unsere Lösung ist der gesamte Prozess vom grundlegenden Plan bis zum fertigen Schichtplan transparent. Durch die automatisierte Verteilung der Schichten wird niemand bevorzugt und es geschehen weniger Fehler. 
                    </p>
                    <p>
                    Viele der Mitarbeiter*innen in der Gastronomie sind jung. Sie sind es gewohnt digitale Produkte und Services zu nutzen. Warum sollte das beim Schichtplan anders sein?  
                    </p>
                    <p>
                    Mit unserer Lösung kann sich dein Team jederzeit und überall in den Schichtplan eintragen. Ohne WhatsApp-Nachrichten, E-Mails, Excel-Tabellen oder Papier. Egal ob vom Smartphone, Tablet oder Laptop. Den fertigen Schichtplan kann dein Team natürlich auch jederzeit online einsehen. 
                    </p>
                    <Link to="/" >Erklärungsvideos folgen bald</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Shiftplan;