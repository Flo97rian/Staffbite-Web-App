import React, {useRef, useReducer} from "react"
import styled from "styled-components";
import Overlay from "react-overlays/esm/Overlay";
import Form from 'react-bootstrap/Form';
import { Row, Col } from "reactstrap";

const Tooltip = styled("div")`
  position: absolute;
`;

const Arrow = styled("div")`
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    transform: rotate(45deg);
    background: #000;
    width: 10px;
    height: 10px;
    top: 0;
    left: 0;
  }

  ${(p) =>
    ({
      left: "right: -4px;",
      right: "left: -4px;",
      top: "bottom: -4px;",
      bottom: "top: -4px;",
    }[p.placement])}
`;

const Body = styled("div")`
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  background-color: #172b4d;
`;

const PLACEMENTS = ["top"];

const initialSstate = {
  show: false,
  placement: null,
};

function reducer(state, [type, payload]) {
  switch (type) {
    case "placement":
      return { show: !!payload, placement: payload };
    case "hide":
      return { ...state, show: false, placement: null };
    default:
      return state;
  }
}

const  InfoOverlayWithSwitch = (props) => {
  const description = props.description
  const infotitle = props.infotitle
  const [{ show, placement }, dispatch] = useReducer(
    reducer,
    initialSstate
  );
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    const nextPlacement =
      PLACEMENTS[PLACEMENTS.indexOf(placement) + 1];

    dispatch(["placement", nextPlacement]);
  };

  return (
    <div
      className="flex flex-col items-center"
      ref={containerRef}
    >
      <Row>
        <Col xs="4">
      <p className="mb-1 form-control-label mt-0">
      {infotitle}{' '}{' '}
      <i className="fa fa-info-circle text-light"
      ref={triggerRef}
      onClick={handleClick} 
      ></i>
      </p>
      </Col>
      <Col>
      <Row>
        <Col>
        <p className="float-right mx-2 mb-0">
            Open End?
        </p>
        </Col>
        <Col xs="2">
        <Form className="">
            <Form.Check custom type="switch" defaultChecked={props.checked} name={props.name} id={props.name} onChange={props.onChange}></Form.Check>
        </Form>
        </Col>
        </Row>
      </Col>
      </Row>
      <Overlay
        show={show}
        rootClose
        offset={[0, 10]}
        onHide={() => dispatch("hide")}
        placement={placement}
        container={containerRef}
        target={triggerRef}
      >
        {({ props, arrowProps, placement }) => (
          <Tooltip {...props} placement={placement}>
            <Arrow
              {...arrowProps}
              placement={placement}
              style={arrowProps.style}
            />
            <Body>
              <strong>{description}</strong>
            </Body>
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}
export default InfoOverlayWithSwitch;