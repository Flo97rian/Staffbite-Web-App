const singleStateReducer = (state = !1, action) => {
    switch (action.type) {
      case "SINGLE": 
        return {
          ...state,
         [action.name]: action.payload
        }
      default:
        return state
    }
  };
  
  export default singleStateReducer;