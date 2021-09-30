export const planIdColor = (id) => {
    const planid = id.split("#")[1]
    if (planid.includes("Entwurf")) {
        return (
            <p style={{"color": "#5e72e4"}}>Entwurf</p>
    )} else if (planid.includes("Freigeben")) {
        return (
            <p style={{"color": "#fb6340"}}>Freigegeben</p>
    )} else if (planid.includes("Review")) {
        return (
            <p style={{"color": "#5e72e4"}}>Review</p>
    )} else if (id.includes("Veröffentlicht")) {
        return (
            <p style={{"color": "#2dce89"}}>Veröffentlicht</p>
    )}
}