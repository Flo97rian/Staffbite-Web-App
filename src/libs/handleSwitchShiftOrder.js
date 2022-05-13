export const handleSwitchShiftOrder = (shiftplan) => {
        let switchedShiftOrder = deleteIdsFromDnD(shiftplan)
        return switchedShiftOrder
}

const deleteIdsFromDnD = (shiftplan) => {
    shiftplan.forEach( shift => {
        if (Object.keys(shift).includes("id")) {
        delete shift.id
        }
    })
    return shiftplan
}