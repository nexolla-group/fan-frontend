import React from "react";
import "./infobar.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";

const InfoBar = ({ selectedGroup }) => {
  console.log("Selected  froup", selectedGroup);
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <div>
          <h3>{selectedGroup?.groupDetails?.groupName}</h3>
          <p className="groupDsc">{selectedGroup?.groupDetails?.description}</p>
        </div>
      </div>
      <div className="rightInnerContainer">
        <Link to={"/contributions/" + selectedGroup?.groupDetails?._id}>
          Contribute
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
