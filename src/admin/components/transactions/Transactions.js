import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

const transactionStatusCellRenderer = (params) => {
  let color;
  if (params.value === "FAILED") {
    color = "red";
  } else if (params.value === "PENDING") {
    color = "yellow";
  } else if (params.value === "SUCCESS") {
    color = "green";
  }

  return (
    <div style={{ backgroundColor: color, color: "white", padding: "8px" }}>
      {params.value}
    </div>
  );
};

export default function Transactions() {
  const { token } = useSelector((state) => state.user);
  const [transactions, setTransacions] = useState([]);

  const fetchTransactions = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/transactions/?token=" + token
      )
      .then((res) => {
        setTransacions(res.data.transactions);
        console.log("Transactions", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = useMemo(
    () => [
      { field: "transactionId", headerName: "TransactionId", width: 200 },
      { field: "amount", headerName: "Amount|Rwf", width: 200 },
      { field: "senderName", headerName: "Sender Name", width: 200 },
      { field: "groupId.groupName", headerName: "Group Name", width: 200 },
      { field: "telephoneNumber", headerName: "Telephone Number", width: 200 },
      {
        field: "transactionStatus",
        headerName: "Transaction Status",
        width: 200,
        cellRenderer: transactionStatusCellRenderer("transactionStatus"),
      },
      { field: "address", headerName: "Address", width: 200 },
      { field: "createdAt", headerName: "Created At", width: 200 },
    ],
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="Home">
        <Sidebar />
        <div className="homeContainer">
          <AdminNavbar />
          <div className="tasks">
            <div className="headt">
              <Typography
                variant="h3"
                component="h3"
                sx={{ textAlign: "center", mt: 3, mb: 3 }}
              >
                Manage Transactions
              </Typography>
            </div>
            <div className="bodyt">
              <div className="bodyt-header">
                <div className="leftHeader"></div>
                <div className="rightHeader">####</div>
              </div>
              <TableContainer component={Paper}>
                <Box sx={{ height: 400, width: "100%" }}>
                  <div style={{ height: 300, width: "100%" }}>
                    <DataGrid
                      rows={transactions}
                      columns={columns}
                      getRowId={(row) => row._id}
                    />
                  </div>
                </Box>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
