import React from "react";
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
      </div>
      <FooterWithCopyright />
    </>
  );
};

export default Contributions;
