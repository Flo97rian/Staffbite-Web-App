import React from "react";
import Table from "react-bootstrap/Table";

// core components
import MitarbeiterListeItem from "./MitarbeiterListe/MitarbeiterListeItem";


export default class MitarbeiterTabelle extends React.Component {
    render() {
        return(
                <Table className="table-flush" responsive hover size="lg" bordered>
                <thead className="thead-light">
                      <th scope="col">Aktiv</th>
                      <th scope="col">Name</th>
                      <th scope="col">Stundenlohn (€)</th>
                      <th scope="col">Ziel mtl. (€)</th>
                      <th scope="col">Ziel mtl. (h)</th>
                      <th scope="col">Überstunden</th>
                      <th scope="col">frei</th>
                      <th scope="col">Schichten/Woche</th>
                    </thead>
                    <tbody>{this.props.loading ? <tr><td>"Mitarbeiter werden geladen"</td></tr> : 
                            this.props.mitarbeiter.map((ma) => 
                            <tr className="text-center" key={ma.id}  onClick={() => this.props.onClick(ma.id)}>
                                <MitarbeiterListeItem 
                                {...this.props}
                                key= {ma.id}
                                id={ma.id}
                                aktiv={ma.aktiv}
                                email={ma.email}
                                name={ma.name}
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
}