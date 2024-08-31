import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function Adminlog() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Function to handle form submission
  const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log("ref") ;
            const URL='http://localhost:3001/login'
            const response = await axios.post(URL,{
                email,password
            });
            console.log(response) ;
            const token=response.data.token;

            if(response.data.user.isAdmin===true){
              setShowModal(false);
              if(token){
                  localStorage.setItem('token',token);
              }
              navigate('/dash1');
            }
            else{
              setShowModal(false);
              navigate('/')
            }
            // Navigate to the dashboard or any other page
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred during login. Please try again.');
            }
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
        className="btn btn-dark py-1"
        onClick={handleShowModal}
      >
        Admin login
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
                <h4 className="mx-5">Admin login</h4>
                <form onSubmit={handleLogin}>
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
