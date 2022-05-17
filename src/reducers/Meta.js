import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  stundenerfassung: false,
  fair: true,
  reverse: false,
  schichten: [],
  onboarding: {},
  newsfeed: [],
  vorname: "",
  tenantCategorie: {},
  accessPosition: {},
}

const MetaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    settingMeta(state, action) {
      state.name = action.payload.name ? action.payload.name : initialState.name;
      state.stundenerfassung = action.payload.stundenerfassung ? action.payload.stundenerfassung :  initialState.stundenerfassung;
      state.fair = action.payload.fair ? action.payload.fair :  initialState.fair;
      state.reverse = action.payload.reverse ? action.payload.reverse :  initialState.reverse;
      state.schichten = action.payload.schichten ? action.payload.schichten :  initialState.schichten;
      state.onboarding = action.payload.onboarding ? action.payload.onboarding :  initialState.onboarding;
      state.newsfeed = action.payload.newsfeed ? action.payload.newsfeed :  initialState.newsfeed;
      state.tenantCategorie = action.payload.tenantCategorie ? action.payload.tenantCategorie :  initialState.tenantCategorie;
      state.accessPosition = action.payload.accessPosition ? action.payload.accessPosition :  initialState.accessPosition;
    },
    resettingMeta(state, action) {
      state = initialState;  
    }
  }
})

export const {
  settingMeta,
  resettingMeta
  } = MetaSlice.actions;

export default MetaSlice.reducer;