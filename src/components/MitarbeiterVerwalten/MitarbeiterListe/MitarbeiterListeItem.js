import React from "react";
import { 
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
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
                    <td>{this.props.stundenlohn}</td>
                    <td>{this.props.zielmtleuro}</td>
                    <td>{this.props.zielmtlh}</td>
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
                    <td>
                    <UncontrolledDropdown>
                    <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                    >
                    <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem onClick={() => this.props.onClick(this.props.id)}>
                        Bearbeiten
                    </DropdownItem>
                    <DropdownItem onClick={() => this.props.handleDelete(this.props.id)}>
                        Löschen
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </td>
                </>
        );
    }
}