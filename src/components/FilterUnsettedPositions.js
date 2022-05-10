import { Badge } from "reactstrap";

const FilterUnsettedPositions = (props) => {
    let OrgPositions = props.meta.schichten;
    let UserPositions = props.userInput.position;
    if (OrgPositions.length !== 0) {
        let unsettedPositions = OrgPositions.filter(item => !(UserPositions.includes(item)))
        if(unsettedPositions.length !== 0 ) {
                return (
                    <>
                    {unsettedPositions.map((item, index) => 
                        <Badge key={index} className="mx-2 my-1" color="secondary" onClick={() => props.handleSetPositions(item)}>{item}</Badge>
                    )
                    }
                    </>
                )
        } else {
            return null
        }
    } else {
        return null
    }
}

export default FilterUnsettedPositions;