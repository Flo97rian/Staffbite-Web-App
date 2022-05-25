import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Button
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { applyForShiftTrade, deleteTradeShift } from "../reducers/Shiftplan";
import { thunkUpdateTradeShift } from "../store/middleware/UpdateTradeShift";
import { isThisWeek, startOfWeek } from "date-fns";

const UserShiftplanTrades = () => {
    const dispatch = useDispatch();
    const ShiftplanTrades = useSelector(state => state.Shiftplan.tauschanfrage);
    const DisplayShiftplan = useSelector(state => state.display.displayShiftplan);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const Employee = useSelector(state => state.DB.employee);

    const deleteTrade = (index) => {
        dispatch(deleteTradeShift({tradeIndex: index, employeeId: Employee.SK}));
        dispatch(thunkUpdateTradeShift(Shiftplan));
    }

    const applyForTrade = (index) => {
        dispatch(applyForShiftTrade({tradeIndex: index, Employee:{ employeeId: Employee.SK, emplyeeName: Employee.name}}));
        dispatch(thunkUpdateTradeShift(Shiftplan));
    }

    const removeApplyForTrade = (index) => {
        dispatch(removeApplyForTrade({tradeIndex: index, employeeId: Employee.SK}));
        dispatch(thunkUpdateTradeShift(Shiftplan));
    }
    if(DisplayShiftplan) {
        const CurrentWeekTimeStamp = startOfWeek(new Date(), { weekStartsOn: 1, locale: "de" });
        const CurrentWeekStart = CurrentWeekTimeStamp.getDate() + "." + (CurrentWeekTimeStamp.getMonth() + 1) + "." + CurrentWeekTimeStamp.getFullYear();
        if(Shiftplan.zeitraum.split(' - ')[0] === CurrentWeekStart) {
            return (
                <Card className="shadow">
                    <CardHeader className="bg-transparent">
                        <h3 className="mb-0">Tauschanfragen</h3>
                    </CardHeader>
                    <CardBody>
                        {ShiftplanTrades.map((trade, index) => {
                            return (
                                <ListGroup flush>
                                    <ListGroupItem className="mt-2">
                                        <Row>
                                            <Col xs={6}>
                                                <p className="pt-2">Tauschanfrage von <b>{trade.traderName}</b> für die Schicht <b>{Shiftplan.plan[ShiftplanTrades[index].row]["Wochentag"].ShiftName}</b> am <b>{trade.col}</b></p>
                                            </Col>
                                            <Col xs={3}>
                                                { Object.keys(trade.applicants).length > 0 ?
                                                <Form.Control as="select" type="text" defaultValue={Object.keys(trade.applicants)[0]} name="setTrade" onChange={(e) => console.log(e)}>
                                                {Object.keys(trade.applicants).map((applicant, index) =>
                                                <option value={applicant}>{trade.applicants[applicant]}</option>
                                                )}
                                                </Form.Control>
                                                :
                                                <p className="pt-2">Keine Bewerber vorhanden</p>
                                                }
                                            </Col>
                                            <Col xs={3}>
                                                <Button hidden={trade.traderId !== Employee.SK} className="float-left" color="warning" onClick={() => deleteTrade(index)}>Zurückziehen</Button>
                                                <Button 
                                                hidden={trade.traderId === Employee.SK}
                                                className="float-left" color="warning" onClick={() => removeApplyForTrade(index)}>X</Button>
                                                <Button 
                                                hidden={trade.traderId === Employee.SK}
                                                className="float-right" color="success">Bewerben</Button>
                                                <Button 
                                                hidden={trade.traderId === Employee.SK} className="float-right" color="success" onClick={() => applyForTrade(index)}>Bewerben</Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>  
                                </ListGroup>
                                )})}
                    </CardBody>
                </Card>
            )
            }
}
    return null;
}
export default UserShiftplanTrades;