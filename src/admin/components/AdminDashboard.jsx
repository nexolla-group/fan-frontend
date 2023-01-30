import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./AdminDashboard.scss";
import AdminNavbar from "./adminNavbar/AdminNavbar";
import Featured from "./featuresChart/Featured";
import Chart from "./normalChart/Chart";
import Sidebar from "./sidebar/Sidebar";
import DataTable from "./table/DataTable";
import Widget from "./widget/Widget";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/users/all")
      .then((res) => setUsers(res.data.data))
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchPosts = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/post")
      .then((res) => {
        console.log("Post response", res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <>
      <div className='Home'>
        <Sidebar />
        <div className='homeContainer'>
          <AdminNavbar />
          <div className='widgets'>
            <Widget type='user' />
            <Widget type='balance' />
            <Widget type='posts' />
          </div>
          <div className='charts-container'>
            <Featured />
            <Chart />
          </div>
          <div className='listContainer'>
            <div className='listTitle'>Latest Transctions</div>
            {/* <DataTable /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
