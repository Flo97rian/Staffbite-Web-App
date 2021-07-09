import React from "react";
// core components
import ListGroup from 'react-bootstrap/ListGroup';

export default class SchichtplanElement extends React.PureComponent {
    dataModal(e) {
        if (e === "<br />") {
            return (<ListGroup>
                            <ListGroup.Item action variant="primary" onClick={() => this.props.onClick(this.props.index)}><br /></ListGroup.Item>
                    </ListGroup>
        )} else if (e === "Datum" || e === "Wochentag" || e === "Summe") {
            return ( <ListGroup>
                            <ListGroup.Item action variant="primary">{e}</ListGroup.Item>
                    </ListGroup>
        )} else {
            return (<ListGroup>
                        <ListGroup.Item action variant="primary" onClick={() => this.props.onClick(this.props.index)}><small>{e[1]} - {e[2]}</small><br /><small>{e[0]}</ small></ListGroup.Item>
                    </ListGroup>
        )}

    }
    render() {
        return (
        <>
            {this.props.Schichtplan ? this.dataModal(this.props.Schichtplan[this.props.index].Wochentag) : <></>}
        </>
        );
    }
}