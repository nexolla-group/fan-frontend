import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
    <div className='platform__features section__padding' id='newsAndGarelly'>
      <div className='platform__features-heading'>
        <h1 className='gradient__text'>News & Media Gallery</h1>
        <p>
          The subtitle will go here! and all of this sectio will be react slick
        </p>
      </div>
      <div className='platform__features-container'>
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
