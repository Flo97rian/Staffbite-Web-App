import React from "react";

import {
    Row,
    Col,
    Card, 
    CardBody
  }
  from "reactstrap";

// core components
import EmployeeItem from "./EmployeeItem";
import EmployeeItemStandard from "./EmployeeItemStandard";
import { useSelector, useDispatch } from "react-redux";
import { settingTemporaryEmployeeID } from "../../reducers/temporary";
import { settingModal } from "../../reducers/modal";

const EmployeesTable = (props) => {
    const dispatch = useDispatch()
    const Employees = useSelector(state => state.DB.employees);
    const Meta = useSelector(state => state.Meta);
        return(
            <>
                { Meta.stundenerfassung ? 
                <>
                    <Card className="mb-1 mt-0 card_mitarbeiterliste">
                        <CardBody className="p-1">
                            <Row className="text-center">
                                <Col xs={1}>
                                    <p className="mt-3 font-weight-bold">Aktiv</p>
                                </Col>
                                <Col xs={2}>
                                    <p className="mt-3 font-weight-bold">Name</p>
                                </Col>
                                <Col xs={2}>
                                <p className="mt-3 font-weight-bold">Positionen</p>
                                </Col>
                                <Col xs={2}>
                                    <p className="mt-3 font-weight-bold">Stundenlohn</p>
                                </Col>
                                <Col xs={2}>
                                    <p className="mt-3 font-weight-bold">aktueller Verdienst</p>
                                </Col>
                                <Col xs={1}>
                                    <p className="mt-3 font-weight-bold">Urlaub</p>
                                </Col>
                                <Col xs={1}>
                                    <p className="mt-3 font-weight-bold">Über- stunden</p>
                                </Col>
                                <Col xs={1}>
                                    <p className="mt-3 font-weight-bold">Schichten pro Woche</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                        {Object.keys(Employees).map((ma, index) => (
                                <div 
                                    key={index}
                                    onClick={() => {
                                        dispatch(settingTemporaryEmployeeID(ma));
                                        dispatch(settingModal(ma));
                                    }}    
                                >
                                   <EmployeeItem 
                                   {...props}
                                   key= {ma}
                                   id={ma}
                                   aktiv={Employees[ma].aktiv}
                                   email={Employees[ma].email}
                                   name={Employees[ma].name}
                                   akutellerverdienst={Employees[ma].akutellerverdienst}
                                   position={Employees[ma].position}
                                   stundenlohn={Employees[ma].stundenlohn}
                                   zielmtleuro={Employees[ma].zielmtleuro}
                                   zielmtlh={Employees[ma].zielmtlh}
                                   ueberstunden={Employees[ma].ueberstunden}
                                   frei={Employees[ma].frei}
                                   erfahrung={Employees[ma].erfahrung}
                                   schichtenwoche={Employees[ma].schichtenwoche}
                                   ></EmployeeItem>
                               </div>
                               ))
                        }
                    </>
                  :
                        <>
                        <Card className="mb-1 mt-0 card_mitarbeiterliste">
                        <CardBody className="p-1">
                        <Row className="text-center">
                            <Col xs={2}>
                                <p className="mt-3 font-weight-bold">Aktiv</p>
                            </Col>
                            <Col xs={2}>
                                <p className="mt-3 font-weight-bold">Name</p>
                            </Col>
                            <Col xs={2}>
                            <p className="mt-3 font-weight-bold">Positionen</p>
                            </Col>
                            <Col xs={2}>
                                <p className="mt-3 font-weight-bold">Urlaub</p>
                            </Col>
                            <Col xs={2}>
                                <p className="mt-3 font-weight-bold">Überstunden</p>
                            </Col>
                            <Col xs={2}>
                                <p className="mt-3 font-weight-bold">Schichten pro Woche</p>
                            </Col>
                            </Row>
                        </CardBody>
                    </Card>
                            {Object.keys(Employees).map((ma, index) => (
                                  <div 
                                    key={index}
                                    onClick={() => {
                                        dispatch(settingTemporaryEmployeeID(ma));
                                        dispatch(settingModal(ma));
                                    }}
                                    >
                                     <EmployeeItemStandard 
                                     {...props}
                                     key= {ma}
                                     id={ma}
                                     aktiv={Employees[ma].aktiv}
                                     email={Employees[ma].email}
                                     name={Employees[ma].name}
                                     position={Employees[ma].position}
                                     ueberstunden={Employees[ma].ueberstunden}
                                     frei={Employees[ma].frei}
                                     erfahrung={Employees[ma].erfahrung}
                                     schichtenwoche={Employees[ma].schichtenwoche}
                                     ></EmployeeItemStandard>
                                </div>
                                 ))
                            }
                        </>
            }
        </>
        );
    }
export default EmployeesTable;