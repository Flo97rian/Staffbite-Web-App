const modalReducer = (state = !1, action) => {
  switch (action.type) {
    case "OPEN": 
      return {
        ...state,
        [action.payload]: !0
      }
    case "CLOSE":
      return !1
    default:
      return state
  }
};

export default modalReducer;