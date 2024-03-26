// reducers.js
const initialState = {
  tableData: [],
};

const rootReducer = (state = initialState, action) => {
  console.log("action", action?.payload);
  const { type, payload } = action;
  switch (type) {
    case "FORM_FIELD":
      return {
        ...state,
        tableData: [...state.tableData, payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
