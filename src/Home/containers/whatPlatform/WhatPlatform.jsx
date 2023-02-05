import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Feature } from "../../Components";
import "./whatPlatform.css";

const WhatPlatform = () => {
  const [blogPost, setBlogPosts] = useState([]);
  const [newsPost, setNewPost] = useState([]);
  const fetchPost = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/post")
      .then((res) => {
        setBlogPosts(res.data.data.filter((item) => item.type === "blog"));
        setNewPost(res.data.data.filter((item) => item.type === "news"));
      })
      .catch((error) => console.log("Bad", error));
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="fanclub__whatplatform section__margin" id="theClub">
      <div className="platform__whatplatform-container">
        {blogPost.map((item) => (
          <Feature title={item?.title} text={item?.desc} />
        ))}
      </div>
    </div>
  );
};

export default WhatPlatform;
