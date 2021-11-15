
exports.mergeReviewShiftplan = (shiftsOrderedByDay, copyShiftPlan) => {
    for (const [weekDay, singleShift] of Object.entries(shiftsOrderedByDay)) {
        for (const [shift, details] of Object.entries(singleShift)) {
            let index = getIndexFromShift(shift);
            copyShiftPlan[index][weekDay] = details;
    }}
    return copyShiftPlan;
}

function getIndexFromShift(shift) {
    let index = shift.split("#")[0];
    return index;
}