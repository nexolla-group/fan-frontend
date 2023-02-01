import React, { useState } from "react";
import { Navbar } from "../../Home/Components";
import "./userProfile.scss";
import userProfile from "../../assets/userprofile.png";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { token, fullName, username, email, phone, gender, address } =
    useSelector((state) => state.user);
  const [fullNames, setFullNames] = useState(fullName);
  const [userName, setUserName] = useState(username);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);
  const [userGender, setUserGender] = useState(gender);
  const [userAddress, setUserAddress] = useState(address);
  return (
    <>
      <Navbar />
      <div className='container-fluid ProfileContainer'>
        <div className='user-page'>
          <div className='user-header'>
            <div className='user-photo'>
              <img src='https://via.placeholder.com/150x150' alt='User Photo' />
            </div>
            <div className='user-info'>
              <h2>User Name</h2>
              <p>Email: user@email.com</p>
              <p>Location: City, Country</p>

              <Link to='/logout'>
                <p
                  className='text-danger mt-5 fw-bold cur-pointer'
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
          <div className='update-user-details'>
            <div className='user-basic-info'>
              <ul>
                <li>
                  Full Name
                  <input
                    type='text'
                    placeholder='Your Full name'
                    value={fullNames}
                    onChange={(e) => setFullNames(e.target.value)}
                  />
                </li>
                <li>
                  Username
                  <input
                    type='text'
                    placeholder='Your Username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </li>
                <li>
                  Email
                  <input
                    type='text'
                    placeholder='Your Email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </li>
                <li>
                  Phone
                  <input
                    type='tel'
                    placeholder='Your Phone number'
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </li>

                <li>
                  Address
                  <input
                    type='text'
                    placeholder='Your Address'
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </li>
                <button className='btn btn-outline-primary'>
                  <SaveOutlinedIcon /> Save Profile
                </button>
              </ul>
            </div>
            <div className='update-password'>
              <p>Update Password</p>
              <ul>
                <li>
                  Current password
                  <input
                    type='password'
                    placeholder='Enter Existing password'
                  />
                </li>
                <li>
                  New Password
                  <input type='password' placeholder='Enter New password' />
                </li>
                <button className='btn btn-outline-primary'>
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
