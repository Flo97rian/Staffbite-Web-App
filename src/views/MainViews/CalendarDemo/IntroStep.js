import { useRef } from "react";
import {
    Row,
    Col,
    Media,
    Button,
} from "reactstrap";
import { Player } from "@lottiefiles/react-lottie-player";
import Author from "../../../assets/img/theme/Daniel Zellmann Profilbild.png";
import Create_Shift from "../../../assets/json/animation/Create_Shift.json";
import catchAnalyticsEvent from "./DemoAnalytics";


const TooltipBody = ({content}) => {
  return (
    <Row className="text-left py-3 px-4">
      <Col>
        {content}
      </Col>
    </Row>
  )
}
const TooltipHeader = ({title, closeProps}) => {

  return (
    <Row className="text-left">
      <Col xs="10" className="px-1">
        <h3 className="pt-4 ml-4">{title}</h3>
      </Col>
      <Col xs="2" className="px-1">
        <p className="m-0 mt-2 p-0" {...closeProps}>x</p>
      </Col>
    </Row>
  )
}
const TooltipAuthor = () => {
  return (
    <Row className="text-left px-4 py-2">
      <Col xs="2">
      <a
          className="avatar avatar-md rounded-circle"
      >
        <img alt="..." src={Author} />
      </a>
      </Col>
      <Col xs="10">
        <div className="ml-2 mt-3">
          <b>Daniel</b> von Staffbite
        </div>
      </Col>
    </Row>
  )
}

const TooltipFooter = ({step, closeProps, primaryProps, index}) => {
  const continueHidden = index === 1 || index === 3;
  const closeHidden = index === 0 || index === 1 || index === 2 || index === 3;
  const buttonsHidden = continueHidden && closeHidden
  return (
    <Row className=" pt-3 px-4 pb-3" hidden={buttonsHidden}>
      <Col>
        <Row className="text-left" hidden={closeHidden}>
          <Col>
            <Button size="sm" color="link" {...closeProps}>Beenden</Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row className="text-right" hidden={continueHidden}>
          <Col>
            <Button size="sm" color="primary" {...primaryProps}>{step.buttonText ? step.buttonText : "Weiter"}</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => {
  return (
  <div {...tooltipProps} className="bg-white card" style={{minWidth: "300px", maxWidth: "300px"}}>
   <TooltipHeader title={step.title} closeProps={closeProps}></TooltipHeader>
   <TooltipAuthor></TooltipAuthor>
   <TooltipBody content={step.content}></TooltipBody>
   <TooltipFooter index={index} step={step} closeProps={closeProps} primaryProps={primaryProps}></TooltipFooter>
  </div>
)};

