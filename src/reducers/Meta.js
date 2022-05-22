import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  stundenerfassung: false,
  fair: true,
  reverse: false,
  schichten: [],
  onboarding: {
    overview: false,
    shiftplan: false,
    team: false,
    settings: false,
  },
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
      state.vorname = action.payload.vorname || initialState.vorname;
    },
    addingNewPosition(state, action) {
      state.schichten = [...state.schichten, action.payload]
    },
    deletingPosition(state, action) {
      state.schichten = state.schichten.filter(position => position !== action.payload);
    },
    resettingMeta(state, action) {
      state = initialState;  
    },
    settingOnboardingOverview(state, action) {
      state.onboarding.overview = action.payload;
    },
    settingOnboardingShiftplan(state, action) {
      state.onboarding.shiftplan = action.payload;
    },
    resettingOnboarding(state) {
      state.onboarding.overview = true;
      state.onboarding.shiftplan = true;
      state.onboarding.settings = true;
      state.onboarding.team = true;
    }
  }
})

export const {
  settingMeta,
  addingNewPosition,
  deletingPosition,
  settingOnboardingOverview,
  settingOnboardingShiftplan,
  resettingMeta,
  resettingOnboarding
  } = MetaSlice.actions;

export default MetaSlice.reducer;