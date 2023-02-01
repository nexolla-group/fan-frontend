import React, { useState } from "react";
import { Navbar } from "../../Home/Components";
import "./userProfile.scss";
import userProfile from "../../assets/userprofile.png";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid ProfileContainer">
        <div className="user-page">
          <div className="user-header">
            <div className="user-photo">
              <img src="https://via.placeholder.com/150x150" alt="User Photo" />
            </div>
            <div className="user-info">
              <h2>User Name</h2>
              <p>Email: user@email.com</p>
              <p>Location: City, Country</p>

              <Link to="/logout">
                <p
                  className="text-danger mt-5 fw-bold cur-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    if (!window.confirm("Are you sure you want to log out?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  Logout
                </p>
              </Link>
            </div>
          </div>
          <div className="update-user-details">
            <div className="user-basic-info">
              <ul>
                <li>
                  Full Name
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Your Full name"
                  />
                </li>
                <li>
                  Username
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Your Username"
                  />
                </li>
                <li>
                  Email
                  <input type="text" name="" id="" placeholder="Your Email" />
                </li>
                <li>
                  Phone
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Your Phone number"
                  />
                </li>

                <li>
                  Address
                  <input type="text" name="" id="" placeholder="Your Address" />
                </li>
                <button className="btn btn-outline-primary">
                  <SaveOutlinedIcon /> Save Profile
                </button>
              </ul>
            </div>
            <div className="update-password">
              <p>Update Password</p>
              <ul>
                <li>
                  Current password
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter Existing password"
                  />
                </li>
                <li>
                  New Password
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="Enter New password"
                  />
                </li>
                <button className="btn btn-outline-primary">
                  <SaveOutlinedIcon /> Save Password
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
