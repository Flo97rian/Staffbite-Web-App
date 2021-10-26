export const planIdColor = (id) => {
    const planid = id.split("#")[1]
    if (planid.includes("Entwurf")) {
        return (
            <p className="mt-3" style={{"color": "#5e72e4"}}>Entwurf</p>
    )} else if (planid.includes("Freigeben")) {
        return (
            <p className="mt-3" style={{"color": "#fb6340"}}>Bewerbung</p>
    )} else if (planid.includes("Review")) {
        return (
            <p className="mt-3" style={{"color": "#5e72e4"}}>Überprüfung</p>
    )} else if (id.includes("Veröffentlicht")) {
        return (
            <p className="mt-3" style={{"color": "#2dce89"}}>Schichtplan</p>
    )}
}