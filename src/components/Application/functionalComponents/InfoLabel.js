
import store from "../../../store";
function InfoLabel (props) {
    return (
        <p className="mb-0">
        {props.title}{' '}{' '}
        <i className="fa fa-info-circle text-light"
        onClick={() => store.dispatch({type: "OPEN_INFO", payload: {title: props.title, text: props.description}})} 
        ></i>
        </p>
    )
}
export default InfoLabel;