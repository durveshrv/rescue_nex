import React,{useContext,useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import Adminlog from "../screens/Adminlog";
import Agencylog from "../screens/Agencylog";
import Register from "../screens/Register";
import Verify from "../screens/Verify";
import { AuthContext } from "../Store/Context";
import '../App.css';
export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { verifiedbtn} =useContext(AuthContext);
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
              {!user && (
                <>
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
              </>
              )}
              {verifiedbtn && (
              <li className="nav-item ml-auto">
                  <Link className="nav-link">
                    <Verify/>
                  </Link>
              </li>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/me">
                    Hi {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users/logout">
                    LogOut
                  </Link>
                </li>
              </React.Fragment>
            )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
