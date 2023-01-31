import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Navbar } from "../../../Home/Components";
import { Paper, TableContainer, Box, Typography } from "@mui/material";
import axios from "axios";

export default function UserTransactions() {
  const { token, username } = useSelector((state) => state.user);
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
          return item.row?.groupId?.groupName;
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
      <Navbar />
      <div className='container-fluid p-5'>
        <div className='row'>
          <div className='col col-md-6'>
            <Typography
              variant='h5'
              mb={2}
              sx={{ textAlign: "Left", fontWeight: 500 }}
            >
              My Contribution History
            </Typography>
          </div>
          <div className='col col-md-6 text-end'>
            {" "}
            <Typography
              variant='h5'
              mb={2}
              sx={{ textAlign: "Right", fontWeight: 500 }}
            >
              Total Contributions Made:
            </Typography>
          </div>
        </div>
        <TableContainer component={Paper} className='table'>
          <Box sx={{ width: "100%" }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={transactions}
                columns={columns}
                getRowId={(row) => row._id}
              />
            </div>
          </Box>
        </TableContainer>
      </div>
    </>
  );
}
