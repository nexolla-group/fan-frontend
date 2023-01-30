import React from "react";
import "./widget.scss";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";
import { GroupOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Widget = ({ type, amount }) => {
  let data;

  // temporary while waiting jean demo to fetch some data from the backend database

  const diff = 23.8;

  switch (type) {
    case "user":
      data = {
        title: "users",
        isMoney: false,
        link: "view all users",
        icon: (
          <PersonOutlineOutlinedIcon
            className='icon'
            style={{ color: "#fff", backgroundColor: "var(--color-bg)" }}
          />
        ),
      };
      break;
    case "fans":
      data = {
        title: "fans",
        isMoney: false,
        link: "view all fans",
        icon: (
          <PersonOutlineOutlinedIcon
            className='icon'
            style={{ color: "#fff", backgroundColor: "var(--color-text)" }}
          />
        ),
      };
      break;
    case "earnings":
      data = {
        title: "earnings",
        isMoney: true,
        link: "view all earnings",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className='icon'
            style={{ color: "#fff", backgroundColor: "green" }}
          />
        ),
      };
      break;
    case "transactions":
      data = {
        title: "transactions",
        isMoney: true,
        link: "view all more",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className='icon'
            style={{ color: "#fff", backgroundColor: "lightgreen" }}
          />
        ),
      };
      break;
    case "posts":
      data = {
        title: "posts",
        isMoney: false,
        link: "view all posts",
        icon: (
          <SignpostOutlinedIcon
            className='icon'
            style={{ color: "#fff", backgroundColor: "green" }}
          />
        ),
      };
      break;
    case "groups":
      data = {
        title: "groups",
        isMoney: false,
        link: "view all groups",
        icon: (
          <GroupOutlined
            className='icon'
            style={{ color: "#fff", backgroundColor: "var(--color-text)" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>
          {amount} {data.isMoney}
        </span>
        <Link to={`/admin/${data.title}`}>
          <span className='link'>{data.link}</span>
        </Link>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <ExpandLessOutlinedIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
