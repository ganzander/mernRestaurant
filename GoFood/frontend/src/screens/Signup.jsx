import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

export default function Signup() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, location } = credentials;
    if (!name || !email || !password || !location) {
      alert("Please fill in the form completely");
    } else {
      axios
        .post("http://localhost:5000/createuser", {
          name,
          email,
          password,
          location,
        })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success("Successfully signed up");
            navigate("/login");
          } else {
            toast.error("You have already signed up.\nPlease login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setCredentials({
        name: "",
        email: "",
        password: "",
        location: "",
      });
    }
  }

  function onChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Navbar />
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="signupPanel">
                <div className="d-flex justify-content-center align-items-center m-3 mt-2">
                  <h1>Sign Up</h1>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group my-3 mt-3">
                    <label htmlFor="Name">Name</label>
                    <input
                      style={{ border: "3px solid #ecc00e" }}
                      type="text"
                      id="Name"
                      className="form-control"
                      placeholder="Enter your Name"
                      name="name"
                      value={credentials.name}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group my-3 mt-3">
                    <label htmlFor="email">Email</label>
                    <input
                      style={{ border: "3px solid #ecc00e" }}
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="Enter your Email"
                      name="email"
                      value={credentials.email}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group my-3 mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      style={{ border: "3px solid #ecc00e" }}
                      type={!passShow ? "password" : "text"}
                      placeholder="Enter your Password"
                      className="form-control"
                      name="password"
                      value={credentials.password}
                      onChange={onChange}
                      autoComplete="off"
                    />
                    <div
                      className="showPass"
                      onClick={() => setPassShow(!passShow)}
                    >
                      {!passShow ? "Show Password" : "Hide Password"}
                    </div>
                  </div>

                  <div className="form-group my-3 mt-3">
                    <label htmlFor="Location">Location</label>
                    <input
                      style={{ border: "3px solid #ecc00e" }}
                      type="text"
                      id="location"
                      className="form-control"
                      placeholder="Enter your Location"
                      name="location"
                      value={credentials.location}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="d-flex mt-4 justify-content-center align-items-center container">
                    <button
                      type="submit"
                      className="signupbtn btn btn-primary mx-3"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="d-flex mt-3 justify-content-center align-items-center container">
                    <p className="short-text text-center justify-content-center align-items-center">
                      Already have an account:{" "}
                      <Link to="/login" className="reg-link">
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
