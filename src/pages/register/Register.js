import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastMessage } from "../../helpers";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      confirmPassword.setCustomValidity("password not match!");
    } else {
      const user = {
        username,
        email,
        password,
      };

      try {
        await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/api/auth/register",
          user
        );
        navigate("/login");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toastMessage("success", "account successfully created!!");
      } catch (error) {
        console.log(error);
        toastMessage("error", error.response.data.error);
      }
    }
  };

  return (
    <div className="container">
      <div className="login p-2">
        <div className="row">
          <div className="col col-12">
            <h1
              style={{ color: "var(--color-footer)" }}
              className="text-center fw-bold mb-4"
            >
              Sign up
            </h1>
          </div>
          <div className="col">
            <form className="loginBox">
              <input
                placeholder="Username"
                className="loginInput"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                placeholder="Email"
                value={email}
                type="email"
                className="loginInput"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="Password"
                type="password"
                className="loginInput"
                minLength="6"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                placeholder="Confirm Password"
                type="password"
                required
                className="loginInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="loginButton btn btn-primary"
                type="submit"
                onClick={handleClick}
              >
                Signup
              </button>
              <Link to="/login">
                <button className="loginButton btn btn-outline-success">
                  Login into Account
                </button>
              </Link>
              <Link to="/">
                <button className="loginButton btn btn-light">Back</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
