// actions.js
export const formField = (field) => ({
  type: "FORM_FIELD",
  payload: field,
});

export const decrement = () => ({
  type: "DECREMENT",
});
