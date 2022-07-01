import {
    Label,
    Button,
    Row,
    Col
} from "reactstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from "react-redux";
import { resettingModal } from "../reducers/modal";
import { deleteApplicantAfterPublish, settingApplicantAfterPublish, settingSetApplicant } from "../reducers/Shiftplan";
import { settingShiftplanChanged } from "../reducers/shiftplanChanged";
import InfoLabel from "./InfoLabel";
import { INFO_USER_NOTICE } from "../constants/InfoTexts";


const ModalApplyAfterPublish = (props) => {
    const dispatch = useDispatch();
    const applyAfterPublish = useSelector(state => state.modal.applyAfterPublish);
    const index = useSelector(state => state.shiftSlot.index);
    const day = useSelector(state => state.shiftSlot.day);
    const Employee = useSelector(state => state.DB.employee);
    const Shiftplan = useSelector(state => state.Shiftplan);
    const ShiftName = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftStart = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftStart);
    const ShiftEnd = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftEnd);
    const ShiftPosition = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index].Wochentag.ShiftPosition);
    const ShiftNotice = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].notice || "");
    const ApplicantsAfterPublish = useSelector(state => state.Shiftplan.plan[state.shiftSlot.index][state.shiftSlot.day].applicantsAfterPublish || {});
    const CompanyAccess = useSelector(state => state.Meta.accessPosition);

    function setApplication () {
        if  (
                Employee.position.includes(ShiftPosition) &&
                CompanyAccess[ShiftPosition] &&
                CompanyAccess[ShiftPosition].includes("accessSetInShiftWithoutAdmin")
            ) {
                dispatch(settingSetApplicant({index: index, day: day, Employee: {SK: Employee.SK, name: Employee.name}}))
                dispatch(resettingModal())
                dispatch(settingShiftplanChanged())        
                return;
            }

        if  (
            Employee.position.includes(ShiftPosition)
        ) {
            dispatch(settingApplicantAfterPublish({index: index, day: day, Employee: {SK: Employee.SK, name: Employee.name}}))
            dispatch(resettingModal())
            dispatch(settingShiftplanChanged())        
        }
    }

    function includesUser() {
        if(!Object.keys(Shiftplan.plan[index][day]).includes("applicantsAfterPublish")) {
            return false;
        }
        return Object.keys(Shiftplan.plan[index][day].applicantsAfterPublish).includes(Employee.SK)
    }

    const deleteApplication = () => {
        dispatch(deleteApplicantAfterPublish({index: index, day: day, employeeId: Employee.SK}))
        dispatch(resettingModal())
        dispatch(settingShiftplanChanged())
      }
        return (
            <Modal 
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modal-secondary"
                    show={applyAfterPublish} onHide={() => dispatch(resettingModal())}
            >
                    <Label className="h2 m-3 text-center">In Schicht eintragen</Label>
                <Modal.Body className="pt-1">
                    <Row className="mx-4 mt-3">
                        <Col xs={6}>
                            <InfoLabel title="Schicht" description={INFO_USER_NOTICE}></InfoLabel>
                        </Col>
                        <Col xs={6}>
                            <p className=" mt-0">{ShiftName} {day} {ShiftStart} - {ShiftEnd}</p>
                        </Col>
                    </Row>

                    <Row hidden={!ShiftNotice} className="mx-4">
                        <Col xs={6}>
                        <InfoLabel title="Notiz" description={INFO_USER_NOTICE}></InfoLabel>
                        </Col>
                        <Col xs={6}>
                            <p className="font-weight-bold">
                                {ShiftNotice}
                            </p>
                        </Col>
                    </Row>

                    <Row hidden={!Object.keys(ApplicantsAfterPublish).includes(Employee.SK)} className="mx-4">
                        <Col xs={6}>
                            <InfoLabel title="Bewerber"/>
                        </Col>
                        <Col xs={6}>
                            <p>Deine Verfübarkeit ist gespeichert.</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="link" onClick={() => dispatch(resettingModal())}> Schließen </Button>
                    {includesUser()
                    ?
                    <Button className="" color="danger" onClick={() => deleteApplication()}>Bewerbung zurückziehen</Button>
                    :
                    <Button color="success" onClick={() => setApplication()}> Eintragen </Button>  
                    }
                </Modal.Footer>
            </Modal>
        );
    }
export default ModalApplyAfterPublish;