import React from "react";
import "./possibility.css";
import fanOnLaptop from "../../../assets/goooal.png";
const Possibility = () => {
  return (
    <div className="platform__possibility section__padding" id="possibility">
      <div className="platform__possibility-image">
        <img src={fanOnLaptop} alt="possibility" />
      </div>
      <div className="platform__possibility-content">
        <h4>Get updates and support your favorite team everywhere you are! </h4>
        <h1 className="gradient__text">
          See Whats happening on Sunrise FC 24/7!
        </h1>
        <p className="objectives">
          ● Make it easier for the Sunrise football club to communicate with its
          supporters.
        </p>
        <p className="objectives">
          ● Analyze and enhance the current support team technique
        </p>
        <p className="objectives">
          ● Establish a system that would assist fan club members in creating a
          social network.
        </p>
        <p className="objectives">
          ● Obtain up-to-date information on their team
        </p>
        <p className="objectives">
          ● Make it easier for fans to understand their role on the team.
        </p>
        {/* <h4>Sign up or Login Early to get started</h4> */}
      </div>
    </div>
  );
};

export default Possibility;
