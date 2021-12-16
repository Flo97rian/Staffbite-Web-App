import React from "react";

import {
    Row,
    Col,
    Card, 
    CardBody
  }
  from "reactstrap";

// core components
import MitarbeiterListeItem from "./MitarbeiterListe/MitarbeiterListeItem";
import MitarbeiterListeStandard from "./MitarbeiterListe/MitarbeiterListeStandard"

const MitarbeiterTabelle = (props) => {
    const employees = props.mitarbeiter
        return(
            <>
                { props.meta?.stundenerfassung ? 
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
                        { employees !== !1 ? Object.keys(employees).map((ma, index) => (
                                <div key={index}  onClick={() => {props.setSelectEmployee(ma)}}>
                                   <MitarbeiterListeItem 
                                   {...props}
                                   key= {ma}
                                   id={ma}
                                   aktiv={employees[ma].aktiv}
                                   email={employees[ma].email}
                                   name={employees[ma].name}
                                   akutellerverdienst={employees[ma].akutellerverdienst}
                                   position={employees[ma].position}
                                   stundenlohn={employees[ma].stundenlohn}
                                   zielmtleuro={employees[ma].zielmtleuro}
                                   zielmtlh={employees[ma].zielmtlh}
                                   ueberstunden={employees[ma].ueberstunden}
                                   frei={employees[ma].frei}
                                   erfahrung={employees[ma].erfahrung}
                                   schichtenwoche={employees[ma].schichtenwoche}
                                   ></MitarbeiterListeItem>
                               </div>
                               ))
                        : 
                        <></>
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
                            { employees !== !1 ? Object.keys(employees).map((ma, index) => (
                                  <div key={index}  onClick={() => {props.setSelectEmployee(ma)}}>
                                     <MitarbeiterListeStandard 
                                     {...props}
                                     key= {ma}
                                     id={ma}
                                     aktiv={employees[ma].aktiv}
                                     email={employees[ma].email}
                                     name={employees[ma].name}
                                     position={employees[ma].position}
                                     ueberstunden={employees[ma].ueberstunden}
                                     frei={employees[ma].frei}
                                     erfahrung={employees[ma].erfahrung}
                                     schichtenwoche={employees[ma].schichtenwoche}
                                     ></MitarbeiterListeStandard>
                                </div>
                                 ))
                            :
                            <></>
                            }
                        </>
            }
        </>
        );
    }
export default MitarbeiterTabelle;