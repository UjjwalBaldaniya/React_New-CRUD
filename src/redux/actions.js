// actions.js
export const formField = (field) => ({
  type: "FORM_FIELD",
  payload: field,
});

export const editToggle = (value) => ({
  type: "EDIT_TOGGLE",
  payload: value,
});

export const editFormField = (value) => ({
  type: "EDIT_FORM_FIELD",
  payload: value,
});

export const deleteFormField = (value) => ({
  type: "DELETE_FORM_FIELD",
  payload: value,
});
