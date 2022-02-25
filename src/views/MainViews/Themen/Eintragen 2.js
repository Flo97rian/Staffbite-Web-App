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
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import { HashLink } from 'react-router-hash-link';
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_EINTRAGEN_DESCRIPTION, THEMEN_EINTRAGEN_TITLE} from "../../../constants/MetaTexts";
import ÜbersichtTeam from "../../../assets/img/themen/Eintragen/Übersicht-Team.png";
import ÜbersichtEintragen from "../../../assets/img/themen/Eintragen/Übersicht-Eintragen.png";
import PlanMASicht from "../../../assets/img/themen/Eintragen/Plan-MA-Sicht.png";
import EintragenDetails from "../../../assets/img/themen/Eintragen/Eintragen-Details.png";
import PlanMehrereEintragungen from "../../../assets/img/themen/Eintragen/Plan-mehrere-Eintragungen.png";
import EintragenThumb from "../../../assets/img/theme/EintragenThumb.jpg";
import ThemenSlider from "./ThemenSlider";




function Eintragen (props) {
  useEffect(() => {
    pageViewsTracking()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/eintragen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_EINTRAGEN_TITLE}</title>
          <meta name="description" content={THEMEN_EINTRAGEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/eintragen" />
          <meta property="og:title" content="Staffbite - Schritt für Schritt: Schichtplan veröffentlichen"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie dein Team sich in den Schichtplan einträgt."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/eintragen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={EintragenThumb}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Schritt für Schritt: Schichtplan veröffentlichen"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir Schritt für Schritt wie dein Team sich in den Schichtplan einträgt."></meta>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/eintragen"></meta>
          <meta property="twitter:image" content={EintragenThumb}></meta>
          <meta property="twitter:type" content="blog"></meta>

        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <Container className="mt-6">
                    <Row className="justify-content-left ml-0 mt-4">
                        <h1>Schritt für Schritt: In den Schichtplan eintragen</h1>
                    </Row>
        </Container>
        <Container className="mb-4 pt-4">
              <Row>
                <Col>
                    <p className="lead">
                    Moin 🙌
                    <br/>
                    <br/>
                    Im heutigen Beitrag zeige ich dir, wie deine Mitarbeiter*innen sich in den Schichtplan eintragen können. Die nötigen Schritte hierfür sind einfach und schnell getan – wir wollen es so einfach wie möglich für dein Team machen.
                    <br/>
                    <br/>
                    Damit dein Team sich eintragen kann, musst du zuvor eine Schichtplan Vorlage erstellt & freigegeben haben. Wie du das machst, habe ich in den letzten Beiträgen bereits im Detail vorgestellt. Falls du dies noch mal nachlesen willst, kannst du das hier machen:
                    <br/>
                    - <Link to="/themen/schichtplan-vorlage">Schichtplan Vorlage erstellen</Link>
                    <br/>
                    - <Link to="/themen/individueller-schichtplan">Dein individueller Schichtplan</Link>
                    <br/>
                    - <Link to="/themen/monatsplanung">Schichtplan freigeben</Link>
                    <br/>

                    
                    <br/>
                    Inhaltsverzeichnis
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/eintragen#vorbereitung">
                      Vorbereitung
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/eintragen#eintragen">
                      In den Schichtplan eintragen
                    </HashLink>
                    <br/>
                    <HashLink className="p text-muted p-0" to="/themen/eintragen#next-steps">
                      Nächste Schritte
                    </HashLink>
                    <br/>
                    </p>

                    <section className="section pt-7" id={"vorbereitung"}>
                    <h2>Die Vorbereitung</h2>
                    <p className="lead">
                    Damit deine Mitarbeiter*innen sich eintragen können, musst du sie zunächst einladen. Hierfür brauchst du nur in den Reiter „Team“ zu gehen und auf „Mitarbeiter einladen“ klicken. Anschließend öffnet sich ein Fenster in dem du den Namen, die Position, die Mailadresse und ein paar weitere Informationen angeben musst. Hierzu kommt in den nächsten Wochen ein weiterer Blogartikel.
                    </p>

                    <br/>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                    <img
                        alt="Screenshot von einem fertigen Schichtplan"
                        src={ÜbersichtTeam}
                        title="Fertiger Schichtplan"
                        height="100%"
                        width="100%"
                    />
                    </Col>
                    </Row>  
                    </section>              

                    
                    <section className="section pt-7" id={"eintragen"}>
                    <h2>In den Schichtplan eintragen</h2>
                    <p className="lead">
                        Nachdem du dein Team eingeladen hast, bekommen deine Mitarbeiter*innen eine E-Mail. Dort werden sie aufgefordert sich anzumelden und ein individuelles Passwort festzulegen. Anschließend können sie sich einloggen. Im Reiter „Eintragen“ kann dein Team deine freigegebenen Schichtpläne sehen.
                    </p>
                    <br/>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Screenshot eines fertigen Schichtplans mit Kasten um den Button zur Veröffentlichung"
                            src={ÜbersichtEintragen}
                            title="Fertiger Schichtplan zur Veröffentlichung"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>
                    

                    <p className="lead">
                        Im nächsten Schritt wählen deine Mitarbeiter*innen den Schichtplan aus in den sie sich eintragen wollen. Hier werden die verschiedenen Schichten angezeigt. Schichten, die nicht der Position der Mitarbeiter*in entsprechen sind ausgegraut. Somit wird verhindert, dass sich dein Team aus Versehen falsch einträgt.
                    </p>
                    <br/>
                   
                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Übersicht der veröffentlichten Schichtpläne"
                            src={PlanMASicht}
                            title="Veröffentlichte Pläne"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>

                    <p className="lead">
                    Durch einen einfachen Klick auf eine Schicht, öffnet sich dieses Fenster. Hier sehen deine Mitarbeiter*innen noch einmal die Details der konkreten Schicht sowie deine Notizen. Wenn sie zu dieser Zeit arbeiten können und wollen, klicken sie einfach auf „Eintragen“.
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Übersicht der veröffentlichten Schichtpläne"
                            src={EintragenDetails}
                            title="Veröffentlichte Pläne"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    <p className="lead">
                    Anschließend sind sie in die Schicht eingetragen und können diese Schritte für beliebig viele Schichten wiederholen. Je häufiger dein Team sich bewirbt umso besser werden die Chancen, dass der Plan vollständig befüllt werden kann.
                    </p>

                    <Row className="pb-0">
                    <Col className="order-md-2" md="12" lg="12">
                        <img
                            alt="Übersicht der veröffentlichten Schichtpläne"
                            src={PlanMehrereEintragungen}
                            title="Veröffentlichte Pläne"
                            height="100%"
                            width="100%"
                        />
                    </Col>
                    </Row>
                    <br/>

                    </section>

                    <section className="section pt-7" id={"next-steps"}>
                    <h2>Nächste Schritte</h2>
                    <p className="lead">
                        Nachdem dein Team sich eingetragen hat, müssen deine Mitarbeiter*innen nur noch abwarten, bis du den Schichtplan fertig hast.
                    <br/>
                    <br/>
                        Wir arbeiten übrigens gerade an unserer Staffbite-App für dein Team. Die App wird kostenfrei für iOS & Android erscheinen. Wir planen den Release der App im Februar-März 2022.
                    <br/>
                        Wenn du solange nicht warten willst, dann starte doch direkt mit deinem kostenlosen Probemonat und probiere Staffbite direkt aus. Solltest du noch Fragen haben, kannst dich natürlich gerne auch bei mir melden. Schreib einfach eine Mail an info@staffbite.de 🤝
                    <br/>                      
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!
                    </p>
                    </section>
                  </Col>
              </Row>
        </Container>
        <ThemenSlider></ThemenSlider>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Eintragen;