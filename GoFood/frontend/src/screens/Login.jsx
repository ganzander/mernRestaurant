import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [loginViaOTP, setLoginViaOTP] = useState(false);
  const [loginViaPassword, setLoginViaPassword] = useState(true);
  const [enterOTP, setEnterOTP] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [authToken, setAuthToken] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    const { email, password } = loginCredentials;
    if (!email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      const toCheckLogin = {
        email: loginCredentials.email,
        password: loginCredentials.password,
      };

      axios
        .post("http://localhost:5000/loginuser", { email, password })
        .then((result) => {
          if (result.data.Success === true) {
            localStorage.setItem(
              "currentUser",
              JSON.stringify(result.data.user)
            );
            localStorage.setItem("Admin", result.data.user.isAdmin);
            console.log(result.data.user.isAdmin);
            if (result.data.user.isAdmin === true) {
              navigate("/");
            } else {
              navigate("/");
            }
            localStorage.setItem("authToken", result.data.AuthToken);
          } else {
            toast.error("Please Register First");
          }
        });

      setLoginCredentials({
        email: "",
        password: "",
      });
    }
  }

  function onChange(event) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function onOTPChange(event) {
    setOTP(event.target.value);
  }

  function sendOTP(event) {
    const { email } = loginCredentials;
    if (!email) {
      toast.error("Please fill in the email address");
    } else {
      axios
        .post("http://localhost:5000/user/sendotp", { email })
        .then((result) => {
          if (result.data.Success === true) {
            localStorage.setItem("OTP", result.data.otp);
            setCurrentUser(result.data.user);
            setAuthToken(result.data.AuthToken);
            setIsAdmin(result.data.user.isAdmin);
            setLoginViaPassword(false);
            setLoginViaOTP(false);
            setEnterOTP(true);
          } else {
            toast.error("You have not registered yet.\n Please Register First");
          }
        });
    }
  }

  function verifyOTP(event) {
    event.preventDefault();
    if (otp === localStorage.getItem("OTP")) {
      navigate("/");
      localStorage.setItem("Admin", isAdmin);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("authToken", JSON.stringify(authToken));
    } else {
      toast.error("wrong otp");
    }
  }

  if (loginViaPassword) {
    return (
      <>
        <Navbar />
        <section>
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="signupPanel">
                  <div className="d-flex justify-content-center align-items-center m-3 mt-2">
                    <h1>Login</h1>
                  </div>

                  <div className="form">
                    <form onSubmit={handlePasswordSubmit}>
                      <div className="form-group my-3 mt-3">
                        <label htmlFor="email">Email</label>
                        <input
                          placeholder="Enter your Email"
                          style={{ border: "3px solid #ecc00e" }}
                          type="email"
                          id="email"
                          className="form-control"
                          name="email"
                          value={loginCredentials.email}
                          onChange={onChange}
                          autoComplete="off"
                        />
                      </div>

                      <div className="form-group my-3 mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Enter your Password"
                          style={{ border: "3px solid #ecc00e" }}
                          className="form-control"
                          name="password"
                          value={loginCredentials.password}
                          onChange={onChange}
                          autoComplete="off"
                        />
                      </div>

                      <div
                        className="d-flex mt-4 justify-content-center align-items-center container link"
                        onClick={() => {
                          setLoginViaPassword(false);
                          setLoginViaOTP(true);
                        }}
                      >
                        <small
                          className="linkForgotPassword text-center justify-content-center"
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          Forgot Password
                        </small>
                      </div>

                      <div className="d-flex mt-4 justify-content-center align-items-center container">
                        <button
                          type="submit"
                          className="loginbtn btn btn-primary"
                        >
                          Login
                        </button>
                      </div>
                      <div className="d-flex mt-4 justify-content-center align-items-center container">
                        <p className="short-text text-center justify-content-center align-items-center">
                          Don't have an account?{" "}
                          <Link to="/createuser" className="reg-link">
                            Register
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (loginViaOTP) {
    return (
      <>
        <Navbar />
        <section>
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="logincard">
                  <div className="d-flex justify-content-center align-items-center m-3 mt-2">
                    <h1>Password Assistance</h1>
                  </div>
                  <div className="form">
                    <form>
                      <div className="form-group my-3 mt-3">
                        <label htmlFor="email">Email</label>
                        <input
                          style={{ border: "3px solid #ecc00e" }}
                          type="email"
                          id="email"
                          placeholder="Enter Your Email"
                          className="form-control"
                          name="email"
                          value={loginCredentials.email}
                          onChange={onChange}
                          autoComplete="off"
                        />
                      </div>
                      <div className="d-flex mt-4 justify-content-center align-items-center container">
                        <button
                          type="button"
                          onClick={sendOTP}
                          className="loginbtn btn btn-primary"
                        >
                          Send OTP
                        </button>
                      </div>
                      <div className="d-flex mt-4 justify-content-center align-items-center container">
                        <p className="short-text text-center justify-content-center align-items-center">
                          Don't have an account?{" "}
                          <Link to="/createuser" className="reg-link">
                            Register
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (enterOTP) {
    return (
      <>
        <Navbar />
        <section>
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="logincard">
                  <div className="d-flex justify-content-center align-items-center m-3 mt-2">
                    <h1>Verification Required</h1>
                  </div>
                  <form onSubmit={verifyOTP}>
                    <div className="form-group my-3 mt-3">
                      <label htmlFor="otp">OTP</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the OTP"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={onOTPChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="d-flex mt-4 justify-content-center align-items-center container">
                      <button
                        type="submit"
                        className="loginbtn btn btn-primary "
                      >
                        Verify OTP
                      </button>
                      <button
                        type="button"
                        onClick={sendOTP}
                        className="loginbtn btn btn-primary"
                      >
                        Resend OTP
                      </button>
                    </div>
                    <div className="d-flex mt-4 justify-content-center align-items-center container">
                      <p className="short-text text-center justify-content-center align-items-center">
                        Don't have an account?{" "}
                        <Link to="/createuser" className="reg-link">
                          Register
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
}
