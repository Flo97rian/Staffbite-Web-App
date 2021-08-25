import React from "react";
import Table from "react-bootstrap/Table";
import store from "../../../store";

// core components
import MitarbeiterListeItem from "./MitarbeiterListe/MitarbeiterListeItem";

const MitarbeiterTabelle = (props) => {
    const employees = props.mitarbeiter
        return(
                <Table className="table-flush" responsive hover size="lg" bordered>
                <thead className="thead-light text-center">
                    <tr className="text-center">
                      <th scope="col">Aktiv</th>
                      <th scope="col">Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Stundenlohn</th>
                      <th scope="col">errichter Verdienst</th>
                      <th scope="col">frei</th>
                      <th scope="col">Überstunden</th>
                      <th scope="col">Schichten/Woche</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            employees.map((ma) => 
                            <tr className="text-center" key={ma.id}  onClick={() => {store.dispatch({type: "OPEN", payload: ma.id})}}>
                                <MitarbeiterListeItem 
                                {...props}
                                key= {ma.id}
                                id={ma.id}
                                aktiv={ma.aktiv}
                                email={ma.email}
                                name={ma.name}
                                akutellerverdienst={ma.akutellerverdienst}
                                position={ma.position}
                                stundenlohn={ma.stundenlohn}
                                zielmtleuro={ma.zielmtleuro}
                                zielmtlh={ma.zielmtlh}
                                ueberstunden={ma.ueberstunden}
                                frei={ma.frei}
                                erfahrung={ma.erfahrung}
                                schichtenwoche={ma.schichtenwoche}
                                ></MitarbeiterListeItem>
                            </tr>
                                )}</tbody>
                  </Table>
        );
    }
export default MitarbeiterTabelle;