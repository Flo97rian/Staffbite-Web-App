export const planIdColor = (id) => {
    const planid = id.split("#")[1]
    if (planid.includes("Entwurf")) {
        return (
            <p className="mt-3" style={{"color": "#5e72e4"}}>Entwurf</p>
    )} else if (planid.includes("Freigeben")) {
        return (
            <p className="mt-3" style={{"color": "#fb6340"}}>Freigegeben</p>
    )} else if (planid.includes("Review")) {
        return (
            <p className="mt-3" style={{"color": "#5e72e4"}}>Review</p>
    )} else if (id.includes("Veröffentlicht")) {
        return (
            <p className="mt-3" style={{"color": "#2dce89"}}>Veröffentlicht</p>
    )}
}