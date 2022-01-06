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
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import LandingNavBar from "../../components/Navbars/LandingNavbar"
import LandingFooter from "../../components/Footers/LandingFooter";
import { AV_DESCRIPTION, AV_TITLE } from "../../constants/MetaTexts";

function AV (props) {
  useEffect(() => {
    pageViewsTracking()
  },[])

  function pageViewsTracking () {
    const pathname = "/av";
  
    let pageView;
    if(pathname === "*") pageView = "/not_found";
    else pageView = pathname;
  
    ReactGA.pageview(pageView);
  } 
    return (
    <>
        <Helmet>
          <title>{AV_TITLE}</title>
          <meta name="description" content={AV_DESCRIPTION}/>
          <link rel="canonical" href="https://www.staffbite.de/av" />
        </Helmet>
       <LandingNavBar
              logo={{
                innerLink: "/",
                imgSrc: require("../../assets/img/brand/Staffbite_Logo.png").default,
                imgAlt: "Abbildung des Logos von Staffbite",
                }}/>
      {/* Page content */}
      <Container className="pt-5" fluid>
        <Container className="mt-6">
                    <Row className="justify-content-left ml-1 mt-4">
                        <h1>Auftragsdatenverarbeitung</h1>
                    </Row>
        </Container>
        <Container className=" mb-4 pt-4">
              <Row>
                <Col className="mb-5 mb-lg-0" lg="12" md="12">
                  <div className="px-4">
                    <p>Hier findest du die Blanko-AV. Bitte schreibe eine Mail an info@staffbite.de, damit du eine unterschriebene Version inkl. Anlagen erhälst.</p>
                
                    <h2>1. Einleitung, Geltungsbereich, Definitionen</h2>
                    <p>(1)	Dieser Vertrag regelt die Rechte und Pflichten von Auftraggeber und -nehmer (im Folgenden „Parteien“ genannt) im Rahmen einer Verarbeitung von personenbezogenen Daten im Auftrag.<br/>
                    (2)	Dieser Vertrag findet auf alle Tätigkeiten Anwendung, bei denen Mitarbeiter des Auftragnehmers oder durch ihn beauftragte Unterauftragnehmer (Subunternehmer) personenbezogene Daten des Auftraggebers in dessen Auftrag verarbeiten.<br/>
                    (3)	In diesem Vertrag verwendete Begriffe sind entsprechend ihrer Definition in der EU Datenschutz-Grundverordnung zu verstehen. In diesem Sinne ist der Auftraggeber der „Verantwortliche“, der Auftragnehmer der „Auftragsverarbeiter“. Soweit Erklärungen im Folgenden „schriftlich“ zu erfolgen haben, ist die Schriftform nach § 126 BGB gemeint. Im Übrigen können Erklärungen auch in anderer Form erfolgen, soweit eine angemessene Nachweisbarkeit gewährleistet ist.</p>

                    <h2>2. Gegenstand und Dauer der Verarbeitung</h2>
                    <h3>2.1	Gegenstand </h3>
                    <p>Der Auftragnehmer übernimmt folgende Verarbeitungen: Um die Anmeldung beim Cloud Services des Auftragsverarbeiters zu ermöglichen, werden personenbezogene Daten benötigt. Darüber hinaus werden weitere personenbezogene Daten benötigt, um dem Auftraggeber die Organisation und Verwaltung seiner Mitarbeiter zu ermöglichen. Da der Auftragsverarbeiter Cloud Services zur Schichtplanung anbietet, werden ebenfalls personenbezogene Daten bezüglich der Soll-Arbeitszeit, Berufserfahrung und der Tätigkeiten der Mitarbeiter beim Auftragstraggeber benötigt. Durch die Verarbeitung dieser Daten wird die Befüllung der Schichtpläne ermöglicht.</p>
                    <h3>2.2	Dauer </h3>
                    <p>Die Verarbeitung beginnt am [DATUM] und erfolgt auf unbestimmte Zeit bis zur Kündigung dieses Vertrags oder des Hauptvertrags durch eine Partei.</p>
                  
                    <h2>3. Art, Zweck und Betroffene der Datenverarbeitung</h2>
                    <h3>3.1	Art der Verarbeitung</h3>
                    <p>Die Verarbeitung ist folgender Art: Erfassen, Organisation, Ordnen, Speicherung, Auslesen, Abfragen, Verwendung, Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung.</p>
                    <h3>3.2	Zweck der Verarbeitung</h3>
                    <p>Der zugrundeliegende Zweck der Verarbeitung ist in der Beschreibung der Cloud Services auf der Website des Auftragsverarbeiters beschrieben.</p>
                    <h3>3.3	Art der Daten</h3>
                    <p>Es werden folgende Daten verarbeitet:<br/>
                        •	Vor- und Nachnahme<br/>
                        •	E-Mail-Adresse<br/>
                        •	Voraussichtliche Arbeitszeiten<br/>
                        •	Berufserfahrung<br/>
                        •	Tätigkeit im Betrieb
                    </p>
                    <h3>3.4	Kategorien der betroffenen Personen</h3>
                    <p>Von der Verarbeitung betroffen sind:<br/>
                    •	Mitarbeiter des Auftraggebers
                    </p>

                    <h2>4. Pflichten des Auftragnehmers</h2>
                    <p>(1)	Der Auftragnehmer verwendet die zur Verarbeitung überlassenen Daten nicht für eigene Zwecke.<br/>
                    (2)	Der Auftragnehmer verpflichtet sich, bei der Verarbeitung die Vertraulichkeit streng zu wahren.<br/>
                    (3)	Auskünfte an Dritte oder den Betroffenen darf der Auftragnehmer nur nach vorheriger Zustimmung durch den Auftraggeber erteilen. Direkt an ihn gerichtete Anfragen wird er unverzüglich an den Auftraggeber weiterleiten.<br/>
                    (4)	Die Auftragsverarbeitung erfolgt grundsätzlich innerhalb der EU oder des EWR.<br/>
                    </p>

                    <h2>5. Sicherheit der Verarbeitung</h2>
                    <p>(1)	Die Datensicherheitsmaßnahmen können der technischen und organisatorischen Weiterentwicklung entsprechend angepasst werden, solange das gesetzlich vorgeschriebene Niveau nicht unterschritten wird. Zur Aufrechterhaltung der Informationssicherheit erforderliche Änderungen hat der Auftragnehmer unverzüglich umzusetzen.<br/>
                    (2)	Kopien oder Duplikate werden ohne Wissen des Auftraggebers nicht erstellt. Ausgenommen sind technisch notwendige, temporäre Vervielfältigungen, soweit eine Beeinträchtigung des hier vereinbarten Datenschutzniveaus ausgeschlossen ist.
                    </p>

                    <h2>6. Regelungen zur Berichtigung, Löschung und Sperrung von Daten</h2>
                    <p>Im Rahmen des Auftrags verarbeitete Daten wird der Auftragnehmer nur entsprechend der getroffenen vertraglichen Vereinbarung berichtigen, löschen oder sperren. </p>

                    <h2>7. Unterauftragsverhältnisse</h2>
                    <p>(1)	Zurzeit sind die in Anlage 1 mit Namen, Anschrift und Auftragsinhalt bezeichneten Subunternehmer mit der Verarbeitung von personenbezogenen Daten in dem dort genannten Umfang beschäftigt und durch den Auftraggeber genehmigt. <br/>
                    (2)	 Unterauftragsverhältnisse im Sinne dieses Vertrags sind nur solche Leistungen, die einen direkten Zusammenhang mit der Erbringung der Hauptleistung aufweisen. Nebenleistungen, wie beispielsweise Wartung und die Inanspruchnahme von Telekommunikationsdienstleistungen oder Benutzerservice sind nicht erfasst. Die Pflicht des Auftragnehmers, auch in diesen Fällen die Beachtung von Datenschutz und Datensicherheit sicherzustellen, bleibt unberührt.
                    </p>

                    <h2>8. Rechte und Pflichten des Auftraggebers</h2>
                    <p>(1)	Für die Beurteilung der Zulässigkeit der beauftragten Verarbeitung sowie für die Wahrung der Rechte von Betroffenen ist allein der Auftraggeber verantwortlich.<br/>
                    (2)	Der Auftraggeber informiert den Auftragnehmer unverzüglich, wenn er Fehler oder Unregelmäßigkeiten bei der Prüfung der Auftragsergebnisse feststellt.
                    </p>

                    <h2>9. Mitteilungspflichten</h2>
                    <p>Der Auftragnehmer teilt dem Auftraggeber Verletzungen des Schutzes im Auftrag verarbeiteter personenbezogener Daten unverzüglich mit. Auch begründete Verdachtsfälle hierauf sind mitzuteilen. Die Mitteilung hat spätestens innerhalb von 24 Stunden ab Kenntnis des Auftragnehmers vom relevanten Ereignis an eine vom Auftraggeber benannte Adresse zu erfolgen.</p>

                    <h2>10. Beendigung des Auftrags</h2>
                    <p>(1)	Befinden sich bei Beendigung des Auftragsverhältnisses im Auftrag verarbeitete Daten oder Kopien derselben noch in der Verfügungsgewalt des Auftragnehmers, hat dieser die Daten zu vernichten.  Die Vernichtung hat so zu erfolgen, dass eine Wiederherstellung auch von Restinformationen mit vertretbarem Aufwand nicht mehr möglich ist. <br/>
                    (2)	Der Auftragnehmer ist verpflichtet, die unverzügliche Vernichtung auch bei Subunternehmern herbeizuführen.
                    </p>

                    <h2>11. Vergütung</h2>
                    <p>Die Vergütung des Auftragnehmers ist abschließend im Hauptvertrag geregelt. Eine gesonderte Vergütung oder Kostenerstattung im Rahmen dieses Vertrages erfolgt nicht.</p>

                    <h2>12. Haftung</h2>
                    <p>Die Haftung gilt i. S. d. Artikel 82 DSGVO.</p>

                    <h2>13. Sonstiges</h2>
                    <p>(1)	Beide Parteien sind verpflichtet, alle im Rahmen des Vertragsverhältnisses erlangten Kenntnisse von Geschäftsgeheimnissen und Datensicherheitsmaßnahmen der jeweils anderen Partei auch über die Beendigung des Vertrages vertraulich zu behandeln. Bestehen Zweifel, ob eine Information der Geheimhaltungspflicht unterliegt, ist sie bis zur schriftlichen Freigabe durch die andere Partei als vertraulich zu behandeln.<br/> 
                    (2)	Für Nebenabreden ist die Schriftform und die ausdrückliche Bezugnahme auf diese Vereinbarung erforderlich.<br/>
                    (3)	Die Einrede des Zurückbehaltungsrechts i. S. v. § 273 BGB wird hinsichtlich der im Auftrag verarbeiteten Daten und der zugehörigen Datenträger ausgeschlossen. <br/>
                    (4)	Sollten einzelne Teile dieser Vereinbarung unwirksam sein, so berührt dies die Wirksamkeit der Vereinbarung im Übrigen nicht.
                    </p>


                  </div>
                </Col>
              </Row>
        </Container>
      </Container>
      <LandingFooter></LandingFooter>
    </>
  );
};
export default AV;