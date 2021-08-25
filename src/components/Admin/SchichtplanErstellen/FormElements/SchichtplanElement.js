import React from "react";
// core components
import ListGroup from 'react-bootstrap/ListGroup';

export default class SchichtplanElement extends React.PureComponent {
    dataModal(e) {
        if (this.props.index == 0 || this.props.index == 1 || this.props.index == e.length - 1 ) {
            return (<ListGroup>
                            <ListGroup.Item action variant="primary" onClick={() => this.props.onClick(this.props.index)}>{e[this.props.index][this.props.col]}</ListGroup.Item>
                    </ListGroup>
        )} else if (typeof e[this.props.index][this.props.col] == "string"){
            return (<ListGroup>
                        <ListGroup.Item action variant="" onClick={(e, j) => this.props.onClick(this.props.index, this.props.col)}><br/></ListGroup.Item>
                    </ListGroup>
        )} else {
            return (<ListGroup>
                        <ListGroup.Item action variant="success" onClick={(e, j) => this.props.onClick(this.props.index, this.props.col)}>{e[this.props.index][this.props.col][0]}</ListGroup.Item>
                    </ListGroup>
        )}

    }
    render() {
        return (
        <>
            {this.dataModal(this.props.plaene[this.props.plan].plan)}
        </>
        );
    }
}