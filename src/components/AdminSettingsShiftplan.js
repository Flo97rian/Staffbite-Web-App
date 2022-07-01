// Button der 3 Mal belegt werden kann
// Button um einen erstellten Schichtplan zu auszuwählen
import Button from "react-bootstrap/Button";
import { Row, Col, Card, CardBody } from "reactstrap";


const AdminSettingsShiftplan = (props) => {
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
                        Mit diesen Einstellungen kannst du die Funktionsweise des Algorithmus beeinflussen. Dies kann zu besseren - aber auch zu schlechteren Ergebnissen führen. Wir empfehlen die Standard-Einstellungen zu verwenden.
                        </p>
                        </Col>
                    </Row>
                    {/*<Row>
                        <Col>
                            <FormGroup>
                                <InfoLabel title={"Befüllung am Wochenende starten"} description={INFO_SETTINGS_ALGORITHM_REVERSE}></InfoLabel>
                                    <Form>
                                        <Form.Check className="ml-5" custom type="switch" size="lg" defaultChecked={ShiftplanReverse} onChange={(event) => dispatch(settingShiftplanFillingReverse(event.target.checked))}></Form.Check>
                                    </Form>
                            </FormGroup>           
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                    <FormGroup>
                                    <input defaultChecked type="checkbox" />
                                    <span className="custom-toggle-slider rounded-circle" />
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                        </Col>
                    </Row>
                    */}
                </CardBody>
            </Card>
            </>
        );
    }
export default AdminSettingsShiftplan;