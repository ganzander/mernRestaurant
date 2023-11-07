import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Signup.css";

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
    <section>
      <div className="signupcard">
        <h1>Sign Up</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span>
              <input
                type="text"
                className="input-cll"
                placeholder="Name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                autoComplete="off"
              />
              <i className="fa-solid fa-envelope icon" />
            </span>

            <span>
              <input
                type="email"
                className="input-cll"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="off"
              />
              <i className="fa-solid fa-envelope icon" />
            </span>
            <div className="short-text">
              We'll never share your email with anyone else.
            </div>

            <span>
              <input
                type={!passShow ? "password" : "text"}
                placeholder="Password"
                className="input-cll"
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="off"
              />
            </span>
            <div className="showPass" onClick={() => setPassShow(!passShow)}>
              {!passShow ? "Show Password" : "Hide Password"}
            </div>

            <span>
              <input
                type="text"
                className="input-cll"
                placeholder="Location"
                name="location"
                value={credentials.location}
                onChange={onChange}
                autoComplete="off"
              />
              <i className="fa-solid fa-envelope icon" />
            </span>

            <button type="submit" className="signupbtn">
              Submit
            </button>
            <p className="short-text">
              Already have an account:{" "}
              <Link to="/login" className="reg-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
