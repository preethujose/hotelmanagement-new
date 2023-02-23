import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/redux-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    border: "1px solid #ee82ea",
    background: "#ebefef",
  },
  head: {
    fontSize: "24px",
    color: "#b533b5",
  },
  listItem: {
    color: "#b600ff",
  },
  chip: {
    backgroundColor: "#44ad44",
    fontSize: "18px",
  },
  TextField: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  dialog: {
    minWidth: "500px",
  },
  h1: {
    color: "#e916e9",
  },
  date: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function HotelDetailsComponent() {
  const hotelInfo = useAppSelector((state) => state.user);
  const classes = useStyles();

  const [selectedhotel, setSelectedHotel] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [toastMsg, setToastmsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [days, setDays] = useState(null);
  const [totalAmt, setTotalAmt] = useState(null);
  const [list, setList] = useState(
    sessionStorage.getItem("bookingDetails")
      ? JSON.parse(sessionStorage.getItem("bookingDetails"))
      : []
  );
  const dispatch = useAppDispatch();
  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  };
  const user = JSON.parse(sessionStorage.getItem("userType"));

  useEffect(() => {
    let list = hotelInfo.list;
    let filteredList = list.filter((item) => item.code === hotelInfo.hotelId);
    setSelectedHotel(filteredList[0]);
  }, [hotelInfo]);

  useEffect(() => {
    if (bookingData.checkinDate && bookingData.checkoutDate) {
      let date1 = bookingData.checkinDate.split("T")[0];
      let date2 = bookingData.checkoutDate.split("T")[0];
      let days = getNumberOfDays(date1, date2);
      setDays(days);
    }
  }, [bookingData]);

  useEffect(() => {
    let total = days * selectedhotel?.amount * bookingData.number;
    setTotalAmt(total);
  }, [days, bookingData]);

  function handleChange(event) {
    setBookingData((bookingData) => ({
      ...bookingData,
      [event.target.name]: event.target.value,
    }));
  }

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  function onClickBook() {
    setShowDialog(true);
  }

  function onSubmitBooking() {
    let bookedData = {
      ...bookingData,
      ["hotelCode"]: selectedhotel.code,
      ["hotelName"]: selectedhotel.name,
      ["userName"]: user.userName,
      ["total"]: totalAmt,
    };
    let bookingList = [...list];
    bookingList.push(bookedData);
    sessionStorage.setItem("bookingDetails", JSON.stringify(bookingList));
    setToastmsg("Booking completed successfully");
    setShowToast(true);
    setShowDialog(false);
  }
  return (
    <Grid direction="column" justifyContent="center" alignItems="center">
      <h1 className={classes.h1}>Hotel Details</h1>
      <Grid container xs={12} justifyContent="center" alignItems="center">
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom className={classes.head}>
              {selectedhotel?.name}
            </Typography>
            <Typography>{selectedhotel?.address}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <Typography variant="h6">Phone:{selectedhotel?.contact}</Typography>
            <Chip
              className={classes.chip}
              label={`${selectedhotel?.amount}/day`}
              size="large"
            />
          </CardContent>
          {/* </CardActionArea> */}
          {user.userType === "User" ? (
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={onClickBook}
              >
                Book Now
              </Button>
            </CardActions>
          ) : null}
        </Card>
      </Grid>
      <Dialog
        className={classes.dialog}
        open={showDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move", backgroundColor: "#3f51b5", color: "white" }}
        >
          Booking Details
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <form>
            <TextField
              className={classes.TextField}
              // style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              name="name"
            />
            <br />

            <TextField
              className={classes.TextField}
              type="text"
              label="address"
              variant="outlined"
              multiline
              name="address"
              rows={2}
              onChange={handleChange}
            />
            <br />

            <TextField
              className={classes.TextField}
              type="number"
              label="Number of Rooms"
              variant="outlined"
              name="number"
              onChange={handleChange}
            />
            <br />
            <TextField
              id="datetime-local"
              label="check-in date and time"
              type="datetime-local"
              variant="outlined"
              // defaultValue="2017-05-24T10:30"
              className={classes.date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              name="checkinDate"
            />
            <br />
            <TextField
              id="datetime-local"
              label="check-out date and time"
              type="datetime-local"
              variant="outlined"
              // defaultValue="2017-05-24T10:30"
              className={classes.date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              name="checkoutDate"
            />
            <br />
            {days ? (
              <TextField
                className={classes.TextField}
                type="number"
                label="Number of Days"
                // variant="outlined"
                name="days"
                disabled
                value="2"
                onChange={handleChange}
              />
            ) : null}

            <Typography>Total Amount</Typography>
            {totalAmt ? (
              <Chip
                className={classes.chip}
                label={`${totalAmt}`}
                size="large"
              />
            ) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setShowDialog(!showDialog)}
            color="primary"
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={onSubmitBooking}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity="success"
        open={showToast}
        onClose={() => setShowToast(false)}
        message={toastMsg}
        autoHideDuration={1000}
      />
    </Grid>
  );
}
