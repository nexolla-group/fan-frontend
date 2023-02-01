import "./login.css";
import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setCoverPicture,
  setEmail,
  setFollowers,
  setFollowing,
  setFullNames,
  setGender,
  setJoinedGroups,
  setPhone,
  setProfilePicture,
  setRole,
  setToken,
  setUserId,
  setUsername,
} from "../../actions/user";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { errorHandler, toastMessage } from "../../helpers";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    setIsFetching(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/auth/login/", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setUserId(res.data.id));
        dispatch(setFullNames(res.data.fullName));
        dispatch(setUsername(res.data.username));
        dispatch(setEmail(res.data.email));
        dispatch(setPhone(res.data.telephoneNumber));
        dispatch(setGender(res.data.gender));
        dispatch(setCoverPicture(res.data.coverPicture));
        dispatch(setProfilePicture(res.data.profilePicture));
        dispatch(setFollowers(res.data.followers));
        dispatch(setFollowing(res.data.following));
        dispatch(setJoinedGroups(res.data.joinedGroups));
        dispatch(setRole(res.data.role));
        dispatch(setToken(res.data.token));
        setIsFetching(false);
        toastMessage("success", "Logged in");
      })
      .catch((error) => {
        setIsFetching(false);
        errorHandler(error.response.data);
        //error handler
      });
  };
  return (
    <div className='login p-2 '>
      <div className=' '>
        <div className='row'>
          <div className='col col-12'>
            <h1
              style={{ color: "var(--color-footer)" }}
              className='text-center fw-bold mb-4'
            >
              Sign in
            </h1>
          </div>
          <div className='col'>
            <form className='loginBox' onSubmit={handleClick}>
              <input
                type='text'
                placeholder='Username'
                className='loginInput'
                required
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                className='loginInput'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='submit'
                className='loginButton btn btn-primary'
                disabled={isFetching}
              >
                {isFetching ? <CircularProgress className='lgn' /> : "Log In"}
              </button>
              <span className='loginForgot'>Forgot Password?</span>
              <Link to={"/register"}>
                <button
                  type='button'
                  className='loginButton btn btn-outline-success'
                >
                  Create account
                </button>
              </Link>
              <Link to='/'>
                <button className='loginButton btn btn-light'>Back</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
