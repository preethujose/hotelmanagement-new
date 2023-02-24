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
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/redux-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    border: "3px solid #ee82ea",
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
  const [errorBooking, setErrorBooking] = useState({});
  const dispatch = useAppDispatch();
  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  };
  const user = JSON.parse(sessionStorage.getItem("userType"));

  useEffect(() => {
    let list = hotelInfo.list;
    console.log("list", list);
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
    console.log("diffInDays", diffInDays);

    return diffInDays;
  }

  function onClickBook() {
    setShowDialog(true);
  }

  function onSubmitBooking() {
    let err = {};
    let invalid = false;
    if (!bookingData.name) {
      err.name = "Please fill this field";
      console.log("err", err);
      setErrorBooking(err);
      invalid = true;
    }
    if (!bookingData.address) {
      err.address = "Please fill this field";
      console.log("err", err);
      setErrorBooking(err);
      invalid = true;
    }
    if (!bookingData.number) {
      err.number = "Please fill this field";
      console.log("err", err);
      setErrorBooking(err);
      invalid = true;
    }
    if (!bookingData.checkinDate) {
      err.checkinDate = "Please fill this field";
      console.log("err", err);
      setErrorBooking(err);
      invalid = true;
    }
    if (!bookingData.checkoutDate) {
      err.checkoutDate = "Please fill this field";
      console.log("err", err);
      setErrorBooking(err);
      invalid = true;
    }

    if (!invalid) {
      console.log('invalid',invalid)
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
            <Typography style={{ padding: "10px" }}>
              {selectedhotel?.address}
            </Typography>
            <Typography
              style={{ padding: "10px", wordBreak: "break-word" }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {selectedhotel?.description}
            </Typography>
            <Typography style={{ padding: "5px" }} variant="h6">
              Phone:{selectedhotel?.contact}
            </Typography>
            <Chip
              style={{ padding: "10px" }}
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
              error={errorBooking && errorBooking.name}
              helperText={errorBooking.name ? errorBooking.name : null}
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
              error={errorBooking && errorBooking.address}
              helperText={errorBooking.address ? errorBooking.address : null}
            />
            <br />

            <TextField
              className={classes.TextField}
              type="number"
              label="Number of Rooms"
              variant="outlined"
              name="number"
              onChange={handleChange}
              error={errorBooking && errorBooking.number}
              helperText={errorBooking.number ? errorBooking.number : null}
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
              error={errorBooking && errorBooking.checkinDate}
              helperText={
                errorBooking.checkinDate ? errorBooking.checkinDate : null
              }
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
              error={errorBooking && errorBooking.checkoutDate}
              helperText={
                errorBooking.checkoutDate ? errorBooking.checkoutDate : null
              }
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
                value={days}
                onChange={handleChange}
              />
            ) : null}

            <Typography variant="h6">Total Amount</Typography>
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
            onClick={() => {setShowDialog(!showDialog); setErrorBooking({})}}
            variant="contained"
            color="secondary"
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
