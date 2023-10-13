import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Adminlog from "../screens/Adminlog";
import Agencylog from "../screens/Agencylog";
import Register from "../screens/Register";
import Pappl from "./Pappl";
import '../App.css';
export default function Navbar() {
  const location = useLocation();
  const renderPendingApplicationsLink = location.pathname === '/dash1';
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" style={{fontFamily:"revert"}} href="/">
          <img className="bi me-2" style={{width:"40px",height:"32px"}} src='../logo132.png' />
            Rescue
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mx-3 mt-1">
                <a className="nav-link active fs-6" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link">
                  <Register/>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link">
                  <Adminlog/>
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link">
                  <Agencylog/>
                </a>
              </li>
              {renderPendingApplicationsLink && (
                <li className="nav-item mx-3 mt-1">
                  <Link className="nav-link">
                    <Pappl/>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
