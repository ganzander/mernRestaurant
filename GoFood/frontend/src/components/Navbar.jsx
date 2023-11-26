import React, { Suspense, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Pizza from "../models/Pizza";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./navbar.css";
import { gsap } from "gsap";

function Navbar(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

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

  function scrolling() {
    console.log(window.scrollY);
    if (window.scrollY >= 350) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }
  window.addEventListener("scroll", scrolling);

  var pageload = gsap.timeline();
  useEffect(() => {
    pageload.to(".custom-navbar", {
      y: 0,
      duration: 0.5,
    });

    pageload.to(".logo-model", {
      x: -100,
      duration: 0.3,
      ease: "expo.out",
      delay: -1.2,
    });
    pageload.to(".logo-name", {
      x: -100,
      duration: 1.8,
      ease: "bounce.out",
      opacity: 1,
    });
    pageload.to(".logo-model", {
      x: -120,
      duration: 0.5,
    });
  }, []);
  return (
    <nav
      className={
        "navbar custom-navbar navbar-expand-lg navbar-dark m-10 " +
        (sticky ? "sticky" : "")
      }
      style={{ backgroundColor: "#ea5200" }}
    >
      <div className="container-fluid ">
        <div className="nav-left d-flex flex-row align-items-center">
          <div className="logo-model ">
            <Canvas>
              <Stage environment="city" intensity={0.7}>
                <Pizza />
              </Stage>
              <OrbitControls
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={3}
              />
            </Canvas>
          </div>
          <Link
            className="navbar-brand fs-1 fst-italic font-weight-bold logo-name"
            to="/"
          >
            Savor Haven
          </Link>
        </div>

        <div className="nav-right collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2"></ul>
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
                <Link className="btn bg-white text-danger mx-5" to="/cart">
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
