import React from "react";
import "./infobar.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";

const InfoBar = ({ selectedGroup }) => {
  return (
    <div className="infoBar">
      <div className="heading">
        <h3>{selectedGroup?.groupDetails?.groupName}</h3>
        <Link to={"/contributions/" + selectedGroup?.groupDetails?._id}>
          Contribute
        </Link>
      </div>
      <div className="groupDesciption">
        <p>{selectedGroup?.groupDetails?.description}</p>
      </div>
    </div>
  );
};

export default InfoBar;
