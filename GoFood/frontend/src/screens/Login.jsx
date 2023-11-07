import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Login.css";

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
      <section>
        <div className="logincard">
          <h1>Login</h1>
          <div className="form">
            <form onSubmit={handlePasswordSubmit}>
              <span>
                <input
                  placeholder="Email"
                  type="email"
                  className="input-cll"
                  name="email"
                  value={loginCredentials.email}
                  onChange={onChange}
                  autoComplete="off"
                />
                <i className="fa-solid fa-envelope icon" />
              </span>
              <br />
              <span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input-cll"
                  name="password"
                  value={loginCredentials.password}
                  onChange={onChange}
                  autoComplete="off"
                />
                <i className="fa-solid fa-envelope icon" />
              </span>

              <div>
                <div
                  className="link"
                  onClick={() => {
                    setLoginViaPassword(false);
                    setLoginViaOTP(true);
                  }}
                >
                  <small className="linkForgotPassword">Forgot Password</small>
                </div>
              </div>
              <button type="submit" className="loginbtn">
                Login
              </button>
              <p className="short-text">
                Don't have an account?{" "}
                <Link to="/createuser" className="reg-link">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  } else if (loginViaOTP) {
    return (
      <section>
        <div className="logincard">
          <h1>Password Assistance</h1>
          <div className="form">
            <form>
              <span>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="input-cll"
                  name="email"
                  value={loginCredentials.email}
                  onChange={onChange}
                  autoComplete="off"
                />
                <i className="fa-solid fa-lock icon" />
              </span>
              <button type="button" onClick={sendOTP} className="loginbtn">
                Send OTP
              </button>
              <p className="short-text">
                Don't have an account?{" "}
                <Link to="/createuser" className="reg-link">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  } else if (enterOTP) {
    return (
      <section>
        <div className="logincard">
          <h1>Verification Required</h1>
          <form onSubmit={verifyOTP}>
            <span>
              <input
                type="text"
                className="input-cll"
                placeholder="Enter the OTP"
                name="otp"
                value={otp}
                onChange={onOTPChange}
                autoComplete="off"
              />
              <i className="fa-solid fa-envelope icon" />
            </span>
            <button type="submit" className="loginbtn">
              Verify OTP
            </button>
            <button type="button" onClick={sendOTP} className="loginbtn">
              Resend OTP
            </button>
            <p className="short-text">
              Don't have an account?{" "}
              <Link to="/createuser" className="reg-link">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    );
  }
}
