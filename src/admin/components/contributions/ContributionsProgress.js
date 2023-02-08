import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { errorHandler } from "../../../helpers";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import Featured from "../featuresChart/Featured";
import Sidebar from "../sidebar/Sidebar";

export default function ContributionsProgress() {
  const { token } = useSelector((state) => state.user);
  const [group, setGroup] = useState([]);

  const fetchGroups = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/groups/all?token=" + token)
      .then((res) => {
        setGroup(res.data.data);
      })

      .catch((error) => {
        errorHandler(error);
      });
  };

  useEffect(() => {
    fetchGroups();
  }, [group]);

  return (
    <div className='Home' style={{ width: "100%" }}>
      <div className='homeContainer'>
        <div className='body'>
          <div className='row'>
            {group.map((item) => (
              <div className='col col-lg-4 col-md-4 col-sm-12'>
                <Featured group={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
