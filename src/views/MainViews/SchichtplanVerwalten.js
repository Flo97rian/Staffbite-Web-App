/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  CardHeader,
  CardBody,
  Container,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SchichtenVerwaltet from "../../components/IndexSections/SchichtenVerwaltet.js"

export default class SchichtplanVerwalten extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SchichtErstellenModal: false,
      SchichtImportierenModal: false,
      Schichtplan: [
        {Datum: "Datum", Wochentag: "Wochentag", Summe: "Summe", Schicht1: "9:00 - 18:00", Schicht1Color: "primary", Schicht2: "9:00 - 18:00", Schicht2Color: "primary", Schicht3: "9:00 - 15:00", Schicht3Color: "primary", Schicht4: "12:00 - 18:00", Schicht4Color: "primary", SchichtKueche: <small>Küche</small>, SchichtService: <small>Service</small>, SchichtLeitung: <small>Leitung</small>},
        {Datum: "29.03.21", Wochentag: "Montag", Summe: "6", Schicht1: "Anja", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
        {Datum: "30.03.21", Wochentag: "Dienstag", Summe: "6", Schicht1: "Daniel", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
        {Datum: "31.03.21", Wochentag: "Mittwoch", Summe: "6", Schicht1: "Karo", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
        {Datum: "01.04.21", Wochentag: "Donnerstag", Summe: "6", Schicht1: "Thomas", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
        {Datum: "02.04.21", Wochentag: "Freitag", Summe: "6", Schicht1: "Loay", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
        {Datum: "03.04.21", Wochentag: "Samstag", Summe: "6", Schicht1: "Merve", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
        {Datum: "04.04.21", Wochentag: "Sonntag", Summe: "6", Schicht1: "Tim", Schicht1Color: "success", Schicht2: <br />, Schicht2Color: "success", Schicht3: <br />, Schicht4: <br />},
      ],
      Schichtplan2: [
        {Datum: "Datum", Wochentag: "Wochentag", Summe: "Summe", Schicht1: "9:00 - 18:00", Schicht1Color: "primary", Schicht2: "9:00 - 18:00", Schicht2Color: "primary", Schicht3: "9:00 - 15:00", Schicht3Color: "primary", Schicht4: "12:00 - 18:00", Schicht4Color: "primary", SchichtKueche: <small>Küche</small>, SchichtService: <small>Service</small>, SchichtLeitung: <small>Leitung</small>},
        {Datum: "07.06.21", Wochentag: "Montag", Summe: "24", Schicht1: "Anja", Schicht1Color: "success", Schicht1Level: <small>Fortgeschritten</small>, Schicht2: "Loay", Schicht2Color: "success", Schicht2Level: <small>Experte</small>, Schicht3: "Karo", Schicht3Color: "success", Schicht3Level: <small>Anfänger</small>, Schicht4: "Tamina", Schicht4Color: "success", Schicht4Level: <small>Fortgeschritten</small>},
        {Datum: "08.06.21", Wochentag: "Dienstag", Summe: "24", Schicht1: "Daniel", Schicht1Color: "success", Schicht1Level: <small>Fortgeschritten</small>, Schicht2: "Thomas", Schicht2Color: "success", Schicht2Level: <small>Experte</small>, Schicht3: "Tim", Schicht3Color: "success", Schicht3Level: <small>Fortgeschritten</small>, Schicht4: "Tamina", Schicht4Color: "success", Schicht4Level: <small>Anfänger</small>},
        {Datum: "09.06.21", Wochentag: "Mittwoch", Summe: "24", Schicht1: "Karo", Schicht1Color: "success", Schicht1Level: <small>Experte</small>, Schicht2: "Tim", Schicht2Color: "success", Schicht3: "Merve", Schicht2Level: <small>Fortgeschritten</small>, Schicht3Color: "success", Schicht3Level: <small>Anfänger</small>, Schicht4: "Anna", Schicht4Color: "success", Schicht4Level: <small>Fortgeschritten</small>},
        {Datum: "10.06.21", Wochentag: "Donnerstag", Summe: "24", Schicht1: "Thomas", Schicht1Color: "success", Schicht1Level: <small>Fortgeschritten</small>, Schicht2: "Florian", Schicht2Color: "success", Schicht2Level: <small>Fortgeschritten</small>, Schicht3: "Tamina", Schicht3Color: "success", Schicht3Level: <small>Anfänger</small>, Schicht4: "Anna", Schicht4Color: "success", Schicht4Level: <small>Experte</small>},
        {Datum: "11.06.21", Wochentag: "Freitag", Summe: "24", Schicht1: "Loay", Schicht1Color: "success", Schicht1Level: <small>Fortgeschritten</small>, Schicht2: "Daniel", Schicht2Color: "success", Schicht2Level: <small>Experte</small>, Schicht3: "Florian", Schicht3Color: "success", Schicht3Level: <small>Experte</small>, Schicht4: "Anna", Schicht4Color: "success", Schicht4Level: <small>Fortgeschritten</small>},
        {Datum: "12.06.21", Wochentag: "Samstag", Summe: "24", Schicht1: "Merve", Schicht1Color: "success", Schicht1Level: <small>Experte</small>, Schicht2: "Thomas", Schicht2Color: "success", Schicht2Level: <small>Experte</small>, Schicht3: "Karo", Schicht3Color: "success", Schicht3Level: <small>Anfänger</small>, Schicht4: "Florian", Schicht4Color: "success", Schicht4Level: <small>Fortgeschritten</small>},
        {Datum: "13.06.21", Wochentag: "Sonntag", Summe: "24", Schicht1: "Tim", Schicht1Color: "success", Schicht1Level: <small>Experte</small>, Schicht2: "Loay", Schicht2Color: "success", Schicht2Level: <small>Experte</small>, Schicht3: "Merve", Schicht3Color: "success", Schicht3Level: <small>Fortgeschritten</small>, Schicht4: "Daniel", Schicht4Color: "success", Schicht4Level: <small>Fortgeschritten</small>},
      ]

    }
  }

  render() {
    return (
      <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Schichtplan erstellen</h3>
              </CardHeader>
              <CardBody>
                <Row className="text-center" noGutters={true}>
                  <Col xs={1}>
                    <span className="ni ni-bold-left"></span>
                  </Col>
                  <Col xs={10} className="text-center">
                    <Button variant="primary">Schichtplan befüllen</Button>{''}
                  </Col>
                  <Col xs={1}>
                    <span className="ni ni-bold-right"></span>
                  </Col>
                </Row>
                <br />
                <SchichtenVerwaltet 
                  Schichtplan={this.state.Schichtplan2}
                 />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
    );
  }
}
