import React from "react";
import AddClient from "./AddClient";
import AddProject from "./AddProject";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="bg-body-secondary py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between">
              <div className="logo fw-bold fs-4 fd-0">
                <img
                  src="../favicon.jpg"
                  alt="Logo"
                  width={45}
                  height={45}
                  className="d-inline-block align-text-centre mx-2"
                />
                <Link to="/" className="text-pink">
                  Project Management
                </Link>
              </div>
              <div className="menu-bar">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addClient"
                >
                  <BsFillPersonFill className="icons" />
                  Add Client
                </button>
                <button
                  type="button"
                  className="btn btn-success ms-3"
                  data-bs-toggle="modal"
                  data-bs-target="#addProject"
                >
                  <AiOutlineFundProjectionScreen className="icons" />
                  New Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddClient />
      <AddProject />
    </nav>
  );
}

export default Header;
