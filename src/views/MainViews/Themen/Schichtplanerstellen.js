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
import React, {useEffect, useRef, useState} from "react";
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
import Possibilities from "../../../assets/img/themen/SchichtplanErstellen/Possibilities.png"
import PlanABC from "../../../assets/img/themen/SchichtplanErstellen/PlanABC.png"
import ThemenSlider from "./ThemenSlider";


function Schichtplanerstellen (props) {
  let mainContent = useRef("mainContent")
  const [showChapters, setShowChapters] = useState(false);
  useEffect(() => {
    pageViewsTracking()
  },[])

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, []);

  function pageViewsTracking () {
    const pathname = "/themen/schichtplan-erstellen";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <div ref={mainContent}>
        <Helmet>
          <title>{THEMEN_SCHICHTPLANERSTELLEN_TITLE}</title>
          <meta name="description" content={THEMEN_SCHICHTPLANERSTELLEN_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/schichtplan-erstellen" />

          <meta property="og:title" content="Staffbite - Wie erstelle ich einen Schichtplan? Papier, Excel oder Software?"/>
          <meta property="og:description" content="In diesem Beitrag zeige ich dir die Vor-und Nachteile von drei verschiedenen Möglichkeit zur Erstellung deiner Schichtpläne."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/schichtplan-erstellen"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={Possibilities}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Staffbite - Wie erstelle ich einen Schichtplan? Papier, Excel oder Software?"/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag zeige ich dir die Vor-und Nachteile von drei verschiedenen Möglichkeit zur Erstellung deiner Schichtpläne."/>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/schichtplan-erstellen"></meta>
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
      <Container className="pt-8" fluid>
      <Row>
          <Col xs="0" md="3">
          </Col>
          <Col xs="12" md="7">
          <Row className="mt-4 text-center">
                <Col>
                    <small>Lesedauer ca. 5 Minuten</small>
                </Col>
            </Row>
            <Row className="mt-4 text-center">
                <Col>
                    <h1>Wie kann ich einen Schichtplan erstellen?</h1>
                </Col>
            </Row>
            <Row className="mt-6">
                <Col>
                    <h2 onClick={() => setShowChapters(!showChapters)}><i className={showChapters ? "fas fa-angle-down mr-2" : "fas fa-angle-right mr-2"}></i>Inhaltsverzeichnis</h2>
                    <div hidden={!showChapters} className="ml-2">
                      <h3><a href="#probleme">Was sind die Probleme der Schichtplanung?</a></h3>
                      <h3><a href="#2022">Wie werden 2022 Schichtpläne erstellt?</a></h3>
                      <h3><a href="#software">Software zur Schichtplanung</a></h3>
                      <h3><a href="#kleinundmittel">Die Lösung für kleine und mittlere Betriebe</a></h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                        <p className="lead">
                        Moin zusammen 👋
                        <br/>
                        <br/>
                        Heute möchte ich euch die verschiedenen Möglichkeiten vorstellen, die es gibt, um einen Schichtplan zu erstellen. Jede dieser Möglichkeiten hat <b>Vor- und Nachteile</b>, die abgewogen werden müssen.
                        <br/>
                        <br/>
                        Im Sommer 2021 habe ich meine <b>Masterthesis über die Schichtplanung in kleinen und mittleren Betrieben</b> geschrieben. Um ein besseres Verständnis für die Probleme und Anforderungen der Personalplaner*innen zu bekommen, habe ich diverse Interviews geführt und mir im Detail den <b>Prozess der Schichtplanung</b> erklären zu lassen.
                        </p>
                       
                </Col>
            </Row>
            <Row>
                <Col>
                        <h2 id="probleme" className="pt-7">Was sind die Probleme der Schichtplanung?</h2>
                        <p className="lead">
                        Die <b>größten Probleme</b> bei der Schichtplanung sind:
                        <br/>
                        <br/>
                        <ul>
                          <li><a href="#verfügbarkeiten">Einholen der Verfügbarkeiten des Teams</a></li>
                          <li><a href="#befüllung">Befüllung des Schichtplans</a></li>
                          <li><a href="#änderungen">Spontane Änderungen</a></li>
                          <li><a href="#datenschutz">Datenschutz & DSGVO</a></li>
                        </ul>
                        </p>
                        <h3 id="verfügbarkeiten" className="pt-7">Einholen der Verfügbarkeiten des Teams</h3>
                        <p className="lead">
                        Die Vielzahl an Gesprächen zeigte deutlich, dass die Probleme in der Schichtplanung schon <b>direkt zu Beginn</b> entstehen. Um einen vollständigen Schichtplan zu erstellen, muss die verantwortliche Person genau wissen, <b>wann welcher Mitarbeiter oder Mitarbeiterin zur Verfügung</b> steht. Wird das Team in diesem Schritt nicht einbezogen, kommt es immer wieder zu Problemen im weiteren Verlauf.
                        <br/>
                        <br/>
                        Das <b>Einholen der Verfügbarkeiten</b> der Mitarbeiter*innen stellt in vielen Betrieben jedoch eine Herausforderung dar. Es existiert eine Vielzahl an Kommunikationswegen, die die Mitarbeiter*innen nutzen, um mitzuteilen wann sie arbeiten können: <b>WhatsApp, Signal, Mails, Anrufe, Slack und viele mehr.</b>
                        <br/>
                        <br/>
                        Die Verantwortlichen müssen danach sich durch eine <b>große Menge Nachrichten, Mails und Zettel durchsuchen </b>und sich Notizen machen. <b>Häufig</b> gehen hierbei <b>Informationen verloren</b> oder sind beim Aufschreiben bereits veraltet. <b>Das Ergebnis</b> ist ein Schichtplan, der in den meisten Fällen <b>bereits kurz nach der Veröffentlichung wieder angepasst werden muss</b>.
                        </p>
                        <h3 id="befüllung" className="pt-7">Befüllung des Schichtplans</h3>
                        <p className="lead">
                          Die <b>Befüllung der Schichtpläne</b> an sich stellt jedoch die <b>größte Herausforderung</b> dar. Es müssen Faktoren wie 
                        <br/>
                        <br/>
                        <ul>
                          <li>die Gehaltsvorstellung der Mitarbeiter*innen</li>
                          <li>die Wunscharbeitszeiten</li>
                          <li>Überstunden</li>
                          <li>Urlaub</li>
                          <li>Positionen und Qualifikationen</li>
                        </ul>
                        berücksichtigt werden. In den meisten Fällen haben die Verantwortlichen diese Faktoren im Kopf. Aus diesem Grund kann die <b>manuelle Befüllung der Schichtpläne</b> auch nicht abgegeben werden. Urlaub oder ein Ausfall wegen Krankheit ist für die Verantwortlichen so kaum möglich.
                        <br/>
                        <br/>
                        Je größer ein Betrieb ist, umso mehr steigt die <b>Komplexität</b> im Schichtplan. Individuelle Vorlieben der Mitarbeiter und Mitarbeiterinnen kann eine einzelne Person so kaum im Kopf behalten und anschließend im Schichtplan berücksichtigen.
                        <br/>
                        <br/>
                        Aber auch in kleineren Betrieben ist es schwierig gleichzeitig die <b>Wunschzeiten des Teams</b> umzusetzen und gleichzeitig den <b>Schichtplan vollständig befüllt</b> zu bekommen. Ohne eine transparente Schichtplanung führt dies meist zu Spannungen zwischen den Verantwortlichen und dem Team. Wie du die Transparenz in der Schichtplanung erhöhen kannst, zeige ich dir später in diesem Artikel.
                        </p>
                        <p className="lead">
                        <h3 id="änderungen" className="pt-7">Spontane Änderungen</h3>
                        Wer kennt es nicht? Kaum nachdem der Schichtplan mit dem Team geteilt wurde, kommen die ersten <b>Nachrichten und Anrufe</b>, dass Jemand aus dem Team eine Schicht nicht wahrnehmen kann. Die verantwortliche Person muss sich also wieder an den Schreibtisch setzen und hoffen, dass schnell Ersatz gefunden werden kann.
                        <br/>
                        <br/>
                        Dies passiert jedoch nicht nur nach der ersten Veröffentlichung des Plans, sondern auch <b>mehrfach pro Woche</b>. Krankheit, Prüfungen und Geburtstage von Verwandten sind die häufigsten Gründe, weshalb sich die Verantwortlichen fast jeden Tag wieder an den Schichtplan setzen müssen.
                        <br/>
                        <br/>
                        Jede Änderung muss anschließend im Schichtplan abgebildet werden, damit das Team und die Schichtleitungen immer Bescheid wissen, wer wann arbeitet. Die verschiedenen Versionen des Schichtplans werden anschließend wieder mit dem Team geteilt. Dabei den Überblick zu behalten ist für beide Seiten nicht leicht.
                        </p>
                        <h3 id="datenschutz" className="pt-7">Datenschutz & DSGVO</h3>
                        <p className="lead">
                          Der Datenschutz und das Einhalten der <b>DSGVO-Richtlinien</b> ist inzwischen für jeden Betrieb mit einem Schichtplan ein wichtiges Kriterium. Einen Schichtplan im Betrieb auszuhängen, der den Vor- und Nachnamen der Mitarbeiter*innen und ihre Arbeitszeiten beinhaltet, ist nicht zu empfehlen. Werden diese Daten von Kunden oder Anderen im Laden eingesehen, kann dies als Verstoß gegen den Datenschutz geahndet werden.
                        <br/>
                        <br/>
                          Ebenfalls muss beachtet werden, dass nicht jeder Anbieter für digitale Schichtpläne die DSGVO-Richtlinien eingehalten werden. Hier sollte darauf geachtet werden einen Anbieter aus Deutschland oder zumindest Europa auszuwählen. Ein kurzer Blick in das Impressum der Website gibt hier erste Informationen, ob es sich um ein deutsches Unternehmen handelt.
                        </p>
                        <h2 id="2022" className="pt-7">Wie werden 2022 Schichtpläne erstellt?</h2>
                        <p className="lead">
                          Zu meiner Überraschung gaben <b>viele Betriebe</b> an, dass sie auch im Jahre 2021 immer noch ihre Schichtpläne mit <b>Zettel und Stift</b> erstellen. Dies ist im Jahr 2022 ebenfalls der Fall. Meistens wird eine Vorlage verwendet, die vor einigen Monaten erstellt und ausgedruckt wurde. Die Verantwortlichen planten in der Regel <b>einige Stunden am Wochenende</b> ein, um <b>in mühevoller Kleinstarbeit</b> den Schichtplan zu befüllen.
                        <br/>
                        <br/>
                          Wird ein Teammitglied krank oder kann aus einem anderen Grund nicht erscheinen, wird erneut der Stift gezückt und der Plan angepasst. Das Ergebnis ist ein schwierig zu verstehender und meist unvollständiger Schichtplan. Dieser Plan muss anschließend nach den Änderungen fotografiert und dem Team zugeschickt werden. Spätestens nach der dritten Änderung hat der Großteil des Teams leider den Überblick verloren.
                        </p>
                        <Row>
                          <Col>
                          <img
                            alt="Tafel mit drei Plänen"
                            src={PlanABC}
                            title="PlanABC"
                            height="90%"
                            width="90%"
                        />
                          </Col>
                        </Row>
                        <h2 id="software" className="pt-7">Software zur Schichtplanung</h2>
                        <p className="lead">
                          Nur ein <b>kleiner Bruchteil der Betriebe</b>, mit denen ich gesprochen habe, verwendet eine <b>professionelle Software</b>, um die Schichtplanung zu erledigen. Die wesentlichen Gründe sind hierbei die hohen Preise, die Anbieter aufrufen sowie das fehlende Vertrauen, dass eine Software die vielen individuellen Anforderungen abbilden kann.
                        <br/>
                        <br/>
                          Die <b>hohen Preise</b> der Anbieter sind in den meisten Fällen damit zu begründen, dass die Software für große Betriebe und Unternehmensketten konzipiert wurden. Es können Schichtpläne für mehrere Filialen und hunderte Mitarbeiter*innen abgebildet können. Für <b>kleine und mittlere Betriebe</b> sind diese umfassenden Systeme jedoch <b>weder geeignet noch bezahlbar</b>.
                        </p>
                        <h2 id="kleinundmittel" className="pt-7">Die Lösung für kleine und mittlere Betriebe</h2>
                        <p className="lead">
                          Wir von Staffbite haben die <b>Anforderungen und Probleme bei der Schichtplanung genau analysiert</b> und bieten eine bezahlbare, flexible und automatisierte Lösung für kleine und mittlere Betriebe. Die Mitarbeiter*innen deines Betriebs erhalten einen Zugang zu unserem System (in Kürze veröffentlichen wir unsere <b>kostenfreie Mitarbeitenden-App</b>) und können dort direkt ihre <b>Verfügbarkeiten eintragen</b>. Auf diese Weise kannst du bereits eine Menge Zeit und Nerven einsparen.
                        <br/>
                        <br/>
                          Nachdem sich dein Team in den Schichtplan eingetragen hat, kannst du die <b>automatisierte Befüllung</b> starten. <b>Nach wenigen Sekunden ist dein Schichtplan fertig</b>. Bei Bedarf kannst du Anpassungen vornehmen und den Plan anschließend veröffentlichen.
                        <br/>
                        <br/>
                          <b>Dein Team kann jederzeit online den Schichtplan einsehen</b> und weiß genau Bescheid. Jede Änderung im Plan erscheint automatisch auch bei deinen Mitarbeiter*innen. Eine Win-Win-Situation für dich und dein Team.
                        </p>
                        <h3>Starte jetzt und erstelle deinen digitalen Schichtplan</h3>
                        <p className="lead">
                          Wenn du mehr über online Schichtplanung erfahren willst, dann geh auf www.staffbite.de und erstelle deinen kostenlosen online Schichtplan. Du kannst sofort loslegen! Nachdem du deinen Schichtplan erstellt hast, kannst du einen Link mit deinem Team teilen. Mit diesem Link tragen sich deine Mitarbeiter*innen einfach und unkompliziert in den Plan ein.
                        </p>
                </Col>
            </Row>
            </Col>
          </Row>
      </Container>
      <LandingFooter></LandingFooter>
    </div>
  );
};
export default Schichtplanerstellen;