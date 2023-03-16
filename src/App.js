import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import { Routes, Route } from "react-router-dom";
import ClientDetails from "./pages/ClientDetails";

function App(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="clients/:id" element={<ClientDetails />} />
      </Routes>
      {/* <h1>ashfjsdjkfadg</h1> */}
    </div>
  );
}

export default App;
