import React, { useState, useEffect } from "react";
import "./adminNavbar.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import admini from "../../../assets/admin.jpg";

import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Notifications from "../Notifications/Notifications";

const AdminNavbar = ({ toggleVisibility }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClickNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const handleClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="Navbarr">
          <div className="wrapperr">
            <div className="search">
              <input type="search" placeholder="Search..." />
              <SearchRoundedIcon />
            </div>
            <div className="items">
              <div className="item">
                <FullscreenExitOutlinedIcon
                  onClick={toggleVisibility}
                  className="icon"
                />
              </div>
              <div className="item" onClick={handleClickNotifications}>
                <NotificationsNoneRoundedIcon className="icon" />
                {/* <div className="counter">17</div> */}
              </div>
              <div className="item">
                <ChatBubbleOutlineRoundedIcon className="icon" />
                {/* <div className="counter">2</div> */}
              </div>
              <div className="item" onClick={handleClick}>
                <FormatListBulletedOutlinedIcon className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`profile-info bg-dark text-white ${
          showProfile ? "show" : "hide"
        }`}
      >
        <div class="user-info d-flex">
          <img src={admini} alt="user profile pic" />
          <div>
            <h3 className="text-light text-center">Administrator</h3>
          </div>
        </div>
        <hr />
        <a href="#" class="profile-menu-link">
          <p>Give feedback</p>
          <span>-</span>
        </a>

        <a href="#" class="profile-menu-link">
          <p>
            <Link to={"/logout"}>Logout</Link>
          </p>
          <span>-</span>
        </a>
      </div>
      {showNotifications && (
        <div className="container-fluid">
          <Notifications />
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
