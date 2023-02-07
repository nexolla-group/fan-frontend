import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AdminNavbar from "../components/adminNavbar/AdminNavbar";
import Sidebar from "../components/sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function Users({ isVisible, toggleVisibility }) {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [animation, setAnimation] = useState("");

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

  //search
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const columns = useMemo(
    () => [
      { field: "profilePicture", headerName: "profile", width: 200 },
      { field: "fullName", headerName: "full name", width: 200 },
      { field: "username", headerName: " Username", width: 200 },
      {
        field: "email",
        headerName: "email",
        width: 200,
      },
      { field: "telephoneNumber", headerName: "telephoneNumber", width: 200 },
      {
        field: "role",
        headerName: "role",
        width: 200,
      },
      { field: "address", headerName: "Address", width: 200 },
      {
        field: "createdAt",
        headerName: "Joined Date",
        width: 200,
        renderCell: (item) => {
          return new Date(item.row.createdAt).toLocaleDateString();
        },
      },
    ],
    []
  );

  const filteredTUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.telephoneNumber.toString().includes(searchInput) ||
      user.createdAt.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="Home">
        {isVisible && <Sidebar />}
        <div className="homeContainer">
          <AdminNavbar toggleVisibility={toggleVisibility} />
          <div className="container-fluid p-5">
            <div className="row mb-3">
              <div className="col col-md-6">
                <Typography
                  variant="h5"
                  mb={2}
                  sx={{ textAlign: "Left", fontWeight: 500 }}
                  className={`${animation}`}
                >
                  Sunrise FC | Joined Users
                </Typography>
              </div>
              <div className="col col-md-6 text-end">
                <Typography
                  mb={2}
                  sx={{ textAlign: "Left", fontWeight: 500 }}
                  variant="h5"
                  className={` ${animation}`}
                >
                  Total Joined Users: {users.length}
                </Typography>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col col-md-6">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                </form>
              </div>
            </div>
            <TableContainer component={Paper} className={`table ${animation}`}>
              <Box sx={{ width: "100%" }}>
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    rows={filteredTUsers}
                    columns={columns}
                    getRowId={(row) => row._id}
                  />
                </div>
              </Box>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}
