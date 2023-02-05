import React from "react";
import Sidebar from "../sidebar/Sidebar";
import AdminNavbar from "../adminNavbar/AdminNavbar";

function Results() {
  return (
    <>
      <div className="Home">
        <Sidebar />
        <div className="homeContainer">
          <AdminNavbar />
          <h3>Match Results</h3>
        </div>
      </div>
    </>
  );
}

export default Results;
