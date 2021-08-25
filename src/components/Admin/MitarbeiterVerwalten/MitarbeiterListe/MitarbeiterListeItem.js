import React from "react";
import { 
    Badge,
    Progress
} from "reactstrap";


export default class MitarbeiterListeItem extends React.PureComponent {
    render() {
        return(
                <>
                    {this.props.aktiv ? 
                    <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                        </Badge>
                    </td> 
                    :
                    <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-warning" />
                        </Badge>
                    </td>
                    }
                    <td>{this.props.name}</td>
                    <td>{this.props.position}</td>
                    <td>{this.props.stundenlohn}€/h</td>
                    <td>
                        <div className="text-center">{this.props.akutellerverdienst}€ von {this.props.zielmtleuro}€</div>
                        <Progress max="1" value={this.props.akutellerverdienst / this.props.zielmtleuro} color="success" style={{"width": "150px", "height": "10px", "marginRight": "0", "marginLeft": "0" }}/>
                    </td>
                    {this.props.frei ? 
                    <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                        </Badge>
                    </td> 
                    :
                    <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-warning" />
                        </Badge>
                    </td>
                    }
                    {this.props.ueberstunden ? 
                    <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-success" />
                        </Badge>
                    </td> 
                    :
                    <td>
                        <Badge color="" className="badge-dot">
                            <i className="bg-warning" />
                        </Badge>
                    </td>
                    }
                    <td>{this.props.schichtenwoche}</td>
                </>
        );
    }
}