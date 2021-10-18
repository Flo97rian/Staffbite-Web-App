

const ShiftSlotReducer = (state = !1, action) => {
    switch (action.type) {
      case "setShiftSlot": 
        return {
          ...state,
          row: action.payload.row,
          col: action.payload.col,
          prio: action.payload.prio
        }
        case "ResetShiftSlot": 
        return (!1)
        case "setApplicantSlot": 
        return {
          ...state,
          row: action.payload.row,
          col: action.payload.col,
        }
      default:
        return state
    }
  };
  
  export default ShiftSlotReducer;