import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./navbar.css";

function Navbar(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userProfile = JSON.parse(localStorage.getItem("currentUser"));

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("OTP");
    localStorage.removeItem("Admin");
    localStorage.removeItem("CartItems");
    localStorage.removeItem("currentUser");
  }
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid ">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
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
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <ul>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </ul>
            </div>
          ) : (
            <div className="d-flex">
              <div className="profile-section">
                <Link className="btn bg-white text-danger mx-2" to="/cart">
                  Cart{" "}
                  <Badge pill bg="danger">
                    {props.length}
                  </Badge>
                </Link>

                <div className="dropdown">
                  <button className="dropdown-button" onClick={toggleDropdown}>
                    <div className="profile-info">
                      <img src={userProfile.imgUrl} alt={userProfile.name} />
                      <span>{userProfile.name}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="dropdown-content">
                      <Link to="/profile">My Profile</Link>
                      {localStorage.getItem("Admin") === "true" ? (
                        <Link to="/admin">Admin</Link>
                      ) : (
                        ""
                      )}
                      <Link to="/myorder">My Orders</Link>

                      <Link to="/login" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
