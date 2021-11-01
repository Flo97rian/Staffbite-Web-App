import {
    ListGroup,
    ListGroupItem,
    Button,
    Row,
    Card,
    CardBody,
    CardHeader,
    Col
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import { hasValidTauschanfragen, isValidShiftplan } from "./ValidFunctions";

function SetTradeShift (props) {
    let hasShiftplan = isValidShiftplan(props.shiftplan);
    if (hasShiftplan) {
        if (hasValidTauschanfragen(props.shiftplan)) {
            return (
                <Row className="mt-4">
            <div className="col">
                <Card className="shadow">
                <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Tauschanfragen</h3>
                </CardHeader>
                <CardBody>
                {props.shiftplan.tauschanfrage.map((item, index) => (
                <ListGroup flush>
                    <ListGroupItem className="mt-2">
                        <Row>
                            <Col xs={6}>
                                <p className="pt-2">Tauschanfrage von <b>{item.traderName}</b> für die Schicht <b>Frühschicht</b> am <b>Mittwoch</b></p>
                            </Col>
                            <Col xs={3}>
                                { Object.keys(item.applicants).length > 0 ?
                                <Form.Control as="select" type="text" defaultValue={Object.keys(item.applicants)[0]} name="setTrade" onChange={(e) => props.onChange(e)}>
                                {Object.keys(item.applicants).map((applicant, index) =>
                                <option value={applicant}>{item.applicants[applicant]}</option>
                                )}
                                </Form.Control>
                                :
                                <p className="pt-2">Keine Bewerber vorhanden</p>
                                }
                            </Col>
                            <Col xs={3}>
                                { Object.keys(item.applicants).length > 0 ?
                                <Button className="float-right" color="success" onClick={(e) => props.onTradeSubmit(index)}>Annehmen</Button>
                                :
                                <Button className="float-right" color="success" disabled>Annehmen</Button>
                                }
                                <Button className="float-left" color="warning"onClick={(e) => props.onCancelSumbit(index)}>Ablehnen</Button>
                            </Col>
                        </Row>
                    </ListGroupItem>  
                </ListGroup>
                ))}
                </CardBody>
                </Card>
            </div>
            </Row>
        )} else {
            return null;
        }
    } else {
        return null;
    }
}

export default SetTradeShift;