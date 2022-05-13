import { Badge } from "reactstrap";

//Ziel: Zeige die Positionen des Betriebs an, wenn der User sie nicht schon inne hat
const FilterSettedPositions = (props) => {
    let OrgPositions = props.meta.schichten;
    let UserPositions = props.userInput.position;
    if (OrgPositions.length !== 0) {
        let settedPositions = OrgPositions.filter(item => UserPositions.includes(item))
        let settedNewPositions = UserPositions.filter(item => !(OrgPositions.includes(item)))
        settedPositions = [...settedPositions, ...settedNewPositions]
        if ( settedPositions.length !== 0) {            
            return (
                <>
                {settedPositions.map((item, index) => 
                    <Badge key={index} className="mx-2 my-1" color="success" onClick={() => props.handleRemovePositions(item)}>{item}</Badge>
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

export default FilterSettedPositions;