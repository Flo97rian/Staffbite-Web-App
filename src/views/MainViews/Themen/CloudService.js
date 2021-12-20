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
import {THEMEN_CLOUDSERVICE_DESCRIPTION, THEMEN_CLOUDSERVICE_TITLE} from "../../../constants/MetaTexts";
import CloudPicture from "../../../assets/img/themen/CloudComputingImage.png"

function CloudService (props) {
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = props.match.path;
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{THEMEN_CLOUDSERVICE_TITLE}</title>
          <meta name="description" content={THEMEN_CLOUDSERVICE_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/themen/cloudservice" />

          <meta property="og:title" content="Staffbite - Online Schichtplanung als Cloud Service."/>
          <meta property="og:description" content="In diesem Beitrag erklären wir warum Staffbite als Cloud Service angeboten wird. Außerdem gehen wir auf die Vorteile der online Schichtplanung ein."/>
          <meta property="og:url" content="https://www.staffbite.de/themen/cloudservice"></meta>
          <meta property="og:type" content="blog"></meta>
          <meta property="og:image" content={CloudPicture}></meta>
          <meta property="og:site_name" content="Staffbite"></meta>
          <meta property="twitter:title" content="Online Schichtplanung als Cloud Service."/>
          <meta property="twitter:card" content="summary_large_image"/>
          <meta property="twitter:description" content="In diesem Beitrag erklären wir warum Staffbite als Cloud Service angeboten wird. Außerdem gehen wir auf die Vorteile der online Schichtplanung ein."/>
          <meta property="twitter:url" content="https://www.staffbite.de/themen/cloudservice"></meta>
          <meta property="twitter:image" content={CloudPicture}></meta>
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
                        <h1>Warum ist Staffbite ein Cloud Service und was ist das eigentlich?</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col>
                    <p>
                      Moin und herzlich willkommen zu unserem Blog 😊
                    </p>
                    <p>
                      In unserem Blog werden wir regelmäßig Fragen beantworten, Tipps & Tricks mit euch teilen und auf aktuelle Neuigkeiten eingehen. Wenn du also eine Frage an uns hast, dann schreib gerne eine Mail an info@staffbite.de – wir freuen uns deine Nachricht!
                    </p>
                    <p>
                      Kürzlich erreichte uns eine Nachricht mit der Frage: Warum ist Staffbite ein Cloud Service und was ist das eigentlich?  
                    </p>
                    <h2>Was ist ein Cloud Service?</h2>
                    <p>
                      Um diese Frage zu beantworten, muss zunächst der Begriff „Cloud Service“ verstanden werden. Ein Cloud Service (auch SaaS – Software as a Service genannt) ist im Prinzip eine gewöhnliche Software. Der entscheidende Unterschied liegt darin, dass du bei einem Cloud Service nichts herunterladen und installieren musst. Die Software wird über das Internet bereitgestellt und ist jederzeit und von überall aus nutzbar!
                    </p>
                    <p>
                      Häufig sorgt der Begriff Cloud für Verunsicherung. Gerade Unternehmer*innen haben große Angst gegen Datenschutzrichtlinien zu verstoßen und bleiben deshalb lieber bei ihrer Excel-Tabelle. Doch auch Excel ist inzwischen größtenteils ein Cloud Service – auch wenn du deine Tabellen lokal auf deinem Computer speicherst. 
                    </p>
                    <h2>Vorteile für dich als Kunden</h2>
                    <p>
                      Die Vorteile von Cloud Services sind unumstritten. Die Miete eines Cloud Servers ist deutlich günstiger als die Anschaffung eines eigenen Servers. Aus diesem Grund können wir dir unseren Cloud Service deutlich günstiger anbieten!
                      Hinzu kommt, dass Cloud Server regelmäßig von Experten gewartet werden und die neuesten Sicherheitsupdates erhalten. Das bedeutet für dich als Kunden, dass unser Service jederzeit verfügbar ist und eine hohe Performance gewährleistet!
                    </p>
                    <p>
                      Aus diesen Gründen haben wir uns dazu entschlossen Staffbite als Cloud Service aufzubauen und anzubieten. Wir sind uns sicher, dass diese Entscheidung das Erlebnis unserer Kunden nachhaltig verbessert.
                    </p>
                    <h2>Probiere es jetzt aus</h2>
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
export default CloudService;