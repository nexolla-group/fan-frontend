import React from "react";
import "./sidebar.scss";
import {
  AiTwotoneNotification,
  AiOutlineGlobal,
  AiOutlineAppstore,
} from "react-icons/ai";
import sunriseLogo from "../../../assets/SunriseLogo.png";
import { Link, NavLink } from "react-router-dom";
import { GroupOutlined, Person2 } from "@mui/icons-material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Dashboard",
        icon: <AiOutlineAppstore />,
      },
    ],
  },

  {
    title: "Posts",
    links: [
      {
        name: "Posts",
        icon: <AiTwotoneNotification />,
      },
      {
        name: "Fixtures",
        icon: <SportsSoccerIcon fontSize="small" />,
      },
      // {
      //   name: "Results",
      //   icon: <SportsSoccerIcon fontSize="small" />,
      // },
    ],
  },
  {
    title: "Groups",
    links: [
      {
        name: "Groups",
        icon: <GroupOutlined />,
      },

      {
        name: "Transactions",
        icon: <AiOutlineGlobal />,
      },
      {
        name: "Users",
        icon: <Person2 />,
      },
    ],
  },
];
const Sidebar = ({ isVisible, setIsVisible, toggleVisibility }) => {
  return (
    <>
      <div className="Sidebar">
        <div className="top" style={{ backgroundColor: "var(--color-bg)" }}>
          <span className="Logo">
            <img src={sunriseLogo} alt="" style={{ width: "100px" }} />
          </span>
        </div>

        <div className="center">
          {links.map((item) => (
            <ul key={item.title}>
              <p className="title">{item.title}</p>
              {item.links.map((link) => (
                <NavLink
                  to={`/admin/${link.name}`}
                  key={link.name}
                  className="listOfLinks Icon"
                >
                  {link.icon}
                  <span className="capitalize">{link.name}</span>
                </NavLink>
              ))}
            </ul>
          ))}
        </div>
        <div className="bottom mt-4">
          <div className="colorOption"></div>
          <div className="colorOption"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
