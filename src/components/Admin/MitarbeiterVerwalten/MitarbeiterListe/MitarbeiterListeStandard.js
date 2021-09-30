import React from "react";
import { 
    Badge,
    Progress,
    Card,
    Row,
    Col,
    CardBody
} from "reactstrap";


export default class MitarbeiterListeStandard extends React.PureComponent {
    render() {
        return(
                <>
                    <Card className="mb-1 mt-0">
                        <CardBody className="p-1">
                        <Row className="text-center">
                            <Col xs={2}>
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
                                <p className="m-0">{this.props.position}</p>
                            </Col>
                            <Col xs={2}>
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
                            <Col xs={2}>
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
                            <Col xs={2}>
                                <p className="mt-3">{this.props.schichtenwoche}</p>
                            </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </>
        );
    }
}