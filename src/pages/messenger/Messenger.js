import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroupsMessages } from "../../actions/messages";
import { handleAuthError } from "../../helpers";
import { Navbar } from "../../Home/Components";
import GroupMessages from "./group-messages";
import GroupsList from "./groups-list";
import "./messenger.css";
import "bootstrap/dist/css/bootstrap.css";
import userProfilePic from "../../assets/admin.jpg";
import InfoBar from "./infobar/InfoBar";
import Input from "./input/Input";
import ChatBox from "./Chatbox/ChatBox";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";

function Messenger() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [myGroups, setMygroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [weHaveGroups, setWeHaveGroups] = useState(true);

  const fetchMygroups = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/groups/?token=" + token)
      .then((res) => {
        if (res.data.groups.length === 0) {
          setIsLoading(false);
          setWeHaveGroups(false);
        } else {
          setIsLoading(false);
          setMygroups(res.data.groups);
        }
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  useEffect(() => {
    fetchMygroups();
    dispatch(fetchAllGroupsMessages());
  }, []);

  return (
    <>
      <Navbar />

      <div className='outerContainer'>
        <div className='groupList'>
          <h3>Joined Group Lists</h3>

          {isLoading ? (
            <>
              <p className='listGroup'>Please Wait...</p>
            </>
          ) : (
            <>
              {weHaveGroups ? (
                <GroupsList
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                  myGroups={myGroups}
                />
              ) : (
                <p className='listGroup bg-danger shadow fw-bold'>
                  <SentimentDissatisfiedOutlinedIcon />
                  You haven't joined any group yet!
                </p>
              )}
            </>
          )}
        </div>

        <div className='msgcontainer'>
          {selectedGroup.groupId && <InfoBar selectedGroup={selectedGroup} />}

          {/* <GroupMessages selectedGroup={selectedGroup} /> */}
          <ChatBox selectedGroup={selectedGroup} />
        </div>
      </div>
    </>
  );
}

export default Messenger;
