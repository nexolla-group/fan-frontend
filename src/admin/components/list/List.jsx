import React from "react";
import "./list.scss";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import Sidebar from "../sidebar/Sidebar";
import UserDataTable from "../../datatable/UserDataTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <AdminNavbar />
        <UserDataTable />
      </div>
    </div>
  );
};

export default List;
