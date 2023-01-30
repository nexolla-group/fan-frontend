import React from "react";
import "./adminNavbar.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import profilePic from "../../../../src/assets/admin.jpg";

import { Link, NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className='Navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='search' placeholder='Search...' />
          <SearchRoundedIcon />
        </div>
        <div className='items'>
          <div className='item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <NotificationsNoneRoundedIcon className='icon' />
            <div className='counter'>17</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineRoundedIcon className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <FormatListBulletedOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <img src={profilePic} alt='' className='avatar' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
