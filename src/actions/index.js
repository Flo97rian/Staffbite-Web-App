const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";


export function openModal(modalkey) {
        let payload = {
                modalkey
        }
        return {
        type: OPEN_MODAL,
        describe: "Opens a modal",
        payload
        }
}

export function closeModal(modalkey) {
        let payload = {
                modalkey
        }
        return {
        type: CLOSE_MODAL,
        describe: "Closes a modal",
        payload
        }
}

export const getPlansFromDB = {
        type: "All/GetPlansFromDB",
        describe: "Get shiftplans from DynamoDB"
}

