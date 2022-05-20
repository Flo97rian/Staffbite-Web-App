import React from "react";
import {isMobile} from 'react-device-detect';
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    UncontrolledAlert,
  } from "reactstrap";

const TrialBanner = () => {
    if(!isMobile) {
        return (
            <UncontrolledAlert color="info" className="fixed-bottom mx-4 mb-5" fade={false}>
            <Link to="/signup">
            <Row className="text-white">
              <Col xs="1" className="justify-content-center text-center">
            <span className="alert-inner--icon">
              <i className="fas fa-hand-pointer mt-3" />
            </span>{" "}
            </Col>
            <Col className="align-items-center text-left" xs="8">
            <p className="alert-inner--text mb-0 mt-2 lead">
              Starte jetzt deinen <a className="m-0 p-0 lead font-weight-bold text-white">kostenlosen Probemonat</a> und probiere Staffbite unverbindlich aus!
              {' '}
            </p>
            </Col>
            </Row>
            </Link>
          </UncontrolledAlert>
        )
    }
    return (
      <UncontrolledAlert color="white" className="fixed-bottom m-0 staffbite-trial-borders" fade={false}>
      <Link to="/signup">
        <Row className="text-dark">
          <Col xs="12" className="mx-4">
          <p className="mb-0 mt-0">
            <span className="alert-inner--icon pr-3">
              <i className="fas fa-laptop pt-2" />
            </span>
            {' '}{' '}
            Kostenlosen ausprobieren
          
          <span className="alert-inner--icon pl-3">
              <i className="fas fa-arrow-right" />
            </span>
            </p>
        </Col>
        </Row>
      </Link>
    </UncontrolledAlert>
  );
}

export default TrialBanner;