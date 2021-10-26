// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import Switch from "../../../Application/functionalComponents/Switch";
import Button from "react-bootstrap/Button";
import { Row, Col, Card, CardBody } from "reactstrap";


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
                        <Switch info={true} type="switch" description={"Der Algorithmus kann die Wochenende priorisiert befüllen. Dies kann von Vorteil sein, wenn am Wochenende besonders viel betrieb ist."}label="Befüllung am Wochenende starten" name="reverse" value={props.org?.reverse ? props.org?.reverse["BOOL"] : false} onChange={(e) => props.onChange(e, "meta")}></Switch>
                        <br/>
                        <Switch info={true} type="switch" description={"Mitarbeiter sollen in etwa gleich viele Tag/Abend-Schichten erhalten"} label="Tag/Abend-Schichten gleichmäßig verteilen" name="fair" value={props.org?.fair ? props.org?.fair["BOOL"] : false} onChange={(e) => props.onChange(e, "meta")}></Switch>
                </CardBody>
            </Card>
            </>
        );
    }
export default SchichtplanEinstellungen;