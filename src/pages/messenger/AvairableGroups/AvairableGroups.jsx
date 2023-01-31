import React, { useState } from "react";
import { Navbar } from "../../../Home/Components";
import "./avaibaleGroups.scss";

import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { errorHandler, toastMessage } from "../../../helpers";

const AvairableGroups = () => {
  const [groups, setGroup] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState([]);
  const { token, id } = useSelector((state) => state.user);
  const [joining, setJoining] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoinedGroup = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/groups/?token=" + token)
      .then((res) => {
        setJoinedGroup(res.data.groups);
      })
      .catch((error) => console.log(error));
  };

  const fetchGroup = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/groups/all/?token=" + token
      )
      .then((res) => {
        setIsLoading(true);
        setGroup(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchGroup();
    fetchJoinedGroup();
  }, []);

  const handleJoinGroup = (gId) => {
    setJoining(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/groupParticipants/join", {
        groupId: gId,
        userId: id,
        token,
      })
      .then((res) => {
        toastMessage("success", res.data.msg);
        setJoining(false);
        fetchJoinedGroup();
      })
      .catch((error) => {
        setJoining(false);
        errorHandler(error);
      });
  };
  const handleLeaveTheGroup = (gId) => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          "/api/groupParticipants/leave/" +
          gId +
          "?token=" +
          token
      )
      .then((res) => {
        toastMessage("success", res.data.msg);
        fetchJoinedGroup();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        {isLoading ? (
          <>
            <div className="wrapper">
              <div className="header">
                <h1 className="header__title">List of available groups</h1>
                <h2 className="header__subtitle text-dark ">
                  Join the group and start collaboration
                </h2>
              </div>
              <div className="cards">
                {groups.map((group, i) => (
                  <div className=" card" key={i}>
                    <div className="card__inner groupDesc p-4 d-block ">
                      <span className="d-block">{group.groupName}</span>
                      {joinedGroup.find(
                        (item) => item.groupId === group._id
                      ) ? (
                        <>
                          <button
                            onClick={() => handleLeaveTheGroup(group._id)}
                            className="btn mt-4 btn-warning"
                          >
                            Leave the group
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary mt-4"
                            role="button"
                            onClick={() => handleJoinGroup(group._id)}
                          >
                            {joining ? "Joining..." : "Join Group"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="wait-container">
              <div className="wait-animation"></div>
              <div className="wait-text">Please Wait</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AvairableGroups;
