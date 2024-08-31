import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import { toast } from 'react-toastify';
export default function Adminlog() {
  const navigate = useNavigate();

  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [licence, setLicence] = useState('');
  const [disaster, setDisaster] = useState('');
  const [password, setPassword] = useState('');
  const [resrc, setSrc] = useState('');
  const [address, setAddr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        email,
        licence,
        disaster,
        password,
        resrc,
        address,
      });
  
      const token = response.data.token;  
      if (token) {
        localStorage.setItem("token", token);
        toast.success('Registration successful.');
        setShowModal(false);
        setTimeout(() => {
          navigate('/');
        }, 500); 
      } else {
        toast.error('Registration failed. No token received.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          toast.error('User already registered.');
        } else {
          toast.error('An error occurred.');
        }
      } else if (err.request) {
        toast.error('No response received from server.');
      } else {
        toast.error('Error during request setup.');
      }
    }
  };
  
  
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-dark py-1 fs-5"
        onClick={handleShowModal}
      >
        Registration
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
                User Registration
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
                <h4 className="mx-5">Register</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">
                      Agency Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">
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
                  <div className="mb-3 mt-3">
                    <label htmlFor="disaster" className="form-label">
                      Type of Disaster
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="disaster"
                      placeholder="Enter the type of disaster"
                      value={disaster}
                      onChange={(e) => setDisaster(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="licence" className="form-label">
                      Licence Id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="licence"
                      placeholder="Enter the licence id"
                      value={licence}
                      onChange={(e) => setLicence(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="licence" className="form-label">
                      Available Resources
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="resrc"
                      placeholder="Enter the resources"
                      value={resrc}
                      onChange={(e) => setSrc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter the Address"
                      value={address}
                      onChange={(e) => setAddr(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
