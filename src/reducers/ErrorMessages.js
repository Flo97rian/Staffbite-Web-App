const errorMessagesReducer = (initialState = {
    InvalidReportInput: !1,
    MissingShiftDetails: !1,
}, action) => {
    switch (action.type) {
      case "setInvalidReportInput": 
        return {
          ...initialState,
          "InvalidReportInput": !0
        }
        case "resetInvalidReportInput": 
        return {
          ...initialState,
          "InvalidReportInput": !1
        }
        case "setMissingShiftDetails": 
        return {
          ...initialState,
          "MissingShiftDetails": !0
        }
        case "ResetMissingShiftDetails": 
        return {
          ...initialState,
          "MissingShiftDetails": !1
        }
      default:
        return initialState
    }
  };
  
  export default errorMessagesReducer;