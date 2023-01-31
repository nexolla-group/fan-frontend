import React, { useContext, useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../../assets/SunriseLogo.png";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../../../src/assets/admin.jpg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
const Navbar = () => {
  const { token, username, fullName, profilePicture } = useSelector(
    (state) => state.user
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = () => {
    setShowDiv(!showDiv);
  };
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      {/* //i used BEM : Block Element Modifier for css classes */}

      {token != "" && username != "" ? (
        <>
          <div className="fanclub__navbar gradient__bg">
            <div className="fanclub__navbar-links">
              <div className="fanclub__navbar-links_logo">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img src={logo} alt="App Logo" />
                </Link>
              </div>
              <div className="fanclub__navbar-links_container">
                <p>
                  <HomeOutlinedIcon className="navIcon" />
                  <NavLink to="/userHome">Home</NavLink>
                </p>
                <p>
                  <Diversity3OutlinedIcon className="navIcon" />{" "}
                  <a href="/groups">Groups</a>
                </p>
                <p>
                  <EmailOutlinedIcon className="navIcon" />{" "}
                  <a href="/messenger">Messaging</a>
                </p>
                <p>
                  <HistoryOutlinedIcon className="navIcon" />{" "}
                  <a href="/userTransactions">Contribution History</a>
                </p>

                <p onClick={handleClick}>
                  <SettingsOutlinedIcon className="navIcon" /> Settings
                </p>
              </div>
            </div>

            <div className="fanclub__navbar-menu">
              {toggleMenu ? (
                <RiCloseLine
                  color="#fff"
                  size={27}
                  cursor="pointer"
                  onClick={() => setToggleMenu(false)}
                />
              ) : (
                <RiMenu3Line
                  color="#fff"
                  cursor="pointer"
                  size={27}
                  onClick={() => setToggleMenu(true)}
                />
              )}
              {toggleMenu && (
                <div className="fanclub__navbar-menu_container scale-up-center">
                  <div className="fanclub__navbar-menu_container-links">
                    <p>
                      <HomeOutlinedIcon className="navIcon" />
                      <NavLink to="/userHome">Home</NavLink>
                    </p>
                    <p>
                      <Diversity3OutlinedIcon className="navIcon" />{" "}
                      <a href="/groups">Groups</a>
                    </p>
                    <p>
                      <EmailOutlinedIcon className="navIcon" />{" "}
                      <a href="/messenger">Messaging</a>
                    </p>

                    <p onClick={handleClick}>
                      <SettingsOutlinedIcon className="navIcon" /> Settings
                    </p>
                    <div className="fanclub__navbar-menu_container-links-sign">
                      <p>Sign in</p>
                      <button type="button">Sign up</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="fanclub__navbar gradient__bg">
            <div className="fanclub__navbar-links">
              <div className="fanclub__navbar-links_logo">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img src={logo} alt="App Logo" />
                </Link>
              </div>
              <div className="fanclub__navbar-links_container">
                <p>
                  <HomeOutlinedIcon className="navIcon" />
                  <NavLink to="/">Home</NavLink>
                </p>
                <p>
                  <Diversity3OutlinedIcon className="navIcon" />
                  <a href="#theClub">The Club</a>
                </p>
                <p>
                  <NewspaperOutlinedIcon className="navIcon" />
                  <a href="#newsAndGarelly">News</a>
                </p>

                {/* <p>
                  <SettingsOutlinedIcon className="navIcon" />
                  <a href="#fixtures">Fixtures and Results</a>
                </p> */}
              </div>
            </div>
            <div className="fanclub__navbar-sign">
              <Link to="/login">
                <p>Sign in</p>
              </Link>
              <Link to="/register">
                <button type="button">Sign up</button>
              </Link>
            </div>
            <div className="fanclub__navbar-menu">
              {toggleMenu ? (
                <RiCloseLine
                  color="#fff"
                  size={27}
                  cursor="pointer"
                  onClick={() => setToggleMenu(false)}
                />
              ) : (
                <RiMenu3Line
                  color="#fff"
                  cursor="pointer"
                  size={27}
                  onClick={() => setToggleMenu(true)}
                />
              )}
              {toggleMenu && (
                <div className="fanclub__navbar-menu_container scale-up-center">
                  <div className="fanclub__navbar-menu_container-links">
                    <p>
                      <HomeOutlinedIcon className="navIcon" />
                      <NavLink to="/">Home</NavLink>
                    </p>
                    <p>
                      <Diversity3OutlinedIcon className="navIcon" />
                      <a href="#theClub">The Club</a>
                    </p>
                    <p>
                      <NewspaperOutlinedIcon className="navIcon" />
                      <a href="#newsAndGarelly">News</a>
                    </p>
                    <div className="fanclub__navbar-menu_container-links-sign">
                      <p>Sign in</p>
                      <button type="button">Sign up</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className={`profile-info ${showDiv ? "show" : "hide"}`}>
        <div class="user-info">
          <img src={profilePic} alt="user profile pic" />
          <div>
            <h3>{username}</h3>
            <p>
              <a href="/userprofile">See your Profile</a>
            </p>
          </div>
        </div>
        <hr />
        <a href="#" class="profile-menu-link">
          <p>Give feedback</p>
          <span>-</span>
        </a>

        <a href="#" class="profile-menu-link">
          <p>
            <Link to={"/logout"}> Logout</Link>
          </p>
          <span>-</span>
        </a>
      </div>
    </>
  );
};

export default Navbar;
