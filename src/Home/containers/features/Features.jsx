import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Feature } from "../../Components";
import "./features.css";

const Features = () => {
  const [newsPost, setNewPost] = useState([]);
  const fetchPost = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/post")
      .then((res) => {
        setNewPost(res.data.data.filter((item) => item.type === "news"));
      })
      .catch((error) => console.log("Bad", error));
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="platform__features section__padding" id="newsAndGarelly">
      <div className="platform__features-heading">
        <h1 style={{ marginLeft: "1rem" }} className="gradient__text">
          Trending News
        </h1>
      </div>
      <div className="platform__features-container">
        {newsPost.map((item, index) => (
          <Feature
            title={item.title}
            text={item.desc}
            key={item.title + index}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
