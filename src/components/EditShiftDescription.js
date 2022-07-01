import { useEffect } from "react";
import {
    Col,
    Row,
    FormGroup,
    Input,
} from "reactstrap"
import Form from 'react-bootstrap/Form';
import InfoLabel from "./InfoLabel";
import InputTime from "./InputTime";
import InputNumber from "./InputNumber";
import {INFO_SHIFTPLAN_SHIFT_END, INFO_SHIFTPLAN_SHIFT_NAME, INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES,INFO_SHIFTPLAN_SHIFT_POSITION, INFO_SHIFTPLAN_SHIFT_START } from "../constants/InfoTexts";
import { useSelector, useDispatch } from "react-redux";
import { resettingShiftEnd, settingShiftEnd, settingShiftName, settingShiftNumberOfEmployees, settingShiftPosition, settingShiftStart } from "../reducers/userInput";


const EditShiftDescription = (props) => {
    const dispatch = useDispatch();
    const DisplayNewShiftplan = useSelector(state => state.display.displayNewShiftplan);
    const newShiftplanDescription = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index]?.Wochentag : undefined);
    const ShiftplanDescription = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index]?.Wochentag : undefined);
    const newShiftplanNumberOfEmployees = useSelector(state => state.display.displayNewShiftplan ? state.newShiftPlan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.anzahl : undefined);
    const ShiftplanNumberOfEmployees = useSelector(state => state.display.displayShiftplan ? state.Shiftplan?.plan[state.shiftSlot.index][state.shiftSlot.day]?.anzahl : undefined);
    const shiftDetails = DisplayNewShiftplan ? newShiftplanDescription : ShiftplanDescription;
    const anzahl = DisplayNewShiftplan ? newShiftplanNumberOfEmployees : ShiftplanNumberOfEmployees;
    const CompanyPositions = useSelector(state => state.Meta.schichten);
    const userInput = useSelector(state => state.userInput);

    useEffect(() => {
        if(shiftDetails.ShiftPosition === "") {
            dispatch(settingShiftPosition(CompanyPositions[0]));
        }
    }, [])

        return(
            <>
                <Row>
                    <Col xs={1} ></Col>
                    <Col xs={10} >
                        <FormGroup className="mb-0 mt-0">
                            <InfoLabel title="Name der Schicht" description={INFO_SHIFTPLAN_SHIFT_NAME}></InfoLabel>
                            <Input type="text" className="" placeholder={shiftDetails.ShiftName} onChange={(event) => dispatch(settingShiftName(event.target.value))}></Input>
                        </FormGroup>
                        <Row className="mt-3">
                            <Col>
                                <InputNumber info={true} description={INFO_SHIFTPLAN_SHIFT_REQUIRED_EMPLOYEES} label="Anzahl benötigter Mitarbeiter" name="anzahl"  placeholder={anzahl} onChange={(event) => dispatch(settingShiftNumberOfEmployees(event.target.value))}></InputNumber>
                            </Col>
                            <Col>
                                <FormGroup className="">
                                    <InfoLabel title="Position" description={INFO_SHIFTPLAN_SHIFT_POSITION}></InfoLabel>
                                    <Input type="select" name="position" className=" edit-event--description input-autosize form-control" onChange={(event) => dispatch(settingShiftPosition(event.target.value))}>
                                        {CompanyPositions.map((item, index) => {
                                            if(item === shiftDetails.ShiftPosition) {
                                                return <option key={index} selected value={item}>{item}</option>
                                            }
                                        return (<option key={index} value={item}>{item}</option>
                                        )})}
                                        </Input>
                                </FormGroup>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputTime info={true} description={INFO_SHIFTPLAN_SHIFT_START}label="Beginn" name="beginn"  placeholder={shiftDetails.ShiftStart} onChange={(event) => dispatch(settingShiftStart(event.target.value))}></InputTime>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <InfoLabel title="Ende" description={INFO_SHIFTPLAN_SHIFT_END}></InfoLabel>
                                    </Col>
                                    <Col>
                                        <Row className="">
                                            <Col className="p-0">
                                                <p className="p-0 m-0">Open End?</p>
                                            </Col>
                                            <Col className="p-0">
                                            <Form className="pl-5">
                                                <Form.Check type="switch" id="ShiftEnd" defaultChecked={(shiftDetails.ShiftEnd === true || userInput.shiftEnd === "on")} onChange={(event) => {
                                                    if(userInput.shiftEnd === "on") {
                                                        dispatch(resettingShiftEnd(event.target.value))
                                                    } 
                                                    if(userInput.shiftEnd !== "on") {
                                                        dispatch(settingShiftEnd(event.target.value))
                                                    }
                                                }}></Form.Check>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Input type="time" className=" edit-event--description input-autosize form-control" name={props.name} value={props.value} defaultValue={shiftDetails.ShiftEnd} onChange={(event) => dispatch(settingShiftEnd(event.target.value))}></Input>
                            </Col>
                        </Row>
                        </Col>
                    <Col xs={1} ></Col>
                </Row>
            </>
        )
    }
export default EditShiftDescription