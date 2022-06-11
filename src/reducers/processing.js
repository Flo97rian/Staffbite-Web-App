import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    algStatus: "idle",
    releaseStatus: "idle",
    publishStatus: "idle",
    sendReminderForApplication: 'idle',
}

const ProcessingSlice = createSlice({
    name: "Progessing",
    initialState,
    reducers: {
        settingProcessingStartAlg(state) {
            state.algStatus = "loading";
        },
        settingProcessingStartRelease(state) {
            state.releaseStatus = "loading";
        },
        settingProcessingStartPublish(state) {
            state.publishStatus = "loading"
        },
        settingProcessingFulfilledAlg(state) {
            state.algStatus = "fulfilled";
        },
        settingProcessingFulfilledRelease(state) {
            state.releaseStatus = "fulfilled";
        },
        settingProcessingFulfilledPublish(state) {
            state.publishStatus = "fulfilled"
        },
        settingProcessingRejectedAlg(state) {
            state.algStatus = "rejected";
        },
        settingProcessingRejectedRelease(state) {
            state.releaseStatus = "rejected";
        },
        settingProcessingRejectedPublish(state) {
            state.publishStatus = "rejected";
        },
        settingProcessingStartSendReminderForApplication(state) {
            state.sendReminderForApplication = "loading";
        },
        settingProcessingFulfilledSendReminderForApplication(state) {
            state.sendReminderForApplication = "fulfilled";
        },
        settingProcessingRejectedSendReminderForApplication(state) {
            state.sendReminderForApplication = "rejected";
        },
        resettingProcessing(state) {
            state.algStatus = "idle";
            state.releaseStatus = "idle";
            state.publishStatus = "idle";
            state.sendReminderForApplication = 'idle';
        }
    }
})

export const {
    settingProcessingFulfilledSendReminderForApplication,
    settingProcessingFulfilledAlg,
    settingProcessingFulfilledPublish,
    settingProcessingFulfilledRelease,
    settingProcessingRejectedSendReminderForApplication,
    settingProcessingRejectedAlg,
    settingProcessingRejectedPublish,
    settingProcessingRejectedRelease,
    settingProcessingStartSendReminderForApplication,
    settingProcessingStartAlg,
    settingProcessingStartPublish,
    settingProcessingStartRelease,
    resettingProcessing
} = ProcessingSlice.actions

export default ProcessingSlice.reducer;