import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function Home(props) {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [deleteClient, setDeleteClient] = useState(false);
  const [loading, setLoading] = useState(true);

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
    fetchClientApi();
    fetchProjectApi();
  }, [deleteClient]);

  const fetchClientApi = async () => {
    try {
      const response = await axios.get("http://localhost:3006/clients", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // console.log(response.data[0]);
        setClients(response.data);
        setLoading(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjectApi = async () => {
    try {
      const response = await axios.get("http://localhost:3006/projects", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setProjects(response.data);
        setLoading(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      setDeleteClient(true);
      const response = await axios.put(
        `http://localhost:3006/delete/client/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // window.location = "/";
        setDeleteClient(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="py-4">
      <div className="container">
        <div className="row">
          {/* Project Lists */}
          {/* {projects.length > 0 && */}
          {projects?.map((project) => (
            <div className="col-md-6 my-3" key={project.ProjID}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold">{project.Name}</h5>
                    <Link to={`/projects/${project.ProjID}`}>
                      <button className="btn btn-light">View</button>
                    </Link>
                  </div>
                  <p className="fs-6 mt-2 mb-0">{project.Description}</p>
                  <p className="fs-6 mt-2 mb-0">
                    Status:
                    <b
                      style={{
                        color: setColor(project.Status),
                      }}
                    >
                      {project.Status}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <hr className="mt-4" />

          {/*Client List*/}

          <div className="col-md-12">
            <table className="table my-5">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {/* {clients.length > 0 && */}
                {clients?.map((client) => (
                  <tr key={client.ID}>
                    <td>{client.Name}</td>
                    <td>{client.Email}</td>
                    <td>{client.Contact}</td>

                    <td scope="row">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClient(client.ID)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                    <th scope="row">
                      <Link to={`/clients/${client.ID}`}>
                        <button className="btn btn-success">
                          <BiEditAlt />
                        </button>
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
