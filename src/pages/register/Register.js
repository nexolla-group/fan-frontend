import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastMessage } from "../../helpers";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      setError("Email is not valid");
    } else {
      setError(null);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !telephone ||
      !firstname ||
      !lastname ||
      !gender
    ) {
      toastMessage("error", "All fields are required.");
      setIsLoading(false);
      return;
    }
    if (telephone.length !== 10) {
      toastMessage("error", "Telephone number must be 10 characters long.");
      setIsLoading(false);
      return;
    }
    if (confirmPassword !== password) {
      toastMessage("error", "Password and Confirm Password must match.");
      setIsLoading(false);
      return;
    } else {
      const user = {
        fullName: `${firstname} ${lastname}`,
        username,
        email,
        telephoneNumber: telephone,
        gender,
        password,
      };

      try {
        const res = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/api/auth/register",
          user
        );
        navigate("/login");
        setTelephone("");
        setFirstname("");
        setLastname("");
        setGender("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toastMessage("success", "Account created successfully.");
        setIsLoading(false);
        console.log("register res:", res);
      } catch (error) {
        console.log(error);
        toastMessage("error", error.response.data.error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <section className="h-100" style={{ overflowY: "hidden" }}>
        <div className="container py-1 h-100">
          <div className="row d-flex justify-content-center align-items-center h-80 ">
            <div className="col">
              <div className="card card-registration w-100 ">
                <div className="row g-0 ">
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3
                        className="mb-5 text-uppercase"
                        style={{ color: "var(--color-footer)" }}
                      >
                        Create your Account
                      </h3>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <TextField
                            label="Enter your firstname"
                            fullWidth
                            required
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <TextField
                            label="Enter your lastname"
                            fullWidth
                            required
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-outline mb-4">
                          <TextField
                            label="Enter your email"
                            fullWidth
                            required
                            className="form-control form-control-lg"
                            type="email"
                            value={email}
                            error={error}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              validateEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline mb-4">
                          <TextField
                            label="Enter your username"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <TextField
                          label="Enter your telephone"
                          fullWidth
                          required
                          className="form-control form-control-lg"
                          type="tel"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          inputProps={{ maxLength: 10 }}
                        />
                      </div>

                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="femaleGender"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            for="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="maleGender"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label" for="maleGender">
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="otherGender"
                            value="other"
                            onChange={(e) => setGender(e.target.value)}
                          />
                          <label className="form-check-label" for="otherGender">
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <TextField
                            label="Enter password"
                            fullWidth
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <TextField
                            label="Confirm password"
                            fullWidth
                            required
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 mb-4">
                          <button
                            className="loginButton btn btn-primary"
                            type="submit"
                            onClick={handleClick}
                          >
                            {isLoading ? "wait..." : "Signup"}
                          </button>
                        </div>
                        <div className="col-md-4 mb-4 mt-0">
                          <Link to="/login">
                            <button className="loginButton btn btn-outline-success">
                              Login into Account
                            </button>
                          </Link>
                        </div>
                      </div>
                      <Link to="/">
                        <button className="btn btn-light ">
                          Back to homepage
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="/assets/post/signupDrawer.svg"
                      alt="Sample pic"
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
