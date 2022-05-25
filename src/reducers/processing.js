import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    algStatus: "idle",
    releaseStatus: "idle",
    publishStatus: "idle",
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
            state.algStatus = "fulfilled";
        },
        settingProcessingRejectedRelease(state) {
            state.releaseStatus = "fulfilled";
        },
        settingProcessingRejectedPublish(state) {
            state.publishStatus = "fulfilled"
        },
        resettingProcessing(state) {
            state.algStatus = "idle";
            state.releaseStatus = "idle";
            state.publishStatus = "idle";
        }
    }
})

export const {
    settingProcessingFulfilledAlg,
    settingProcessingFulfilledPublish,
    settingProcessingFulfilledRelease,
    settingProcessingRejectedAlg,
    settingProcessingRejectedPublish,
    settingProcessingRejectedRelease,
    settingProcessingStartAlg,
    settingProcessingStartPublish,
    settingProcessingStartRelease,
    resettingProcessing
} = ProcessingSlice.actions

export default ProcessingSlice.reducer;