import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formField } from "../redux/actions";

const CrudRedux = () => {
  const [text, setText] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.tableData);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(formField(text));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  console.log("selector", selector);

  return (
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
  );
};

export default CrudRedux;
