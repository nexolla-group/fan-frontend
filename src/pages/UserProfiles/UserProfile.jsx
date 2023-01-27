import React, { useState } from "react";
import { Navbar } from "../../Home/Components";
import "./userProfile.scss";
import userProfile from "../../assets/userprofile.png";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState("");
  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="left-grid">
          {" "}
          <div className="user-profile">
            <img src={userProfile} alt="User Profile" />
            <h3>Username</h3>
            <p>user@example.com</p>
          </div>
          <div className="accordion">
            <button onClick={() => setIsOpen(!isOpen)}>Links</button>
            {isOpen && (
              <ul>
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 2</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="center-grid">Center Grid</div>
        <div className="right-grid">Right Grid</div>
      </div>
    </>
  );
};

export default UserProfile;
