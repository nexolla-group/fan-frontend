import React from "react";
import "./sidebar.scss";
import {
  AiOutlineWindows,
  AiTwotoneNotification,
  AiOutlineGlobal,
  AiOutlineAppstore,
} from "react-icons/ai";
import sunriseLogo from "../../../assets/SunriseLogo.png";
import { Link, NavLink } from "react-router-dom";

const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Dashboard",
        icon: <AiOutlineAppstore />,
      },
      {
        name: "Tasks",
        icon: <AiOutlineAppstore />,
      },
      {
        name: "Groups",
        icon: <AiOutlineAppstore />,
      },
    ],
  },

  {
    title: "Posts",
    links: [
      {
        name: "Transactions",
        icon: <AiOutlineGlobal />,
      },
      {
        name: "Posts",
        icon: <AiTwotoneNotification />,
      },
      {
        name: "Users",
        icon: <AiOutlineAppstore />,
      },
    ],
  },
];
const Sidebar = () => {
  return (
    <>
      <div className='Sidebar'>
        <div className='top' style={{ backgroundColor: "var(--color-bg)" }}>
          <span className='Logo'>
            <img src={sunriseLogo} alt='' style={{ width: "100px" }} />
          </span>
        </div>

        <div className='center'>
          {links.map((item) => (
            <ul key={item.title}>
              <p className='title'>{item.title}</p>
              {item.links.map((link) => (
                <NavLink
                  to={`/admin/${link.name}`}
                  key={link.name}
                  className='listOfLinks Icon'
                >
                  {link.icon}
                  <span className='capitalize'>{link.name}</span>
                </NavLink>
              ))}
            </ul>
          ))}
        </div>
        <div>
          <Link to={"/logout"}>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>Logout</span>
          </Link>
        </div>
        <div className='bottom'>
          <div className='colorOption'></div>
          <div className='colorOption'></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;