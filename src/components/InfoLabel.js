
import store from "../store";
import PropTypes from "prop-types";
const InfoLabel = ({title, description}) => {
    return (
        <p className="mb-1 form-control-label mt-0">
        {title}{' '}{' '}
        <i className="fa fa-info-circle text-light"
        onClick={() => store.dispatch({type: "OPEN_INFO", payload: {title: title, text: description}})} 
        ></i>
        </p>
    )
}

InfoLabel.defaultProps = {
    title: "Title",
    description: "Description"
}

InfoLabel.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}
export default InfoLabel;