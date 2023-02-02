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
    <div className='fanclub__whatplatform section__margin' id='theClub'>
      <div className='fanclub__whatplatform-feature'>
        <Feature
          title='What is fan club collaboration system '
          text='The fan club collaboration system is an operational social web platform for the football fan club that focuses on encouraging the development of social networks or interpersonal contacts, especially among followers of the sunrise football club. By supporting one another in the recreational activity of football, for instance, two or more fans can share interests, hobbies, happiness, or lifestyles. a system that consists of public networks, different services, and a representation of each user (often a profile). '
        />
      </div>
      <div className='fanclub__whatplatform-heading'>
        <h1 className='gradient__text'>Become the part of our Greatest Team</h1>
        <p>Join our Team Today</p>
      </div>
      <div className='platform__whatplatform-container'>
        {blogPost.map((item) => (
          <Feature title={item?.title} text={item?.desc} />
        ))}

        {/* <Feature
          title='Friday announcements'
          text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
          impedit sed ullam quasi. Blanditiis enim pariatur dicta consequuntur
          incidunt nam.'
        />
        <Feature
          title='Promotions Anouncements'
          text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
          impedit sed ullam quasi. Blanditiis enim pariatur dicta consequuntur
          incidunt nam.'
        /> */}
      </div>
    </div>
  );
};

export default WhatPlatform;
