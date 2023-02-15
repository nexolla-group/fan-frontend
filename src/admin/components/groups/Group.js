import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toastMessage } from "../../../helpers";
import AddGroup from "../adminNavbar/addgroup/AddGroup";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import EditGroup from "../editGroup/EditGroup";
import GroupChat from "../groupChat/GroupChat";
import Sidebar from "../sidebar/Sidebar";
import "./group.css";

const Groups = ({ isVisible, toggleVisibility }) => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});

  const [groups, setGroups] = useState([]);
  const { token } = useSelector((state) => state.user);
  const [groupToEdit, setGroupToEdit] = useState([]);
  const fetchGroups = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/groups/?token=" + token)
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleOpenEdit = (id) => {
    setOpenEdit(true);
  };
  const handleOpenAdd = () => {
    setOpen(true);
  };
  const handleDeleteGroup = (id) => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          "/api/groups/" +
          id +
          "/?token=" +
          token
      )
      .then((res) => {
        toastMessage("success", "group deleted!");
        fetchGroups();
        // setGroups(groups.filter((item) => item.groupDetails._id != id));
      })
      .catch((error) => console.log(error));
  };

  console.log("jjjj:", groups);
  return (
    <div className='Home'>
      {isVisible && <Sidebar />}
      <div className='homeContainer'>
        <AdminNavbar toggleVisibility={toggleVisibility} />
        <div className='tasks'>
          <div className='headt'>
            <h1>Groups</h1>
          </div>
          <div className='bodyt'>
            <div className='bodyt-header'>
              <div className='leftHeader'>
                Create new Group
                <div className='addIcon' onClick={handleOpenAdd}>
                  <Add />
                </div>
              </div>
              <div className='rightHeader'>{`${groups.length} Groups`}</div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Targeted Amount
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Target Reached
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      created Date
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                        onClick={() => {
                          handleOpenChat();
                          setSelectedGroup(row);
                        }}
                        data-toggle='tooltip'
                        data-placement='right'
                        title='Click to Get Conversation'
                      >
                        {row?.groupDetails?.groupName}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.groupDetails?.description}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.groupDetails?.target}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.groupDetails?.targetReached}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        <Edit
                          onClick={() => {
                            handleOpenEdit();
                            setGroupToEdit(row);
                          }}
                        />
                        <Delete
                          onClick={() =>
                            handleDeleteGroup(row.groupDetails._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <AddGroup open={open} setOpen={setOpen} fetchGroups={fetchGroups} />
            <EditGroup
              open={openEdit}
              setOpen={setOpenEdit}
              group={groupToEdit}
              fetchGroups={fetchGroups}
            />
            <GroupChat
              openChat={openChat}
              setOpenChat={setOpenChat}
              selectedGroup={selectedGroup}
              fetchGroups={fetchGroups}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Groups;
