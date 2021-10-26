import React from "react";
import { 
    Badge,
    Card,
    CardBody,
    Progress,
    Col,
    Row
} from "reactstrap";


export default class MitarbeiterListeItem extends React.PureComponent {
    render() {
        return(
                <>
                    <Card className="mb-1 mt-0">
                        <CardBody className="p-1">
                        <Row className="text-center">
                            <Col xs={1}>
                                {this.props.aktiv ? 
                                <p className="mt-3">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-success" />
                                    </Badge>
                                </p> 
                                :
                                <p className="mt-3">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-warning" />
                                    </Badge>
                                </p>
                                }
                            </Col>
                            <Col xs={2}>
                                <p className="mt-3">{this.props.name}</p>
                            </Col>
                            <Col xs={2}>
                                {this.props.position.map(item => {
                                    return (
                                        <Badge color="pirmary" className="mr-2">{item}</Badge>
                                    )
                                })}
                            </Col>
                            <Col xs={2}>
                                <p className="mt-3">{this.props.stundenlohn}€/h</p>
                            </Col>
                            <Col xs={2}>
                                <p className="text-center mb-0 mt-2">{this.props.akutellerverdienst}€ von {this.props.zielmtleuro}€</p>
                                <Progress max="1" value={this.props.akutellerverdienst / this.props.zielmtleuro} color="success" style={{"width": "150px", "height": "10px", "marginRight": "0", "marginLeft": "0" }}/>
                            </Col>
                            <Col xs={1}>
                                {this.props.frei ? 
                                <p className="mt-3">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-success" />
                                    </Badge>
                                </p> 
                                :
                                <p className="mt-3">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-warning" />
                                    </Badge>
                                </p>
                                }
                            </Col>
                            <Col xs={1}>
                                {this.props.ueberstunden ? 
                                <p className="mt-3">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-success" />
                                    </Badge>
                                </p> 
                                :
                                <p className="mt-3">
                                    <Badge color="" className="badge-dot">
                                        <i className="bg-warning" />
                                    </Badge>
                                </p>
                                }
                            </Col>
                            <Col xs={1}>
                                <p className="mt-3">{this.props.schichtenwoche}</p>
                            </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </>
        );
    }
}