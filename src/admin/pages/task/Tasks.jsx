import React, { useState } from "react";
import "./task.css";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Sidebar from "../../components/sidebar/Sidebar";

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
import { useEffect } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import EditModal from "../../components/editModal/EditModal";

const Tasks = () => {
  const [target, setTarget] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const fetchTarget = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/tasks")
      .then((res) => {
        setTarget(res.data.data);
      })
      .catch((error) => console.log("target errors", error));
  };

  useEffect(() => {
    fetchTarget();
  }, []);

  const handleOpen = (row) => {
    setSelectedItem(row);
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className='Home'>
      <Sidebar />
      <div className='homeContainer'>
        <AdminNavbar />
        <div className='tasks'>
          <div className='headt'>
            <h1>Target</h1>
          </div>
          <div className='bodyt'>
            <div className='bodyt-header'>
              <div className='leftHeader'>
                Create new task
                <div className='addIcon'>
                  <Add />
                </div>
              </div>
              <div className='rightHeader'>####</div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Task title</TableCell>
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
                      Balance
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Maximum Amount
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Current percentage
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Deadline
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
                  {target.map((row, i) => (
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
                      >
                        {row.taskTitle}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.taskDescription}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.balance}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.maximumAmount}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.currentPercent}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {new Date(row.taskDeadline).toLocaleDateString()}
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
                        <Edit onClick={() => handleOpen(row)} /> <Delete />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <EditModal
              target={target}
              open={open}
              setOpen={setOpen}
              selectedItem={selectedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
