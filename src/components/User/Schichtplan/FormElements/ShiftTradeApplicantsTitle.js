const ApplicantTitle = (props) => {

    const title = (props) => {
    const hasApplicants = Object.keys(props.item.applicants).lenght > 0
    if (hasApplicants) {
        const IncludesCurrentUser = props.currentUser.SK in props.item.applicants;
        const ApplicantsLength = Object.keys(props.item.applicants).length;
        const multipleApplicants = ApplicantsLength > 1;
        if (IncludesCurrentUser && multipleApplicants) {
            return (<p className="pt-2">Keine Bewerber vorhanden</p>)
        } else if (IncludesCurrentUser && !multipleApplicants) {
            return (<p className="pt-2">jo{props.currentUser.name}</p>)
        } else if (IncludesCurrentUser && multipleApplicants) {
            return (<p className="pt-2">{props.currentUser.name}{" "}+{ApplicantsLength - 1}{" "}weitere</p>)
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