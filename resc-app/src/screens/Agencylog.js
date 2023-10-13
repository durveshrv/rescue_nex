import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Adminlog() {
  const navigate = useNavigate();

  // State variables for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Perform admin login logic here, for example, check credentials
    if (email === 'agency@example.com' && password === 'password') {
      // If login is successful, navigate to Dash1
      navigate('./dash2', { state: { alert: 'Login successful!' } });
    } else {
      // Handle login failure (e.g., display an error message)
      alert('Invalid credentials. Please try again.');
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [preventShow, setPreventShow] = useState(false);

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");

    modalElement.addEventListener("hide.bs.modal", function (event) {
      if (preventShow) {
        event.preventDefault();
        setPreventShow(false);
      }
    });
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPreventShow(true);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-dark py-1 fs-5"
        onClick={handleShowModal}
      >
        Agency login
      </button>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-dark">
                <h4 className="mx-5">Agency login</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}