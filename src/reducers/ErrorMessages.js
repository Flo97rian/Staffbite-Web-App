const errorMessagesReducer = (initialState = {
    InvalidReportInput: !1,
    MissingShiftDetails: !1,
    EmailNotSend: !1,
    EmailIsSend: !1
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
        case "setEmailNotSend": 
        return {
          ...initialState,
          "EmailNotSend": !0
        }
        case "ResetEmailNotSend": 
        return {
          ...initialState,
          "EmailNotSend": !1
        }
        case "setEmailIsSend": 
        return {
          ...initialState,
          "EmailIsSend": !0
        }
        case "ResetEmailIsSend": 
        return {
          ...initialState,
          "EmailIsSend": !1
        }
      default:
        return initialState
    }
  };
  
  export default errorMessagesReducer;