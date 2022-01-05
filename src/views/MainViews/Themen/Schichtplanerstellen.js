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
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../../components/Navbars/LandingNavbar"
import LandingFooter from "../../../components/Footers/LandingFooter";
import {THEMEN_SCHICHTPLANERSTELLEN_DESCRIPTION, THEMEN_SCHICHTPLANERSTELLEN_TITLE} from "../../../constants/MetaTexts";
import Possibilities from "../../../assets/img/themen/Possibilities.png"
import PlanABC from "../../../assets/img/themen/PlanABC.png"



function Schichtplanerstellen (props) {
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/themen/schichtplanerstellen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_SCHICHTPLANERSTELLEN_TITLE}</title>
          <meta name="description" content={THEMEN_SCHICHTPLANERSTELLEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/schichtplanerstellen" />

          <meta property="og:title" content="Staffbite - Wie erstelle ich einen Schichtplan?"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir die Vor-und Nachteile von drei verschiedenen Möglichkeit zur Erstellung deiner Schichtpläne."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/schichtplanerstellen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Possibilities}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Wie erstelle ich einen Schichtplan?"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir die Vor-und Nachteile von drei verschiedenen Möglichkeit zur Erstellung deiner Schichtpläne."/>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/schichtplanerstellen"></meta>
          <meta property="twitter:image" content={Possibilities}></meta>
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
                        <h1>Wie kann ich einen Schichtplan erstellen?</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col>
                    <p>
                    Moin zusammen 👋
                    </p>
                    <p>
                      In unserem Blog werden wir regelmäßig Fragen beantworten, Tipps & Tricks mit euch teilen und auf aktuelle Neuigkeiten eingehen. Wenn du also eine Frage an uns hast, dann schreib gerne eine Mail an info@staffbite.de – wir freuen uns deine Nachricht!
                    </p>
                    <p>
                    Heute möchte ich euch die verschiedenen Möglichkeiten vorstellen, die es gibt, um einen Schichtplan zu erstellen. Jede dieser Möglichkeiten hat Vor- und Nachteile, die abgewogen werden müssen.  
                    </p>
                    <p>
                    Im Sommer 2021 habe ich meine Masterthesis über die Schichtplanung in kleinen und mittleren Betrieben geschrieben. Um ein besseres Verständnis für die Probleme und Anforderungen der Personalplaner*innen zu bekommen, habe ich diverse Interviews geführt und mir im Detail den Prozess der Schichtplanung erklären zu lassen.
                    </p>
                    
                    <h2>Was sind die Probleme der Schichtplanung?</h2>
                    <p>
                    Interessant war hierbei, dass bereits das Einholen der Verfügbarkeiten der Mitarbeiter*innen in vielen Betrieben eine Herausforderung darstellt. Es existiert eine Vielzahl an Kommunikationswegen, die die Mitarbeiter*innen nutzen, um mitzuteilen wann sie arbeiten können.
                    </p>
                    <p>
                    Die Verantwortlichen müssen anschließend eine große Menge WhatsApp-Nachrichten, Mails und Zettel durchsuchen und sich Notizen machen. Häufig gehen hierbei Informationen verloren oder sind bereits veraltet. Das Ergebnis ist ein Schichtplan, der in den meisten Fällen bereits kurz nach der Veröffentlichung wieder angepasst werden muss.
                    </p>
                    <p>
                    Die Befüllung der Schichtpläne an sich stellt jedoch die größte Herausforderung dar. Es müssen Faktoren wie die Gehaltsvorstellung der Mitarbeiter*innen, die Wunscharbeitszeiten, Überstunden, Urlaub, Positionen und Qualifikationen berücksichtigt werden. In den meisten Fällen haben die Verantwortlichen diese Faktoren im Kopf. Aus diesem Grund kann die manuelle Befüllung der Schichtpläne auch nicht abgegeben werden. Urlaub oder ein Ausfall wegen Krankheit ist kaum möglich.
                    </p>

                    <h2>Wie werden 2021 Schichtpläne erstellt?</h2>
                    <p>
                    Zu meiner Überraschung gaben viele Betriebe an, dass sie auch im Jahre 2021 immer noch ihre Schichtpläne mit Zettel und Stift erstellen. Hierbei wird meist eine Vorlage verwendet, die vor einigen Monaten erstellt und ausgedruckt wurde. Die Verantwortlichen planten in der Regel einige Stunden am Wochenende ein, um in mühevoller Kleinstarbeit den Schichtplan zu befüllen.
                    </p>
                    <p>
                    Wird ein Teammitglied krank oder kann aus einem anderen Grund nicht erscheinen, wird erneut der Stift gezückt und der Plan angepasst. Das Ergebnis ist ein schwierig zu verstehender und meist unvollständiger Schichtplan. Dieser Plan muss anschließend nach den Änderungen fotografiert und dem Team zugeschickt werden. Spätestens nach der dritten Änderung hat der Großteil des Teams leider den Überblick verloren.
                    </p>

                    <Row className="pb-0">
                <Col className="order-md-2" md="12" lg="6">
                    <img
                        alt="Tafel mit drei Plänen"
                        src={PlanABC}
                        title="PlanABC"
                        height="90%"
                        width="90%"
                    />
                </Col>
                </Row>

                    <h2>Schichtplanung mit Excel</h2>
                    <p>
                    Die meisten Betriebe, mit denen ich gesprochen habe, erstellen ihre Schichtpläne mit Excel. Manche verteilen ihre Schichtplanvorlage über eine Dropbox oder die Cloud. Diese Betriebe nutzen bereits die ersten Vorteile der technologischen Entwicklung der letzten Jahre.
                    </p>                    
                    <p>
                    Das Einholen der Verfügbarkeiten der Mitarbeiter*innen und die Befüllung der Schichtpläne erfolgt jedoch immer noch in manueller Kleinstarbeit und dauert somit mehrere Stunden jede Woche. Zusätzlich sollte erwähnt werden, dass die Excel Vorlagen, die aus dem Internet heruntergeladen werden, nur selten die individuellen Bedürfnisse der Betriebe vollständig abbilden.
                    </p>                    
                    <p>
                    Dennoch ist die Planung mit Excel sehr beliebt, da kaum Kosten entstehen. Es wird lediglich eine Microsoft Excel Lizenz benötigt, die viele Betriebe sowieso besitzen, da sie für die Buchhaltung benötigt wird. Der hohe manuelle Aufwand kann durch Excel jedoch nicht umgangen werden.    
                    </p>

                    <h2>Software zur Schichtplanung</h2>
                    <p>
                    Nur ein kleiner Bruchteil der Betriebe, mit denen ich gesprochen habe, verwendet eine professionelle Software, um die Schichtplanung zu erledigen. Die wesentlichen Gründe sind hierbei die hohen Preise, die manche Anbieter aufrufen sowie das fehlende Vertrauen, dass eine Software die vielen individuellen Anforderungen abbilden kann.
                    </p>
                    <p>
                    Die hohen Preise der Anbieter sind in den meisten Fällen damit zu begründen, dass die Software für große Betriebe und Unternehmensketten konzipiert wurden. Es können Schichtpläne für mehrere Filialen und hunderte Mitarbeiter*innen abgebildet können. Für kleine und mittlere Betriebe sind diese umfassenden Systeme jedoch weder geeignet noch bezahlbar.
                    </p>                    
                    
                    <h2>Die Lösung für kleine und mittlere Betriebe</h2>
                    <p>
                    Wir von Staffbite haben die Anforderungen und Probleme bei der Schichtplanung genau analysiert und bieten eine bezahlbare, flexible und automatisierte Lösung für kleine und mittlere Betriebe. Die Mitarbeiter*innen deines Betriebs erhalten einen Zugang zu unserem System (in Kürze veröffentlichen wir unsere kostenfreie Mitarbeitenden-App) und können dort direkt ihre Verfügbarkeiten eintragen. Auf diese Weise kannst du bereits eine Menge Zeit und Nerven einsparen.
                    </p>
                    <p>
                    Nachdem sich dein Team in den Schichtplan eingetragen hat, kannst du die automatisierte Befüllung starten. Nach wenigen Sekunden ist dein Schichtplan fertig. Bei Bedarf kannst du Anpassungen vornehmen und den Plan anschließend veröffentlichen.
                    </p>
                    <p>
                    Dein Team kann jederzeit online den Schichtplan einsehen und weiß genau Bescheid. Jede Änderung im Plan erscheint automatisch auch bei deinen Mitarbeiter*innen. Eine Win-Win-Situation für dich und dein Team.
                    </p>
                    
                    <h2>Starte jetzt deinen kostenfreien Probemonat</h2>
                    <p>
                      Wenn du mehr über unsere online Schichtplanung erfahren willst, dann schau dich gerne auf unserer Website um oder starte direkt mit dem <Link to="/signup" >kostenlosen Probemonat</Link>!</p>
                  </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default Schichtplanerstellen;