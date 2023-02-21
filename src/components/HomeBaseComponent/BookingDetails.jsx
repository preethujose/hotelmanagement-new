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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function HotelList() {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem("userType"));
  const [filteredList,setFilteredList]=useState([])

  console.log("code", user?.code);
  const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));

  useEffect(() => {
    if (bookingDetails.length) {
      if (user?.code && user.userType==='Hotel-Admin') {
        let filteredList = bookingDetails.filter(
          (item) => item.hotelCode === user?.code
        );
        console.log("filteredList", filteredList);
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
  }, [bookingDetails]);
  console.log("bookingDetails", bookingDetails);
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
            {filteredList.map((row) => (
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
