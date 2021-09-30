const ApplicantTitle = (props) => {

    const title = (props) => {
        console.log(props)
    const hasApplicants = Object.keys(props.item.applicants).lenght > 0
    if (hasApplicants) {
        const IncludesCurrentUser = Object.keys(props.item.applicants).includes(props.currentUser.SK["S"])
        const ApplicantsLength = Object.keys(props.item.applicants).lenght
        const multipleApplicants = ApplicantsLength > 1
        if (IncludesCurrentUser && multipleApplicants) {
            return (<p className="pt-2">Keine Bewerber vorhanden</p>)
        } else if (IncludesCurrentUser && !multipleApplicants) {
            return (<p className="pt-2">jo{props.currentUser.name["S"]}</p>)
        } else if (IncludesCurrentUser && multipleApplicants) {
            return (<p className="pt-2">{props.currentUser.name["S"]}{" "}+{ApplicantsLength - 1}{" "}weitere</p>)
        } else if (IncludesCurrentUser && !multipleApplicants) {
            return (<p className="pt-2">{ApplicantsLength}{" "}Bewerber</p>)
    } else {
        return (<p className="pt-2">Keine Bewerber vorhanden</p>)
    }
    }}
    return (
    <>
        {title(props)}
    </>
    );
}
export default ApplicantTitle;