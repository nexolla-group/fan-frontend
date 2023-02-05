import React, { useState, useEffect } from "react";
import "./notifications.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Notifications = ({ groups }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const alert = document.querySelector(".congratulations-alert");
    alert.classList.add("congratulations-alert-enter");
  }, []);
  return (
    showAlert && (
      <div className="congratulations-alert d-block">
        <p className="congratulations-alert-message text-success">
          No New Notifications
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

export default Notifications;
