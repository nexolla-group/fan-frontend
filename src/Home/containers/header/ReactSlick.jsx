import "./ReactSlick.css";
import React from "react";
import Slider from "react-slick";

const ReactSlick = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="reactSlickContainer">
      <Slider {...settings}>
        <p1>sentence 1</p1>
        <p1>sentence 1</p1>
        <p1>sentence 1</p1>
      </Slider>
    </div>
  );
};

export default ReactSlick;
