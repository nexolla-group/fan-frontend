import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./AdminDashboard.scss";
import AdminNavbar from "./adminNavbar/AdminNavbar";
import ContributionsProgress from "./contributions/ContributionsProgress";
// import Featured from "./featuresChart/Featured";
import Chart from "./normalChart/Chart";
import Sidebar from "./sidebar/Sidebar";

import Widget from "./widget/Widget";

const AdminDashboard = ({ isVisible, toggleVisibility }) => {
  const { token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [transactions, setTransactions] = useState([]);

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
        setPosts(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  const fetchGroups = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/groups/all/?token=" + token
      )
      .then((res) => setGroups(res.data.data))
      .catch((error) => console.log(error));
  };
  const fetchTransactions = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/transactions/?token=" + token
      )
      .then((res) => {
        setTransactions(res.data.transactions);
      })
      .catch((error) => console.log("fetchTransactionsError", error));
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchGroups();
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="Home">
        {isVisible && <Sidebar />}

        <div className="homeContainer">
          <AdminNavbar toggleVisibility={toggleVisibility} />
          <div className="widgets">
            <div className="row w-100">
              <div className="col col-md-3 col-sm-12 mb-4">
                <Widget type="user" amount={users.length} />
              </div>
              <div className="col col-md-3 col-sm-12">
                <Widget type="transactions" amount={transactions.length} />
              </div>
              <div className="col col-md-3 col-sm-12">
                <Widget type="posts" amount={posts.length} />
              </div>
              <div className="col col-md-3 col-sm-12">
                <Widget type="groups" amount={groups.length} />
              </div>
            </div>
          </div>
          <div className="charts-container">
            {/* <Featured /> */}
            {/* <Chart /> */}
            <ContributionsProgress />
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
