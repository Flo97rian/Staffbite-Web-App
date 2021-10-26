import React from "react";


export default class OpenModal extends React.PureComponent {
    dataModal(e) {
    }
    render() {
        return (
        <>
            {this.props.checkTrue(this.props.show) ? this.dataModal(this.props.show) : <></>}
        </>
        );
    }
}