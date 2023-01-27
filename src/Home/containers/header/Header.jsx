import React from "react";
import "./header.css";
import logo from "../../../assets/logo.png";

const Header = () => {
  return (
    <div className="fanclub__header section__padding" id="home">
      <div className="fanclub__header-content">
        <h1 className="gradient__text"> Surnise Football Club</h1>
        <p>Welcome to Fan Club Collaboration Platform</p>
        <p>
          a web-based system named a 'Fan club collaboration platform' that will
          connect billions of fans worldwide, allowing for greater
          interactivity, collaboration, communication, and personalization than
          has previously been possible. With an ever-increasing football
          audience in Rwanda as well as on every continent, the 'Fan club
          collaboration platform' will offer the opportunity for limitless
          connection based on a love of the beautiful game.{" "}
        </p>
        <div className="fanclub__header-content__input">
          <input type="email" placeholder="" />
          <button type="button">Get started</button>
        </div>
      </div>
      <div className="fanclub__header-image">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
