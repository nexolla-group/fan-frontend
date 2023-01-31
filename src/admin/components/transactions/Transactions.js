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
import Placehold from "../placeholder";
import Sidebar from "../sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = () => {
    setIsLoading(true);
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/transactions/?token=" + token
      )
      .then((res) => {
        setTransacions(res.data.transactions);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const columns = useMemo(
    () => [
      { field: "transactionId", headerName: "TransactionId", width: 200 },
      { field: "amount", headerName: "Amount|Rwf", width: 200 },
      { field: "senderName", headerName: "Sender Name", width: 200 },
      {
        field: "groupId.groupName",
        headerName: "Group Name",
        width: 200,
        renderCell: (item) => {
          return item.row.groupId.groupName;
        },
      },
      { field: "telephoneNumber", headerName: "Telephone Number", width: 200 },
      {
        field: "transactionStatus",
        headerName: "Transaction Status",
        width: 200,
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
      <div className='Home'>
        <Sidebar />
        <div className='homeContainer'>
          <AdminNavbar />
          <div className='tasks'>
            <div className='headt'>
              <Typography
                variant='h3'
                component='h3'
                sx={{ textAlign: "center", mt: 3, mb: 3 }}
              >
                Manage Transactions
              </Typography>
            </div>
            <div className='bodyt'>
              <div className='bodyt-header'>
                <div className='leftHeader'></div>
                <div className='rightHeader'>####</div>
              </div>
              <TableContainer component={Paper}>
<<<<<<< HEAD
                <Box sx={{ height: 600, width: "100%" }}>
                  <div style={{ height: 500, width: "100%" }}>
=======
                <Box sx={{ width: "100%" }}>
                  <div style={{ height: 400, width: "100%" }}>
>>>>>>> 4132487e3ca1ea9e5961af795789bcbc6ca3393b
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
