import React from "react";
import { CallToAction, Navbar } from "../Components";
import {
  Features,
  FixturesAndResults,
  Footer,
  Header,
  Possibility,
  WhatPlatform,
} from "../containers";

const HomePage = () => {
  return (
    <>
      <div className="">
        <div className="gradient__bg">
          <Navbar />
          <Header />
          <WhatPlatform />
          <Features />
          <Possibility />
          <CallToAction />
          {/* <FixturesAndResults /> */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
