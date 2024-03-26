import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFormField,
  editFormField,
  editToggle,
  formField,
} from "../redux/actions";

const CrudRedux = () => {
  const [text, setText] = useState({
    email: "",
    password: "",
  });
  const [index, setIndex] = useState("");

  const disable = Object.values(text).some((value) => value === "");

  const dispatch = useDispatch();
  const tableData = useSelector((state) => state?.tableData);
  const getEditToggle = useSelector((state) => state?.editToggle);

  console.log(getEditToggle);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!getEditToggle) {
      dispatch(formField(text));
      dispatch(editToggle(false));
    } else {
      dispatch(editFormField({ text, index }));
      dispatch(editToggle(false));
    }

    setText({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const handleEdit = (index) => {
    const editTextValue = tableData[index];
    setText({ ...editTextValue });
    dispatch(editToggle(true));
    setIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteFormField(index));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={text.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="password"
            placeholder="Password"
            value={text.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={disable}>
            Submit
          </button>
        </form>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Email :-</th>
              <th scope="col">Password</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((element, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{element?.email}</td>
                  <td>{element?.password}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CrudRedux;
