// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import Switch from "../../../Application/functionalComponents/Switch";
import Button from "react-bootstrap/Button";
import { Row, Col, Card, CardBody } from "reactstrap";
import { INFO_SETTINGS_ALGORITHM_FAIR, INFO_SETTINGS_ALGORITHM_REVERSE } from "../../../../constants/InfoTexts";


const SchichtplanEinstellungen = (props) => {
        return (
            <>     
             <Row className="mt-6">
            <Col xs={2}className="mt-4">
                <h3 className="float-left pt-4 font-weight-bold text-lg">Einstellungen</h3>
            </Col>
            <Col xs={10}>
                <Button className="float-right mt-4" variant="primary" onClick={() => props.onClick()}><p className="m-0 text-white">Änderungen speichern</p></Button>
            </Col>
            </Row>
            <Card className="shadow">
                <CardBody>
                    <Row>
                        <Col>
                        <p className="lead mt-2">
                        Mit diesen Einstellungen können Sie die Funktionsweise des Algorithmus beeinflussen. Dies kann zu besseren - aber auch zu schlechteren Ergebnissen führen. Wir empfehlen die Standard-Einstellungen zu verwenden
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Switch info={true} type="switch" description={INFO_SETTINGS_ALGORITHM_REVERSE}label="Befüllung am Wochenende starten" name="reverse" value={props.org?.reverse ? props.org?.reverse["BOOL"] : false} onChange={(e) => props.onChange(e, "meta")}></Switch>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Switch info={true} type="switch" description={INFO_SETTINGS_ALGORITHM_FAIR} label="Tag/Abend-Schichten gleichmäßig verteilen" name="fair" value={props.org?.fair ? props.org?.fair["BOOL"] : false} onChange={(e) => props.onChange(e, "meta")}></Switch>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            </>
        );
    }
export default SchichtplanEinstellungen;