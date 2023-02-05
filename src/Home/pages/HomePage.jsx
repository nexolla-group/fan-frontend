import React from "react";
import FixturesAndResultsTable from "../../admin/components/MatchFixtures/FixturesAndResultsTable";
import { CallToAction, Navbar } from "../Components";
import {
  Features,
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

          <div style={{ padding: "0 3rem" }}>
            <FixturesAndResultsTable />
          </div>

          <CallToAction />
          {/* <FixturesAndResults /> */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
