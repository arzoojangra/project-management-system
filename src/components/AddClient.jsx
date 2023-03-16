import React, { useState } from "react";
import axios from "axios";

function AddClient(props) {
  const [clientData, setClientData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    setClientData({ ...clientData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(clientData);
    event.preventDefault();

    try {
      setIsSubmit(true);
      const response = await axios.post(
        "http://localhost:3006/clients",
        {
          Name: clientData.Name,
          Email: clientData.Email,
          Contact: clientData.Phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <div className="modal fade" id="addClient" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5" id="exampleModalLabel">
              Add Client
            </h3>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  onChange={(event) => handleChange(event)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="Email"
                  onChange={(event) => handleChange(event)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="Phone"
                  onChange={(event) => handleChange(event)}
                />
              </div>

              {isSubmit ? (
                <button type="submit" className="btn btn-primary">
                  Adding Client
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Add Client
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
