import React, { useState, useEffect } from "react";
import "./congratulations.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const Congratulations = ({ group }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const alert = document.querySelector(".congratulations-alert");
    alert.classList.add("congratulations-alert-enter");
  }, []);
  return (
    showAlert && (
      <div className="congratulations-alert d-block">
        <p className="congratulations-alert-message text-success">
          Congratulations!!!
        </p>
        <p className="congratulations-alert-message">
          {group?._id && group.groupName} has Reached the Target goal!!
        </p>
        <button
          className="congratulations-alert-close"
          onClick={() => setShowAlert(false)}
        >
          <CloseOutlinedIcon />
        </button>
      </div>
    )
  );
};

export default Congratulations;
