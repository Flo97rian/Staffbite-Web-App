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
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateShiftPlan } from "../store/middleware/UpdateShiftPlan";
import { declineShiftTrade, settingShiftTrade } from "../reducers/Shiftplan";
import { settingEmployeeTargetShiftTrade } from "../reducers/userInput";

function CardTradeShift (props) {
    const dispatch = useDispatch();
    const userInputEmployeeTrade = useSelector(state => state.userInput.employeeTargetShiftTrade)
    const shiftplan = useSelector(state => state.Shiftplan);
    const shiftTrades = useSelector(state => state.Shiftplan.tauschanfrage);
    const displayShiftplan = useSelector(state => state.display.displayShiftplan)
    //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
    const acceptShiftTrade = (index) => {
        let targetEmployee = {};
        if(userInputEmployeeTrade === "") {
            const targetId = Object.keys(shiftTrades[index].applicants)[0];
            targetEmployee[targetId] = shiftTrades[index].applicants[targetId];
            dispatch(settingEmployeeTargetShiftTrade(targetEmployee))
        } else {
            targetEmployee = {...userInputEmployeeTrade};
        }
        dispatch(settingShiftTrade({tradeIndex: index, newEmployee: {...targetEmployee}}))
        dispatch(thunkUpdateShiftPlan(shiftplan, !1));
    };

    //Diese Funktion sorgt für das Syncronisieren eines bearbeiteten Schichtplans mit der Datenbank
    const deleteShiftTrade = (index) => {
        dispatch(declineShiftTrade(index))
        dispatch(thunkUpdateShiftPlan(shiftplan, !1));
      };
        if (displayShiftplan) {
            return (
                <Row className="mt-4">
            <div className="col">
                <Card className="shadow">
                <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Tauschanfragen</h3>
                </CardHeader>
                <CardBody>
                {shiftTrades.map((item, index) => (
                <ListGroup flush>
                    <ListGroupItem className="mt-2">
                        <Row>
                            <Col xs={6}>
                                <p className="pt-2">Tauschanfrage von <b>{item.traderName}</b> für die Schicht <b>{shiftplan.plan[item.row].Wochentag.ShiftName}</b> am <b>{shiftplan.plan[1][item.col]}</b></p>
                            </Col>
                            <Col xs={3}>
                                { Object.keys(item.applicants).length > 0 ?
                                <Form.Control as="select" type="text" defaultValue={Object.keys(item.applicants)[0]} name="setTrade" onChange={(event) => dispatch(settingEmployeeTargetShiftTrade({[event.target.value]: item.applicants[event.target.value]}))}>
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
                                <Button className="float-right" color="success" onClick={(e) => acceptShiftTrade(index)}>Annehmen</Button>
                                :
                                <Button className="float-right" color="success" disabled>Annehmen</Button>
                                }
                                <Button className="float-left" color="warning"onClick={(e) => deleteShiftTrade(index)}>Ablehnen</Button>
                            </Col>
                        </Row>
                    </ListGroupItem>  
                </ListGroup>
                ))}
                </CardBody>
                </Card>
            </div>
            </Row>
        )}
        return null
}

export default CardTradeShift;