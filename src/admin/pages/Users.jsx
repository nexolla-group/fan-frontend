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
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "../components/adminNavbar/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/users/all")
      .then((res) => {
        setUsers(res.data.data);
        console.log("user response", res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className='Home'>
      <Sidebar />
      <div className='homeContainer'>
        <AdminNavbar />
        <div className='tasks'>
          <div className='headt'>
            <h1>Users</h1>
          </div>
          <div className='bodyt'>
            <div className='bodyt-header'>
              <div className='leftHeader'></div>
              <div className='rightHeader'>####</div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>profile</TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      full name
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Username
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      email
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      telephoneNumber
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      role
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Address
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      created Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row, i) => (
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
                        {row?.profilePicture}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.fullName}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.username}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.telephoneNumber}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.role}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.address}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
