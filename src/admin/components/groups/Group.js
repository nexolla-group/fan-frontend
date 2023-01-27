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
import AddGroup from "../adminNavbar/addgroup/AddGroup";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import EditModal from "../editModal/EditModal";
import Sidebar from "../sidebar/Sidebar";
import "./group.css";

export default function () {
  const [open, setOpen] = React.useState(false);
  const [groups, setGroups] = useState([]);
  const { token } = useSelector((state) => state.user);
  const fetchGroups = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/groups/all?token=" + token)
      .then((res) => {
        setGroups(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  const handleOpen = (id) => {
    console.log(id);
  };
  const handleOpenAdd = () => {
    setOpen(true);
  };
  return (
    <div className="Home">
      <Sidebar />
      <div className="homeContainer">
        <AdminNavbar />
        <div className="tasks">
          <div className="headt">
            <h1>Groups</h1>
          </div>
          <div className="bodyt">
            <div className="bodyt-header">
              <div className="leftHeader">
                Create new Group
                <div className="addIcon" onClick={handleOpenAdd}>
                  <Add />
                </div>
              </div>
              <div className="rightHeader">{`${groups.length} Groups`}</div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Group Name</TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Targeted Amount
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Target Reached
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      created Date
                    </TableCell>
                    <TableCell
                      align="left"
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
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.groupName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.description}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.target}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.targetReached}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        <Edit onClick={() => handleOpen(row)} /> <Delete />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <AddGroup open={open} setOpen={setOpen} fetchGroups={fetchGroups} />
          </div>
        </div>
      </div>
    </div>
  );
}
