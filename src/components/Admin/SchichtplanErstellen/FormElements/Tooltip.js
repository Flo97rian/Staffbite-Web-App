import {
    Col,
    Row,
    Button
} from "reactstrap"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const InfoTooltip = (props) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} style={{zIndex:"1000000"}}>
        Simple tooltip
        </Tooltip>
    );
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant="success">Hover me to see</Button>
    </OverlayTrigger>
  )
}
export default InfoTooltip