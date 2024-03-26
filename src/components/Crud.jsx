import React, { useState } from "react";

const Crud = () => {
  const [text, setText] = useState({
    email: "",
    password: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editToggle, setEditToggle] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editToggle) {
      setTableData([...tableData, text]);
      setText({
        email: "",
        password: "",
      });
      setEditToggle(false);
    } else {
      const clone = [...tableData];
      clone.splice(editIndex, 1, text);
      setTableData(clone);
      setEditToggle(false);
      setText({
        email: "",
        password: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const handleEdit = (index) => {
    const filterData = tableData?.filter((el, i) => i === index);
    setText(...filterData);
    setEditIndex(index);
    setEditToggle(true);
  };

  const handleDelete = (index) => {
    const deletedData = tableData?.filter((el, i) => i !== index);
    setTableData(deletedData);
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
          <button type="submit">Submit</button>
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
                <tr>
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

export default Crud;
