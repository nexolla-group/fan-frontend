import React from "react";
import { Feature } from "../../Components";
import "./features.css";

const newsAndMedia = [
  {
    title: "Sunrise FC has bought a new player this week",
    text: "Lorem ipsum dolor sit amet consectetur adipisicingLorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur ",
  },
  {
    title: "Mohamed postponed players transport to USA",
    text: "Lorem ipsum dolor sit amet consectetur adipisicingLorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur ",
  },
  {
    title: "All fans of Sunrise football club  are happy",
    text: "Lorem ipsum dolor sit amet consectetur adipisicingLorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur ",
  },
];
const Features = () => {
  return (
    <div className="platform__features section__padding" id="newsAndGarelly">
      <div className="platform__features-heading">
        <h1 className="gradient__text">News & Media Gallery</h1>
        <p>
          The subtitle will go here! and all of this sectio will be react slick
        </p>
      </div>
      <div className="platform__features-container">
        {newsAndMedia.map((item, index) => (
          <Feature
            title={item.title}
            text={item.text}
            key={item.title + index}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
