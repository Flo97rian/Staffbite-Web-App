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
  Badge,
  Card,
  Col,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  CardBody,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'

const MAverwalten = () => {
  const [modalShow, setModalShow] = React.useState(false);
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
                <h3 className="mb-0">Mitarbeiter:innen verwalten</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs={4}>
                  </Col>
                  <Col xs={4}>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Mitarbeiter:innen erstellen</Button>{' '}
                  </Col>
                  <Col xs={4}>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Aktiv</th>
                        <th scope="col">Name</th>
                        <th scope="col">Stundenlohn</th>
                        <th scope="col">Ziel mtl. (€)</th>
                        <th scope="col">Ziel mtl. (h)</th>
                        <th scope="col">Überstunden</th>
                        <th scope="col">frei</th>
                        <th scope="col">Schichten/Woche</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </Table>
                </Row>
              </CardBody>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mitarbeiter:innen hinzufügen
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="text-center">
          <Col xs={6}>
            <Form.Label>Name</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control type="text" placeholder=""></Form.Control>
          </Col>
        </Row>
        <br />
        <Row className="text-center">
          <Col xs={6}>
            <Form.Label>E-Mail</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control type="text" placeholder=""></Form.Control>
          </Col>
        </Row>
        <br />
        <Row className="text-center">
          <Col xs={6}>
            <Form.Label>Stundenlohn (€)</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control type="text" placeholder=""></Form.Control>
          </Col>
        </Row>
        <br />
        <Row className="text-center">
          <Col xs={6}>
            <Form.Label>Ziel mtl. (€)</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control type="text" placeholder=""></Form.Control>
          </Col>
        </Row>
        <br />
        <Row className="text-center">
          <Col xs={6}>
            <Form.Label>Ziel mtl. (h)</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control type="text" placeholder="" readOnly></Form.Control>
          </Col>
        </Row>
        <br />
        <Row className="text-center">
          <Col xs={6}>
            <Form.Label>Schichten/Woche</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control type="text" placeholder="" readOnly></Form.Control>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Schließen</Button>
        <Button onClick={props.onHide}>Speichern</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MAverwalten;
