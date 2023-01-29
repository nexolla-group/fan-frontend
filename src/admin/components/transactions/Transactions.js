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
import { useSelector } from "react-redux";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import Sidebar from "../sidebar/Sidebar";

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

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className='Home'>
      <Sidebar />
      <div className='homeContainer'>
        <AdminNavbar />
        <div className='tasks'>
          <div className='headt'>
            <h1>Transactions</h1>
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
                    <TableCell>TransactionId</TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      Amount|Rwf
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      senderName
                    </TableCell>

                    <TableCell
                      align='left'
                      style={{ padding: "10px 15px", fontSize: "16px" }}
                    >
                      group name
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
                      Status
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
                  {transactions.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "12px" }}
                      >
                        {row.transactionId}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row.senderName}
                      </TableCell>
                      <TableCell
                        align='left'
                        style={{ padding: "10px 15px", fontSize: "16px" }}
                      >
                        {row?.groupId?.groupName}
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
                        {row.transactionStatus}
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
