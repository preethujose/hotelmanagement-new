import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#b94ffb",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function HotelList() {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem("userType"));
  const [filteredList,setFilteredList]=useState([])

  const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));

  useEffect(() => {
    if (bookingDetails && bookingDetails.length) {
      if (user?.code && user.userType==='Hotel-Admin') {
        let filteredList = bookingDetails.filter(
          (item) => item.hotelCode === user?.code
        );
        setFilteredList(filteredList)
      }
      else if(user.userType==='User'){
        let filteredList = bookingDetails.filter(
          (item) => item.userName === user?.userName
        );
        setFilteredList(filteredList)
      }
      else
      setFilteredList(bookingDetails)

    }
  }, [bookingDetails, user?.code, user?.userName, user.userType]);
  return (
    <Grid>
      <div className="hotel">
        <h1>BOOKING DETAILS</h1>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{user.userType==='Hotel-Admin'?'Name':'Hotel Name'}</StyledTableCell>
              <StyledTableCell align="right">Check-in Date</StyledTableCell>
              <StyledTableCell align="right">Check-out Date</StyledTableCell>
              <StyledTableCell align="right">
                Number of Rooms Booked
              </StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList && filteredList.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {user.userType==='Hotel-Admin'?row.name:row.hotelName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.checkinDate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.checkoutDate}
                </StyledTableCell>
                <StyledTableCell align="right">{row.number}</StyledTableCell>
                <StyledTableCell align="right">{row.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
