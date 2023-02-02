import React, { useState } from "react";
import { Navbar } from "../../Home/Components";
import "./userProfile.scss";
import userProfile from "../../assets/userprofile.png";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAddress,
  setEmail,
  setFullNames,
  setGender,
  setPhone,
  setUsername,
} from "../../actions/user";
import { LoadingButton } from "@mui/lab";
import { errorHandler, toastMessage } from "../../helpers";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { token, id, fullName, username, email, phone, gender, address } =
    useSelector((state) => state.user);
  const [userFullNames, setUserFullNames] = useState(fullName);
  const [userName, setUserName] = useState(username);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);
  const [userGender, setUserGender] = useState(gender);
  const [userAddress, setUserAddress] = useState(address);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    const data = {
      fullName: userFullNames,
      username: userName,
      email: userEmail,
      telephoneNumber: userPhone,
      gender: userGender,
      address: userAddress,
      token,
    };
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/userDetaails/" + id,
        data
      )
      .then((res) => {
        dispatch(setFullNames(res.data.data.fullName));
        dispatch(setUsername(res.data.data.username));
        dispatch(setEmail(res.data.data.email));
        dispatch(setPhone(res.data.data.telephoneNumber));
        dispatch(setGender(res.data.data.gender));
        dispatch(setAddress(res.data.data.address));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error for update", error);
      });
  };

  const handleUpdatePassword = () => {
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/updatePassword/" + id,
        { currentPassword, newPassword, token }
      )
      .then((res) => {
        setCurrentPassword("");
        setNewPassword("");
        toastMessage("success", "Password Changed!!");
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
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
              <h2>{username}</h2>
              <p>Names: {fullName}</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <p>Address: {address}</p>
            </div>
          </div>
          <div className="update-user-details">
            <div className="user-basic-info">
              <ul>
                <li>
                  Full Name
                  <input
                    type="text"
                    placeholder="Your Full name"
                    value={userFullNames}
                    onChange={(e) => setUserFullNames(e.target.value)}
                  />
                </li>
                <li>
                  Username
                  <input
                    type="text"
                    placeholder="Your Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </li>
                <li>
                  Email
                  <input
                    type="text"
                    placeholder="Your Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </li>
                <li>
                  Phone
                  <input
                    type="tel"
                    placeholder="Your Phone number"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </li>

                <li>
                  Address
                  <input
                    type="text"
                    placeholder="Your Address"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </li>
                {loading ? (
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveOutlinedIcon />}
                    variant="outlined"
                    className="btn btn-outline-primary"
                  >
                    Saving...
                  </LoadingButton>
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleUpdate}
                  >
                    <SaveOutlinedIcon />
                    Save Profile
                  </button>
                )}
              </ul>
            </div>
            <div className="update-password">
              <p>Update Password</p>
              <ul>
                <li>
                  Current password
                  <input
                    type="password"
                    placeholder="Enter Existing password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </li>
                <li>
                  New Password
                  <input
                    type="password"
                    placeholder="Enter New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </li>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleUpdatePassword}
                >
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
