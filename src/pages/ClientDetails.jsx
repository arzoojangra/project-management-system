import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { AiOutlineDelete } from "react-icons/ai";

function ClientDetails(props) {
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchClientApi();
  }, []);

  useEffect(() => {
    if (client) {
      setClientName(client?.Name);
      setEmail(client?.Email);
      setPhone(client?.Contact);
    }
  }, [client]);

  const fetchClientApi = async () => {
    try {
      const response = await axios.get(`http://localhost:3006/clients/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data[0]);

      if (response.status === 200) {
        setClient(response.data[0]);
        setLoading(false);
      } else {
        alert("Something went wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateClient();
  };

  const updateClient = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3006/update/clients/${id}`,
        {
          Name: clientName,
          Email: email,
          Contact: phone,
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

  const handleDeleteClient = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3006/delete/client/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        window.location = "/";
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
    <div className="container border border-dark-subtle rounded my-4 p-3">
      <div className="row">
        <div className="col-md-12 p-4">
          <Link to="/">
            <button type="submit" className="btn btn-light float-end col-2 ">
              Back
            </button>
          </Link>

          <h3 className="menu-title fs-3 mt-5 fw-bold">
            Update Client Details
          </h3>

          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-2">
              <label className="form-label mt-2">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setClientName(event.target.value)}
                name="Name"
                value={`${clientName}`}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
                name="Email"
                value={`${email}`}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                onChange={(event) => setPhone(event.target.value)}
                name="Contact"
                value={`${phone}`}
              />
            </div>

            <button type="submit" className="btn btn-secondary my-3">
              Update
            </button>

            <br />

            <button
              type="submit"
              className="btn btn-danger float-end"
              onClick={() => handleDeleteClient()}
            >
              <AiOutlineDelete className="icons" />
              Delete Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
