import {
    ListGroup,
    ListGroupItem,
    Button,
    Row,
    Col
} from "reactstrap"
import Form from 'react-bootstrap/Form';

const ApplyTradeShift = (props) => {
    const Employees = props.employees
    const currentPlan = props.plan[props.current]
    return (
        <>
        {props.plan[props.current].tauschanfrage.map((item, index) => (
            <ListGroup flush>
                <ListGroupItem className="mt-2">
                    <Row>
                        <Col xs={6}>
                            <p className="pt-2">Tauschanfrage von <b>{Employees[item.trader].name}</b> für die Schicht <b>{currentPlan.plan[currentPlan.tauschanfrage[index].row]["Wochentag"].ShiftName}</b> am <b>{item.col}</b></p>
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
                            { item.trader === props.currentUser.SK["S"] ?
                            <Button className="float-left" color="warning" onClick={() => props.onDeleteTrade(index)}>Zurückziehen</Button>
                            :
                            <></>
                            }
                            { Object.keys(item.applicants).length > 0 && item.trader !== props.currentUser.SK["S"] ?
                            <Button className="float-left" color="warning" onClick={() => props.onTradeCancel(index)}>X</Button>
                            :
                            <></>
                            }
                            { item.trader === props.currentUser.SK["S"] ?
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