import {
    Row,
    Col,
} from "reactstrap";

export const IntroTitle = () => {
    return (
      <Row className="mt--4">
        <Col xs="2">
        <a
            className="avatar avatar-sm rounded-circle"
            href="#pablo"
            onClick={e => e.preventDefault()}
        >
        </a>
        </Col>
        <Col xs="10">
            <div className="mt-2">
            <b>Daniel</b> von Staffbite
            </div>
        </Col>
    </Row>
  )
  }