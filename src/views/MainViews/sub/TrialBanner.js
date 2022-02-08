import React from "react";
import {isMobile} from 'react-device-detect';
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Button,
    UncontrolledAlert,
  } from "reactstrap";

const TrialBanner = () => {
    if(!isMobile) {
        return (
            <UncontrolledAlert color="info" className="fixed-bottom mx-4 mb-5" fade={false}>
            <Row className="">
              <Col xs="1" className="justify-content-center text-center">
            <span className="alert-inner--icon">
              <i className="ni ni-like-2 mt-3" />
            </span>{" "}
            </Col>
            <Col className="align-items-center text-left" xs="8">
            <p className="alert-inner--text mb-0 mt-2 lead">
              Starte jetzt deinen kostenlosen Probemonat und probiere Staffbite unverbindlich aus!
            </p>
            </Col>
            <Col className="text-center" xs="3">
              <Link to="/signup">
                  <Button className="btn-icon btn-3 float-right opacity-9" color="success" type="button"><p className="text-sucess p-0 m-0">Kostenlos ausprobieren</p></Button>
                </Link>
            </Col>
            </Row>
          </UncontrolledAlert>
        )
    }
    return null;
}

export default TrialBanner;