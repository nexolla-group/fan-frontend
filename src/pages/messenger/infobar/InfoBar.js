import React from "react";
import "./infobar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const InfoBar = ({ selectedGroup }) => {
  const { token, role } = useSelector((state) => state.user);

  return (
    <div className='infoBar'>
      <div className='heading'>
        <h3>{selectedGroup?.groupDetails?.groupName}</h3>
        {role === "admin" ? (
          ""
        ) : (
          <Link to={"/contributions/" + selectedGroup?.groupDetails?._id}>
            Contribute
          </Link>
        )}
      </div>
      <div className='groupDesciption'>
        <p>{selectedGroup?.groupDetails?.description}</p>
      </div>
    </div>
  );
};

export default InfoBar;
