import {
    Row,
    Col,
} from "reactstrap";
export const IntroContent = (props) => {
    console.log(props);
    const {title, content} = props;
    return (
      <>
      <Row>
        <Col>
          <h3>{title}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{content}</p>
        </Col>
      </Row>
      </>
    )
  }