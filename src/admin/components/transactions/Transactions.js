import { Paper, TableContainer, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import Placehold from "../placeholder";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./userTransactions.css";

export default function Transactions({ isVisible, toggleVisibility }) {
  const { token } = useSelector((state) => state.user);
  const [transactions, setTransacions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [animation, setAnimation] = useState("");

  const fetchTransactions = () => {
    setIsLoading(true);
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/transactions/?token=" + token
      )
      .then((res) => {
        setTransacions(res.data.transactions);
        setIsLoading(false);
        setAnimation("animate");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  //search
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.transactionId
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      transaction.senderName
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      transaction.groupId?.groupName
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      transaction.telephoneNumber.toString().includes(searchInput) ||
      transaction.transactionStatus
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
  });

  const totalAmount = transactions.reduce(
    (sum, transaction) =>
      sum + (transaction.transactionStatus == "SUCCESS" && transaction.amount),
    0
  );

  const columns = useMemo(
    () => [
      { field: "transactionId", headerName: "transactionId", width: 200 },
      { field: "amount", headerName: "Amount|Rwf", width: 200 },
      { field: "senderName", headerName: "Sender Name", width: 200 },
      {
        field: "groupId.groupName",
        headerName: "Group Name",
        width: 200,
        renderCell: (item) => {
          return item.row.groupId?.groupName;
        },
      },
      { field: "telephoneNumber", headerName: "Telephone Number", width: 200 },
      {
        field: "transactionStatus",
        headerName: "Transaction Status",
        width: 200,
      },
      { field: "address", headerName: "Address", width: 200 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (item) => {
          return new Date(item.row.createdAt).toLocaleDateString();
        },
      },
    ],
    []
  );

  useEffect(() => {
    fetchTransactions();
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
                  Sunrise FC | Transactions
                </Typography>
              </div>
              <div className="col col-md-6 text-end">
                <Typography
                  mb={2}
                  sx={{ textAlign: "Left", fontWeight: 500 }}
                  variant="h5"
                  className={` ${animation}`}
                >
                  Total Contributions Made: {totalAmount} Rwf
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
                    rows={filteredTransactions}
                    columns={columns}
                    getRowId={(row) => row._id}
                  />
                </div>
              </Box>
            </TableContainer>

            <Link to="/printuserTransactions" target="blank">
              <button className="btn btn-outline-secondary">Print</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
