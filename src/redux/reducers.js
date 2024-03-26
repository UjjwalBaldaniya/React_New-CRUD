const initialState = {
  tableData: [],
  editToggle: false,
};

const rootReducer = (state = initialState, action) => {
  // console.log("action", action?.payload);
  const { type, payload } = action;
  switch (type) {
    case "FORM_FIELD":
      return {
        ...state,
        tableData: [...state.tableData, payload],
      };
    case "EDIT_TOGGLE":
      return {
        ...state,
        editToggle: payload,
      };
    case "EDIT_FORM_FIELD":
      const clone = state.tableData;
      clone.splice(payload?.index, 1, payload?.text);
      return {
        ...state,
        tableData: clone,
      };
    case "DELETE_FORM_FIELD":
      const deletedValue = state?.tableData?.filter((_, i) => payload !== i);
      return {
        ...state,
        tableData: deletedValue,
      };
    default:
      return state;
  }
};

export default rootReducer;
