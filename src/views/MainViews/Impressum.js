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

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import Team from "../../assets/img/theme/Florian-Zellmann-und-Daniel-Zellmann.png"
import LandingFooter from "../../components/Footers/LandingFooter";
import { Link } from "react-router-dom";

function Impressum () {
    return (
    <>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Das Logo von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <section className="section" id={"sectionimpressum"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-left mb-4 mt-4">
                <Col md="8">
                  <div className="text-left">
                    <h1>Impressum</h1>
                    <p className="lead">
                      Florian Zellmann & Daniel Zellmann GbR 
                      <br/>
                      Möllingstraße 8, 
                      24103 Kiel 
                      <br/>
                      info@staffbite.de
                      <br/>
                      0172 7018493
                    </p>
                    <h3>Vertretungsberechtigte</h3>
                    <p className="mb-4">
                      Florian Zellmann 
                      <br/>
                      Daniel Zellmann 
                    </p>
                    <h3>Umsatzsteuer-Identifikationsnummer </h3>
                    <p className="mb-4">
                        DE347060990
                    </p>
                    <h3>EU-Streitschlichtung</h3>
                    <p className="mb-4">
                      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <Link to="https://ec.europa.eu/consumers/odr ">Hier</Link>
                      <br/>
                      Unsere E-Mail-Adresse finden Sie oben im Impressum. 
                    </p>
                    <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
                    <p className="mb-4">
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. 
                    </p>
                    <h3>Bei Fragen</h3>
                    <p className="mb-4">
                    Wenden Sie sich bei Fragen gerne an: info@stafftbite.de  
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectionagb"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-4">
                <Col className="order-md-1" md="12">
                  <div className="pr-md-5">
                    <h1>Allgemeine Geschäftsbedingungen</h1>
                    <h2>1. Allgemeines, Anwendung </h2>
                    <p>
                    1.1. Die Florian Zellmann & Daniel Zellmann GbR, Möllingstraße 8, 24103 Kiel (nachfolgend „Anbieter“) ist Inhaber jeglicher Nutzungsrechte des Cloud Service Staffbite. Die Software-as-a-Service Lösung bietet digitale Dienste im Bereich der Schichtplanung und wird per Fernzugriff über das Internet zur Verfügung gestellt. Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Dienste des Anbieters.  
                    </p>
                    <p>
                    1.2. Die Dienste des Anbieters werden ausschließlich Unternehmern i. S. d. §14 BGB angeboten. 
                    </p>
                    <p>
                    1.3. Allgemeine Geschäftsbedingungen des Kunden gelten grundsätzlich nicht. Die Anerkennung solcher erfordert die schriftliche Bestätigung eines rechtlichen Vertreters des Anbieters. 
                    </p>
                    <p>
                    1.4. Die Vertragssprache ist Deutsch.
                    </p>
                    <h2>2. Vertragsbestimmungen</h2>
                    <p>
                      2.1. Um einen Vertrag mit dem Anbieter abzuschließen, ist die Registrierung bei dem Cloud Service Staffbite erforderlich. Die Registrierung geschieht eigenständig durch einen Unternehmer i.S.d. §14 BGB oder durch einen rechtlichen Vertreter. Sämtliche Angaben im Registrierungsprozess sind vollständig und wahrheitsgemäß zu machen. 
                    </p>
                    <p>
                      2.2. Durch das Abschließen des Registrierungsprozesses stimmt der Kunde dem vorgelegten Angebot auf der Website gemäß der eigenen Angaben und der ausgewählten Services zu. Die Services sind auf der Website www.staffbite.de dargestellt. Anschließend erfolgt nach Überprüfung durch den Anbieter die Zusendung einer Auftragsbestätigung per E-Mail. Diese Auftragsbestätigung stellt die Vertragsannahme zu den in der Auftragsbestätigung aufgelisteten Konditionen dar. 
                    </p>
                    <p>
                      2.3. Der Anbieter ist nicht verpflichtet Angebote anzunehmen. 
                    </p>
                    <h2>3. Services </h2>
                    <p>
                      3.1. Nach erfolgreicher Registrierung und Erhalt der Auftragsbestätigung wird dem Kunden der Zugriff auf den Cloud Services Staffbite gemäß der vereinbarten Konditionen durch den Anbieter erteilt. Anschließend können die, in der Auftragsbestätigung vereinbarten, Services zur Schicht- und Personalplanung genutzt werden.  
                    </p>
                    <p>
                      3.2. Die Konditionen und Servicebeschreibungen des Cloud Services sind auf der Website <a href="www.staffbite.de">staffbite.de</a> dargestellt. 
                    </p>
                    <p>
                      3.3. Die Services von Staffbite werden ständig weiterentwickelt. Kunden erhalten stets und ohne Aufpreis die neueste Version der, in der Auftragsbestätigung vereinbarten, Services. Somit soll der Nutzen und das Erlebnis der Kunden stetig verbessert werden. Die Inanspruchnahme weiterer Services bedarf eines gesonderten Angebots, das vom Anbieter erneut durch eine Auftragsbestätigung angenommen werden muss. Ein Anspruch auf die Nutzung einer älteren Version durch den Kunden besteht nicht. 
                    </p> 
                    <p>
                      3.4. Der Anbieter stellt die Cloud Services per Fernzugriff über das Internet mit einer Verfügbarkeit von 97,5% bereit. Die Verfügbarkeit berechnet sich anhand der Zeit des laufenden Kalendermonats abzüglich Wartungszeiten. Wartungsarbeiten finden am Wochenende oder Werktags zwischen 22 Uhr und 3 Uhr (mitteleuropäische Zeit) statt. Hierfür sind monatlich 4 Stunden vorgesehen. Während Wartungsarbeiten durchgeführt werden, sind die aufgeführten Services möglicherweise nicht verfügbar. 
                    </p> 
                    <h2>4. Preise, Laufzeit, Rechnungsstellung </h2> 
                    <p>
                      4.1. Der Anbieter bietet verschiedene Konditionen, um die Cloud Services von Staffbite in Anspruch zu nehmen. Die wesentliche Kennzahl hierbei ist die Anzahl der Teammitglieder des Kunden. Während des Registrierungsprozesses wird die Anzahl der Beschäftigten des Kunden abgefragt. Anhand dieser Angabe wird der Preis zur Nutzung des Cloud Services bemessen. Die Preise entsprechend der Teamgröße sind als Nettopreise zuzüglich Mehrwertsteuer zu verstehen und auf <a href="www.staffbite.de">staffbite.de</a>. 
                    </p> 
                    <p>
                      4.2. Der Kunde kann jederzeit neue Teammitglieder einladen oder ausladen. Hierbei ist zu beachten, dass gemäß der vereinbarten Konditionen eine maximale Anzahl Teammitglieder festgelegt ist. Wird diese Anzahl überschritten, gilt der Preis der zutreffenden Teamgröße ab dem nächsten Kalendermonat. Dies gilt sowohl für das monatliche als auch das jährliche Abonnement. Um dies zu gewährleisten, wird die Teamgröße des Kunden monatlich automatisiert überprüft. 
                    </p> 
                    <p>
                      4.3. Kunden erhalten standardmäßig einen Probemonat, um die Cloud Services des Anbieters zu testen. Nach Ablauf des Probemonats (30 Tage) beginnt die Vertragslaufzeit zum ersten des darauffolgenden Kalendermonats. 
                    </p> 
                    <p>
                      4.4. Die Vertragslaufzeit wird gemäß der vereinbarten Konditionen im Registrierungsprozess durch den Kunden bestimmt. Hierbei kann zwischen einem jährlichen Abonnement und einem monatlichen Abonnement gewählt werden. 
                    </p> 
                    <p>
                      4.4.1. Die Vertragslaufzeit bei Auswahl des jährlichen Abonnement beträgt zunächst ein Jahr. Sofern der Vertrag nicht gekündigt wird, verlängert sich dieser erneut um ein weiteres Jahr. 
                    </p> 
                    <p>
                      4.4.2. Die Vertragslaufzeit bei Auswahl des monatlichen Abonnement beträgt zunächst drei Monate. Sofern der Vertrag nicht gekündigt wird, verlängert sich dieser anschließend jeweils um einen Monat.  
                    </p> 
                    <p>
                      4.5. Die Rechnungsstellung und -übermittlung geschieht ausschließlich elektronisch. 
                    </p> 
                    <p>
                      4.6. Rechnungen werden zu Beginn des Rechnungszeitraums gestellt und sind innerhalb von zwei Wochen zu zahlen.
                    </p> 
                    <h2>5. Support</h2> 
                    <p>
                      5.1. Treten Probleme bei der Nutzung eines Cloud Services von Staffbite auf, können Kunden diese während der Supportzeiten telefonisch melden. Die Supportzeiten und Kontaktinformationen sind auf <a href="www.staffbite.de">staffbite.de</a> dargestellt. 
                    </p> 
                    <h2>6. Dokumentation </h2>
                    <p>
                      6.1. Der Anbieter stellt Kunden kostenfrei verschiedene Videos zur Funktionsweise des Cloud Services zur Verfügung. Diese Videos können als Erklärungsvideos verstanden werden und sind auf der Website des Anbieters zu finden. 
                    </p> 
                    <h2>7. Kündigung und Kündigungsfristen</h2>
                    <p>
                      7.1. Die Kündigung des Vertrags bedarf der Schriftform. 
                    </p>
                    <p>
                      7.2. Die Kündigungsfrist ist abhängig von der Vertragslaufzeit (siehe 4.4.1. & 4.4.2.).  
                    </p>
                    <p>
                      7.2.1. Die Kündigungsfrist des jährlichen Abonnements beträgt zwei Monate. Somit muss zwei Monate vor Ablauf des Abonnements eine schriftliche Kündigung beim Anbieter eingehen.   
                    </p>
                    <p>
                      7.2.2. Die Kündigungsfrist des monatlichen Abonnements beträgt zwei Wochen. Somit muss zwei Wochen vor Ablauf des Abonnements eine schriftliche Kündigung beim Anbieter eingehen. 
                    </p> 
                    <h2>8. Referenzen</h2>
                    <p>
                      8.1. Der Kunde ist einverstanden, dass der Anbieter den Namen und das Logo des Kunden für Marketingmaterialen verwenden darf. Soll dies nicht geschehen, reicht eine kurze schriftliche Mitteilung aus.
                    </p>
                    <h2>9. Pflichten der Kunden </h2>
                    <p>
                      9.1. Der Kunde ist für die Aktualität und Korrektheit der eingegebenen personenbezogenen und firmenbezogenen Daten verantwortlich. 
                    </p>
                    <p>
                      9.2. Der Kunde ist für die Geheimhaltung und Aufbewahrung der Zugangsinformationen seines Accounts verantwortlich. Jeder Account hat lediglich einen Inhaber und darf nicht mit mehreren Nutzern geteilt werden. 
                    </p>
                    <p>
                      9.3. Der Kunde hat Störungen der Cloud Services sofort dem Anbieter mitzuteilen.  
                    </p> 
                    <h2>10. Datenschutz </h2>
                    <p>
                      10.1. Damit die Cloud Services von Staffbite genutzt werden können, müssen die Mitarbeiter des Kunden einbezogen werden. Aus diesem Grund wird der Anbieter vom Kunden als Auftragsverarbeiter der Daten beauftragt. Der Anbieter versichert, dass keinerlei personenbezogenen Daten an Dritte weitergegeben werden. Die Vereinbarung ist unter <a href="www.staffbite.de">staffbite.de</a> zu finden. 
                    </p>
                    <p>
                      10.2. Alle weiteren Informationen bezüglich der Speicherung der Daten, Informationspflichten und des allgemeinen Datenschutzes sind auf <a href="www.staffbite.de">staffbite.de</a> einsehbar. 
                    </p>
                    <h2>11. Haftung, Haftungsbeschränkung</h2>
                    <p>
                      11.1. Der Anbieter haftet ausschließlich bei eigenem Verschulden. Die Haftung des Anbieters beschränkt sich, soweit mit geltendem Recht vereinbar, auf 150€. 
                    </p>
                    <h2>12. Ausnahmen von der Beschränkung der Haftung </h2>
                    <p>
                      12.1. Ausgenommen von der Haftung ist die Verletzung von Leben, Körper und Gesundheit i.S.d. §309 Nr. 7 a BGB und grobes Verschulden i.S.d. §309 Nr.7 b BGB. 
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section" id={"sectiondatasecurity"}>
            <Container className="mb-4 pt-4">
              <Row className="justify-content-center mb-4 mt-4">
                <Col className="order-md-1" md="12">
                  <div className="pr-md-5">
                    <h1>Datenschutzerklärung </h1>
                    <p>
                    Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Der Datenschutz hat für die Florian Zellmann & Daniel Zellmann GbR einen besonders hohen Stellenwert. 
                    </p>
                    <h2>1. Datenschutz auf einen Blick</h2>
                    <h3>Allgemeine Hinweise</h3>
                    <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung. 
                    </p>
                    <h2>Datenerfassung auf dieser Website </h2>
                    <h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                    <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen. 
                    </p>
                    <h3>Wie erfassen wir Ihre Daten?</h3>
                    <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.  
                    <br/>
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten. 
                    </p>
                    <h3>Wofür nutzen wir Ihre Daten?</h3>
                    <p>
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. 
                    </p>
                    <h3>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                    <p>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. 
                    <br/>
                    Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.  
                    <br/>
                    Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden. Verwenden Sie hierfür die E-Mail-Adresse: info@staffbite.de 
                    </p>
                    Datenschutzbeauftragter 
                    <p>
                    Daniel Zellmann 
                    <br/>
                    info@stafftbite.de 
                    </p>
                    <h3>2. Hosting</h3>

                    <h3>IONOS</h3> <p>Wir hosten unsere Website bei IONOS SE. Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur (nachfolgend: IONOS). Wenn Sie unsere Website besuchen, erfasst IONOS verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerkl&auml;rung von IONOS: <a href="https://www.ionos.de/terms-gtc/terms-privacy" target="_blank" rel="noopener noreferrer">https://www.ionos.de/terms-gtc/terms-privacy</a>.</p> <p>Die Verwendung von IONOS erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer m&ouml;glichst zuverl&auml;ssigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.</p> 

                    <h4>Auftragsverarbeitung</h4> <p>Wir haben einen Vertrag &uuml;ber Auftragsverarbeitung (AVV) mit dem oben genannten Anbieter geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gew&auml;hrleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p> 

                    <h2>3. Allgemeine Hinweise und Pflicht&shy;informationen</h2> 

                    <h3>Datenschutz</h3> <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p> <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen. Die vorliegende Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu welchem Zweck das geschieht.</p> <p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p> 

                    <h3>Hinweis zur verantwortlichen Stelle</h3> <p>Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser Website ist:</p> <p>Florian Zellmann &amp; Daniel Zellmann GbR</p> 

                      

                    <p>Telefon: 01727018493<br /> 

                    E-Mail: info@staffbite.de</p> 

                    <p>Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen, E-Mail-Adressen o. &Auml;.) entscheidet.</p> 

                      

                    <h3>Speicherdauer</h3> <p>Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt. Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gel&ouml;scht, sofern wir keine anderen rechtlich zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die L&ouml;schung nach Fortfall dieser Gr&uuml;nde.</p> 

                    <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3> <p>Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.</p> 

                    <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3> <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH F&Uuml;R EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p> <p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p> 

                    <h3>Beschwerde&shy;recht bei der zust&auml;ndigen Aufsichts&shy;beh&ouml;rde</h3> <p>Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutma&szlig;lichen Versto&szlig;es zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p> 

                    <h3>Recht auf Daten&shy;&uuml;bertrag&shy;barkeit</h3> <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format aush&auml;ndigen zu lassen. Sofern Sie die direkte &Uuml;bertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p> 

                    <h3>Auskunft, L&ouml;schung und Berichtigung</h3> <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.</p> 

                    <h3>Recht auf Einschr&auml;nkung der Verarbeitung</h3> <p>Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der Verarbeitung besteht in folgenden F&auml;llen:</p> <ul> <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, ben&ouml;tigen wir in der Regel Zeit, um dies zu &uuml;berpr&uuml;fen. F&uuml;r die Dauer der Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li> <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtm&auml;&szlig;ig geschah/geschieht, k&ouml;nnen Sie statt der L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.</li> <li>Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung von Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht, statt der L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li> <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abw&auml;gung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li> </ul> <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschr&auml;nkt haben, d&uuml;rfen diese Daten &ndash; von ihrer Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union oder eines Mitgliedstaats verarbeitet werden.</p> 

                    <h3>Widerspruch gegen Werbe-E-Mails</h3> <p>Der Nutzung von im Rahmen der Impressumspflicht ver&ouml;ffentlichten Kontaktdaten zur &Uuml;bersendung von nicht ausdr&uuml;cklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.</p> 

                    <h2>4. Datenerfassung auf dieser Website</h2> 

                    <h3>Cookies</h3> <p>Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;. Cookies sind kleine Textdateien und richten auf Ihrem Endger&auml;t keinen Schaden an. Sie werden entweder vor&uuml;bergehend f&uuml;r die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endger&auml;t gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Permanente Cookies bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese selbst l&ouml;schen&nbsp;oder eine automatische L&ouml;schung durch Ihren Webbrowser erfolgt.</p> <p>Teilweise k&ouml;nnen auch Cookies von Drittunternehmen auf Ihrem Endger&auml;t gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese erm&ouml;glichen uns oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.&nbsp;B. Cookies zur Abwicklung von Zahlungsdienstleistungen).</p> <p>Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren w&uuml;rden (z.&nbsp;B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten&nbsp;oder Werbung anzuzeigen.</p> <p>Cookies, die zur Durchf&uuml;hrung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung bestimmter, von Ihnen erw&uuml;nschter Funktionen (funktionale Cookies, z.&nbsp;B. f&uuml;r die Warenkorbfunktion) oder zur Optimierung der Website (z.&nbsp;B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden Cookies ausschlie&szlig;lich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.</p> <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das automatische L&ouml;schen der Cookies beim Schlie&szlig;en des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p> <p>Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hier&uuml;ber im Rahmen dieser Datenschutzerkl&auml;rung gesondert informieren und ggf. eine Einwilligung abfragen.</p> 

                    <h3>Kontaktformular</h3> <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p> <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich ist. In allen &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.</p> <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck f&uuml;r die Datenspeicherung entf&auml;llt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen &ndash; insbesondere Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.</p> 

                    <h3>Anfrage per E-Mail, Telefon oder Telefax</h3> <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p> <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich ist. In allen &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.</p> <p>Die von Ihnen an uns per Kontaktanfragen &uuml;bersandten Daten verbleiben bei uns, bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck f&uuml;r die Datenspeicherung entf&auml;llt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen &ndash; insbesondere gesetzliche Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.</p> 

                    <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p> 
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
export default Impressum;