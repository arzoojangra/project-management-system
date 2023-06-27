import React, { useEffect, useState } from "react";
import { IoIosContact } from "react-icons/io";
import { MdEmail, MdOutlineUpdate } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function ProjectDetails(props) {
  const [project, setProject] = useState([]);
  const [client, setClient] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [fetchedProjData, setFetchedProjData] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [newClient, setNewClient] = useState(null);

  let [color, setColor] = useState("black");

  setColor = (status) => {
    if (status == "Not Started") color = "blue";
    else if (status == "Started") color = "crimson";
    else if (status == "Pending") color = "orangered";
    else if (status == "In progress") color = "orange";
    else if (status == "Completed") color = "lime";
    return color;
  };

  useEffect(() => {
    fetchProjectApi();
    fetchClientApi();
    if (fetchedProjData) {
      fetchParticularClientApi(project.ClientID);
    }
  }, [fetchedProjData]);

  useEffect(() => {
    if (project) {
      setProjectName(project?.Name);
      setDescription(project?.Description);
      setStatus(project?.Status);
      // setClient(project?.attributes?.clients?.data[0]?.id);
    }
  }, [project]);

  const fetchClientApi = async () => {
    try {
      const response = await axios.get("http://localhost:3006/clients", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // console.log("clients----", response.data);
        setClients(response.data);
        setFetchedProjData(true);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParticularClientApi = async (clientID) => {
    try {
      const response = await axios.get(
        `http://localhost:3006/clients/${clientID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // console.log("particular client----", response.data[0]);
        setClient(response.data[0]);
        // console.log(client.length);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjectApi = async () => {
    try {
      const response = await axios.get(`http://localhost:3006/projects/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // console.log("project---", response.data[0]);
        setProject(response.data[0]);
        setLoading(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3006/delete/project/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("delete-------", response);
      if (response.status === 200) {
        window.location = "/";
        setLoading(false);
      } else alert("Something went wrong!!!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProject();
  };

  const updateProject = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:3006/update/projects/" + id,
        {
          Name: projectName,
          Description: description,
          Status: status,
          ClientID: newClient,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setLoading(false);
        window.location = "/";
      } else alert("Something went wrong!!!");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container border border-dark-subtle rounded my-4 p-3">
      <div className="row">
        <div className="col-md-12 p-4">
          <Link to="/">
            <button type="submit" className="btn btn-light float-end col-2">
              <RiArrowGoBackLine className="icons" /> Back
            </button>
          </Link>

          <h3 className="menu-title fs-1 mt-5 fw-bold">{project.Name}</h3>
          <div className="menu-text fs-5 fw-0 mb-3">{project.Description}</div>
          <h6 className="menu-text fs-6 mb-1 fw-bold">Project Status</h6>
          <div
            className="menu-text fs-6 mt-0"
            style={{
              color: setColor(project.Status),
            }}
          >
            {project.Status}
          </div>

          <hr />

          <h3 className="menu-title fs-3 mt-5 fw-bold">Client Information</h3>

          {client ? (
            <ul className="list-group ">
              <li className="list-group-item">
                <IoIosContact className="icons" />
                <span>{client.Name}</span>
              </li>
              <li className="list-group-item">
                <MdEmail className="icons" />
                <span>{client.Email}</span>
              </li>
              <li className="list-group-item">
                <HiPhone className="icons" />
                {client.Contact}
              </li>
            </ul>
          ) : (
            <div className="mt-5">
              <h6>No Client Found. Please add or update client!!</h6>
            </div>
          )}

          <hr />

          {/* Updating project */}
          <h3 className="menu-title fs-3 mt-5 fw-bold">
            Update Project Details
          </h3>

          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-2">
              <label className="form-label mt-2">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setProjectName(event.target.value)}
                name="name"
                value={`${projectName}`}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Project Description</label>
              <textarea
                className="form-control"
                onChange={(event) => setDescription(event.target.value)}
                name="description"
                value={`${description}`}
              />
            </div>

            <div className="mb-2 position-relative">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                onChange={(event) => setStatus(event.target.value)}
                name="status"
                value={`${status}`}
              >
                <option>Select Status</option>
                <option>Not Started</option>
                <option>Started</option>
                <option>Pending</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
              <AiFillCaretDown className="select-caret" />
            </div>

            <div className="mb-4 position-relative">
              <label className="form-label">Client</label>
              <select
                className="form-control"
                name="client"
                onChange={(event) => setNewClient(event.target.value)}
              >
                <option>Select Client</option>
                {clients.length > 0 &&
                  clients?.map((client) => (
                    <option value={client.ID} key={client.ID}>
                      {client.Name}
                    </option>
                  ))}
              </select>

              <AiFillCaretDown className="select-caret" />
            </div>

            <button type="submit" className="btn btn-secondary my-3">
              <MdOutlineUpdate className="icons" /> Update
            </button>

            <br />

            <button
              type="submit"
              className="btn btn-danger float-end"
              onClick={() => handleDeleteProject()}
            >
              <AiOutlineDelete className="icons" />
              Delete Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
