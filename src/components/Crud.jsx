import React, { useEffect, useState } from "react";
import {
  formField,
  searchField,
  tableHeading,
} from "../description/form.description";

const Crud = () => {
  const getLocalStorageData = () => {
    const data = JSON.parse(localStorage.getItem("tableData"));
    if (data) {
      return data;
    } else {
      return [];
    }
  };

  const [text, setText] = useState({
    email: "",
    password: "",
  });
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState(getLocalStorageData());
  const [editToggle, setEditToggle] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPageItem = 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editToggle) {
      setTableData([...tableData, text]);
      setEditToggle(false);
    } else {
      const clone = [...tableData];
      clone.splice(editIndex, 1, text);
      setTableData(clone);
      setEditToggle(false);
    }
    setText({
      email: "",
      password: "",
    });
  };

  const handleChange = (name, value) => {
    setText({ ...text, [name]: value });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (index) => {
    const filterData = tableData?.filter((_, i) => i === index);
    setText(...filterData);
    setEditIndex(index);
    setEditToggle(true);
  };

  const handleDelete = (index) => {
    const deletedData = tableData?.filter((_, i) => i !== index);
    setTableData(deletedData);
  };

  const disable = Object.values(text).some((value) => value === "");

  let totalNumberPages = [];

  for (let i = 0; i < tableData?.length / totalPageItem; i++) {
    totalNumberPages.push(i);
  }

  const endIndex = currentPage * totalPageItem; // 2 * 5 = 10
  const startIndex = endIndex - totalPageItem; // 10 - 5 = 5

  const currentPageData = tableData.slice(startIndex, endIndex); // 5, 10

  const handleUpdatePage = (index) => {
    setCurrentPage(index);
  };

  // const filteredData = currentPageData?.filter((element) =>
  //   element?.email?.toLowerCase()?.includes(search?.toLowerCase() || "")
  // );

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  return (
    <>
      <div>
        {searchField?.map((input, index) => {
          return (
            <div className="input-group mb-3" key={index}>
              <input
                {...input}
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            </div>
          );
        })}
        <form onSubmit={handleSubmit}>
          {formField.map((input, index) => {
            return (
              <div className="input-group mb-3" key={index}>
                <input
                  {...input}
                  value={text[input.name]}
                  onChange={(e) => handleChange(input.name, e.target.value)}
                />
              </div>
            );
          })}

          <button type="submit" disabled={disable} className="btn btn-success">
            Submit
          </button>
        </form>
      </div>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              {tableHeading?.map((value, index) => {
                return (
                  <th key={index} scope="col">
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((element, index) => {
              console.log("index", index);
              return (
                <tr key={index}>
                  <th scope="row">{startIndex + (index + 1)}</th>
                  <td>{element?.email}</td>
                  <td>{element?.password}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEdit(startIndex + index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(startIndex + index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          {totalNumberPages.map((number, index) => {
            return (
              <button onClick={() => handleUpdatePage(number + 1)} key={index}>
                {number + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Crud;
