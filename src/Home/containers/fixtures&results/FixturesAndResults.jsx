import React from "react";
import "./fixturesAndResults.css";
import { Article } from "../../Components";
import { blog01, blog02, blog03, blog04, blog05 } from "./imports";

const FixturesAndResults = () => {
  return (
    <div className="platform__fixtures section__padding" id="fixtures">
      <div className="platform__fixtures-heading">
        <h1 className="gradient__text">Fixtures and results</h1>
      </div>
      <div className="platform__fixtures-container">
        <div className="platform__fixtures-container_groupB">
          <Article
            imgUrl={blog02}
            date="yesterday"
            title=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, earum."
          />
          <Article
            imgUrl={blog03}
            date="yesterday"
            title=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, earum."
          />
          <Article
            imgUrl={blog04}
            date="yesterday"
            title=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, earum."
          />
          <Article
            imgUrl={blog05}
            date="yesterday"
            title=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, earum."
          />
        </div>
      </div>
    </div>
  );
};

export default FixturesAndResults;
