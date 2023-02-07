import React from "react";
import FixturesAndResultsTable from "../../../admin/components/MatchFixtures/FixturesAndResultsTable";
import { Navbar } from "../../../Home/Components";
import { Features, Possibility } from "../../../Home/containers";
import FooterWithCopyright from "../../../Home/containers/footer/FooterWithCopyright";
import "./contributions.css";

const Contributions = () => {
  return (
    <>
      <Navbar />
      <div className="contributions__container">
        <Possibility />
        <Features />
        <div style={{ padding: "0 3rem" }}>
          <FixturesAndResultsTable />
        </div>
        <FooterWithCopyright />
      </div>
    </>
  );
};

export default Contributions;
