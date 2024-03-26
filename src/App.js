import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Crud from "./components/Crud";
import CrudRedux from "./components/CrudRedux";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Crud />} />
          <Route path="/crud-redux" element={<CrudRedux />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
