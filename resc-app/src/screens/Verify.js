import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Adminlog() {
  const [showModal, setShowModal] = useState(false);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  const fetchUnverifiedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/unverified-users");
      setUnverifiedUsers(response.data);
    } catch (error) {
      console.error("Error fetching unverified users:", error);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchUnverifiedUsers();
    }
  }, [showModal]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleVerifyUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:3001/admin/verify-user/${userId}`);
      // Remove the verified user from the list
      setUnverifiedUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error verifying user:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <>
      <button
        type="button"
        className="btn btn-dark py-1 fs-5"
        onClick={handleShowModal}
      >
        Show Unverified Users
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
                Unverified Users
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
                <h4 className="mx-5">Unverified Users List</h4>
                <ul className="list-group">
                  {unverifiedUsers.length === 0 ? (
                    <li className="list-group-item">No unverified users found.</li>
                  ) : (
                    unverifiedUsers.map(user => (
                      <li key={user._id} className="list-group-item">
                        <div><strong>Name:</strong> {user.name}</div>
                        <div><strong>License:</strong> {user.licence}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <button
                          className="btn btn-success mt-2"
                          onClick={() => handleVerifyUser(user._id)}
                        >
                          Verify
                        </button>
                      </li>
                    ))
                  )}
                </ul>
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
