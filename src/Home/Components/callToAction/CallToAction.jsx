import React from "react";
import "./callToAction.css";
import { Link, NavLink } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="platform__callToAction">
      <div className="platform__calltoAction-content">
        <p>Request Early access to Fan club Platform</p>
        <h3>
          Register to day and start supporting your favorite Team Sunrise FC
        </h3>
      </div>
      <div className="platform__callToAction-button">
        <a href="/login" className="button" type="button">
          Get Started
        </a>
      </div>
    </div>
  );
};
export default CallToAction;
