import React from "react";
import {Badge} from "reactstrap"
import PropTypes from "prop-types";

const InputBadges = ({filter, title, onClickFilter}) => {
    if(filter[title]) return <Badge color="primary" pill onClick={() => onClickFilter(title)}>{title}</Badge>
    return <Badge color="light" pill onClick={() => onClickFilter(title)}>{title}</Badge>
}

InputBadges.propTypes = {
    filter: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    onClickFilter: PropTypes.func.isRequired,
}

export default InputBadges;