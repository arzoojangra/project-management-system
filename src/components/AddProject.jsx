import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { RiAddCircleLine } from "react-icons/ri";
import axios from "axios";

function AddProject(props) {
  const [projectData, setProjectData] = useState({});

  const [clients, setClients] = useState([]);

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    fetchClientApi();
  }, []);

  const fetchClientApi = async () => {
    try {
      const response = await axios.get("http://localhost:3006/clients", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setClients(response.data);
        // console.log(response.data);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setProjectData({ ...projectData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    // console.log(projectData);
    event.preventDefault();

    try {
      setIsSubmit(true);
      const response = await axios.post(
        "http://localhost:3006/projects",
        {
          Name: projectData.name,
          Description: projectData.description,
          Status: projectData.status,
          ClientID: projectData.client,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);

      if (response.status === 200) {
        setIsSubmit(false);
        window.location = "/";
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="addProject" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5">Add New Project</h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="mb-2">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(event) => handleChange(event)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Project Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={(event) => handleChange(event)}
                />
              </div>

              <div className="mb-2 position-relative">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  onChange={(event) => handleChange(event)}
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
                  onChange={(event) => handleChange(event)}
                >
                  <option>Select Client</option>
                  {/* {clients.length > 0 && */}
                  {clients?.map((client) => (
                    <option value={client.ID} key={client.ID}>
                      {client.Name}
                    </option>
                  ))}
                </select>
                <AiFillCaretDown className="select-caret" />
              </div>

              {isSubmit ? (
                <button type="submit" className="btn btn-success">
                  Adding Project
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  <RiAddCircleLine className="icons" />
                  Add Project
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
