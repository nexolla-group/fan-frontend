import React from "react";
import AdminNavbar from "../components/adminNavbar/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";

const Posts = () => {
  return (
    <div className='Home'>
      <Sidebar />
      <div className='homeContainer'>
        <AdminNavbar />
        posts
      </div>
    </div>
  );
};

export default Posts;
