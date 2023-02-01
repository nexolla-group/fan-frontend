import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Navbar } from "../../../Home/Components";
import { Paper, TableContainer, Box, Typography } from "@mui/material";
import axios from "axios";
import "./userTransactions.css";
import { Link } from "react-router-dom";

export default function UserTransactions() {
  const { token, id } = useSelector((state) => state.user);
  const [transactions, setTransacions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchTransactions = () => {
    setIsLoading(true);
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/transactions/?token=" + token
      )
      .then((res) => {
        setTransacions(res.data.transactions.filter((tx) => tx?.userId == id));
        setIsLoading(false);
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
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (item) => {
          return <>{new Date(item.row.createdAt).toLocaleDateString()}</>;
        },
      },
    ],
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalAmount = transactions.reduce(
    (sum, transaction) =>
      sum + (transaction.transactionStatus == "SUCCESS" && transaction.amount),
    0
  );
  return (
    <>
      <Navbar />
      <div className='container-fluid p-5'>
        <div className='row mb-3'>
          <div className='col col-md-6'>
            <Typography
              variant='h5'
              mb={2}
              sx={{ textAlign: "Left", fontWeight: 500 }}
            >
              Sunrise FC | Contribution History
            </Typography>
          </div>
          <div className='col col-md-6 text-end'>
            <div className='TransactionsCard'>
              <h2 className='TransactionsTitle'> Total Contributions Made</h2>
              <p className='TransactionsNumber'>{totalAmount} Rwf</p>
            </div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col col-md-6'>
            <form>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search...'
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
        </div>
        <TableContainer component={Paper} className='table'>
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

        <Link to='/printuserTransactions' target='blank'>
          <button className='btn btn-outline-secondary'>Print</button>
        </Link>
      </div>
    </>
  );
}
