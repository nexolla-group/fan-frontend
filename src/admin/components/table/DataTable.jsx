import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//dammy data

const DataTable = () => {
  function createData(firstname, lastname, email, phone, amountPayed, status) {
    return { firstname, lastname, email, phone, amountPayed, status };
  }
  const rows = [
    createData(
      "Joel",
      "KWIHANGANA",
      "Joelkwijoe@gmail.com",
      "0723245237",
      7500,
      "pending"
    ),
    createData(
      "John",
      "BICAMUMPAKA",
      "john@gmail.com",
      "0723245236",
      7500,
      "success"
    ),
    createData("Yvone", "HANNA", "Hannah@gmail.com", "079845237", 7500, "fail"),
  ];
  return (
    <TableContainer component={Paper} className="Table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">first name</TableCell>
            <TableCell className="tableCell">last name</TableCell>
            <TableCell className="tableCell">email</TableCell>
            <TableCell className="tableCell">phone</TableCell>
            <TableCell className="tableCell">amountPayed</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="tableCell">{row.firstname}</TableCell>
              <TableCell className="tableCell">{row.lastname}</TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.phone}</TableCell>
              <TableCell className="tableCell">{row.amountPayed}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
