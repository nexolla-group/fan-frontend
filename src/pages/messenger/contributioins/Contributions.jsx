import React from "react";
import { Navbar } from "../../../Home/Components";
import { Possibility } from "../../../Home/containers";
import FooterWithCopyright from "../../../Home/containers/footer/FooterWithCopyright";
import "./contributions.css";

const Contributions = () => {
  return (
    <>
      <Navbar />
      <div className='contributions__container'>
        <Possibility />
      </div>
      <FooterWithCopyright />
    </>
  );
};

export default Contributions;
