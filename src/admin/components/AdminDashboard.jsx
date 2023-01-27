import React from "react";
import "./AdminDashboard.scss";
import AdminNavbar from "./adminNavbar/AdminNavbar";
import Featured from "./featuresChart/Featured";
import Chart from "./normalChart/Chart";
import Sidebar from "./sidebar/Sidebar";
import DataTable from "./table/DataTable";
import Widget from "./widget/Widget";

const AdminDashboard = () => {
  return (
    <>
      <div className="Home">
        <Sidebar />
        <div className="homeContainer">
          <AdminNavbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="fans" />
            <Widget type="earnings" />
            <Widget type="balance" />
            <Widget type="posts" />
          </div>
          <div className="charts-container">
            <Featured />
            <Chart />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transctions</div>
            {/* <DataTable /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
