import {
    ListGroup,
    ListGroupItem,
    Button,
    Row,
    Col
} from "reactstrap"
import Form from 'react-bootstrap/Form';

const ApplyTradeShift = (props) => {
    return (
        <>
        {props.shiftplan.tauschanfrage.map((item, index) => (
            <ListGroup flush>
                <ListGroupItem className="mt-2">
                    <Row>
                        <Col xs={6}>
                            <p className="pt-2">Tauschanfrage von <b>{item.traderName}</b> für die Schicht <b>{props.shiftplan.plan[props.shiftplan.tauschanfrage[index].row]["Wochentag"].ShiftName}</b> am <b>{item.col}</b></p>
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
                            { item.traderId === props.currentUser.SK ?
                            <Button className="float-left" color="warning" onClick={() => props.onDeleteTrade(index)}>Zurückziehen</Button>
                            :
                            <></>
                            }
                            { Object.keys(item.applicants).length > 0 && item.traderId !== props.currentUser.SK ?
                            <Button className="float-left" color="warning" onClick={() => props.onTradeCancel(index)}>X</Button>
                            :
                            <></>
                            }
                            { item.traderId === props.currentUser.SK ?
                            <Button className="float-right" color="success" disabled>Bewerben</Button>
                            :
                            <Button className="float-right" color="success" onClick={() => props.onTradeAppy(index)}>Bewerben</Button>
                            }
                        </Col>
                    </Row>
                </ListGroupItem>  
            </ListGroup>
        ))}
        </>
    );
}

export default ApplyTradeShift;