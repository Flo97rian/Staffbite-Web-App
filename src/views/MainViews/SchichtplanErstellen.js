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
import Modal from 'react-bootstrap/Modal'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'
import SchichtenTable from "../../components/IndexSections/SchichtenTable.js";

export default class SchichtplanErstellen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SchichtErstellenModal: false,
      SchichtImportierenModal: false,
      Schichtplan: [
        {Datum: "Datum", Wochentag: "Wochentag", Summe: "Summe", Schicht1: "9:00 - 18:00", Schicht1Color: "primary", Schicht2: "9:00 - 18:00", Schicht2Color: "primary", Schicht3: "9:00 - 15:00", Schicht3Color: "primary", Schicht4: "12:00 - 18:00", Schicht4Color: "primary", SchichtKueche: <small>Küche</small>, SchichtService: <small>Service</small>, SchichtLeitung: <small>Leitung</small>},
        {Datum: "07.06.21", Wochentag: "Montag", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
        {Datum: "08.06.21", Wochentag: "Dienstag", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
        {Datum: "09.06.21", Wochentag: "Mittwoch", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
        {Datum: "10.06.21", Wochentag: "Donnerstag", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
        {Datum: "11.06.21", Wochentag: "Freitag", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
        {Datum: "12.06.21", Wochentag: "Samstag", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
        {Datum: "13.06.21", Wochentag: "Sonntag", Summe: "0", Schicht1: <br />, Schicht1Color: "secondary", Schicht2: <br />, Schicht2Color: "secondary", Schicht3: <br />, Schicht3Color: "secondary", Schicht4: <br />, Schicht4Color: "secondary"},
      
    ]
    }
  }

  showSchichtErstellenModal = () => {this.setState({SchichtErstellenModal:true});}

  hideSchichtErstellenModal = () => this.setState({SchichtErstellenModal:false});

  showSchichtImportierenModal = () => this.setState({SchichtImportierenModal:true});

  hideSchichtImportierenModal = () => this.setState({SchichtImportierenModal:false});

  handleChange = (event) => this.setState({[event.target.name] : event.target.value});

  updateSchichtplan = () => {
  };

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
                  <Col xs={3} className="text-right">
                    <Button variant="primary" onClick={this.showSchichtImportierenModal}>Vorlage importieren</Button>{''}
                  </Col>
                  <Col xs={4} className="text-center">
                    <Button variant="primary" onClick={this.showSchichtErstellenModal}>Schicht hinzufügen</Button>{''}
                  </Col>
                  <Col xs={3} className="text-left">
                    <Button variant="primary">Vorlage speichern</Button>{''}
                  </Col>
                  <Col xs={1}>
                    <span className="ni ni-bold-right"></span>
                  </Col>
                </Row>
                <br />
                 <SchichtenTable 
                  Schichtplan={this.state.Schichtplan}
                 />
                </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal
        show={this.state.SchichtErstellenModal}
        onHide={this.hideSchichtErstellenModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Schicht hinzufügen
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardColumns>
            <Card>
              <CardHeader>
                Uhrzeit
              </CardHeader>
              <CardBody>
                <Form.Label>Beginn:</Form.Label>
                <Form.Control type="text" name="Beginn" placeholder="10:00" onChange={this.handleChange}></Form.Control>
                <br />
                <Form.Label>Ende:</Form.Label>
                <Form.Control type="text" name="Ende" placeholder="15:00" onChange={this.handleChange}></Form.Control>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Wochentag
              </CardHeader>
              <CardBody>
                <Form>
                  <Form.Check type="switch" name="Montag" id="Montag" label="Montag"/>
                  <Form.Check type="switch" name="Dienstag" id="Dienstag" label="Dienstag"/>
                  <Form.Check type="switch" name="Mittwoch" id="Mittwoch" label="Mittwoch"/>
                  <Form.Check type="switch" name="Donnerstag" id="Donnerstag" label="Donnerstag"/>
                  <Form.Check type="switch" name="Freitag" id="Freitag" label="Freitag"/>
                  <Form.Check type="switch" name="Samstag" id="Samstag" label="Samstag"/>
                  <Form.Check type="switch" name="Sonntag" id="Sonntag" label="Sonntag"/>
                  <br />
                  <Form.Check type="switch" id="Prio" label="Prio Schicht"/>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Dauer
              </CardHeader>
              <CardBody>
                <Form.Label>Für die nächsten:</Form.Label>
                <Form.Control type="text" placeholder="Wochen" onChange={this.handleChange}></Form.Control>
              </CardBody>
            </Card>
          </CardColumns>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideSchichtErstellenModal}>Schließen</Button>
          <Button onClick={this.updateSchichtplan}>Speichern</Button>
        </Modal.Footer>
      </Modal>
       <Modal
        show={this.state.SchichtImportierenModal}
        onHide={this.hideSchichtImportierenModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Schichtplan importieren
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className="text-center">
            <Col xs={6}>
              <Form.Label>Vorlage Frühling</Form.Label>
            </Col>
            <Col xs={6}>
              <Button variant="primary">Vorlage importieren</Button>{''}
            </Col>
          </Row>
          <br />
          <Row className="text-center">
            <Col xs={6}>
              <Form.Label>Vorlage Sommer</Form.Label>
            </Col>
            <Col xs={6}>
            <Button variant="primary">Vorlage importieren</Button>{''}
            </Col>
          </Row>
          <br />
          <Row className="text-center">
            <Col xs={6}>
              <Form.Label>Vorlage Herbst</Form.Label>
            </Col>
            <Col xs={6}>
            <Button variant="primary">Vorlage importieren</Button>{''}
            </Col>
          </Row>
          <br />
          <Row className="text-center">
            <Col xs={6}>
              <Form.Label>Vorlage Winter</Form.Label>
            </Col>
            <Col xs={6}>
              <Button variant="primary">Vorlage importieren</Button>{''}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideSchichtImportierenModal}>Schließen</Button>
          <Button onClick={this.hideSchichtImportierenModal}>Speichern</Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}
