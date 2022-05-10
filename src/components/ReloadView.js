import React from "react";
import { Row, Col, Spinner } from "reactstrap";

const ReloadView = (props) => {
    return (
            <>
      <Row className="text-center align-items-center">
        <Col xs={12}>
          <Spinner animation="grow" variant="light"/>
        </Col>
      </Row>
            </>
    )
}
export default ReloadView;