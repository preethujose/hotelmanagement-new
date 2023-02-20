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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { StoreBookingDetails } from "../store/Actions/action";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    border: '1px solid #ee82ea',
    background: '#ebefef'
  },
  head:{
    fontSize:'24px',
    color:'#b533b5'
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
}));

export default function HotelDetailsComponent() {
  const hotelInfo = useSelector((state) => state.user);
  const classes = useStyles();

  const [selectedhotel, setSelectedHotel] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const[toastMsg,setToastmsg]=useState('')
  const[showToast,setShowToast]=useState(false)
  const [list,setList]=useState(sessionStorage.getItem('bookingDetails')?JSON.parse(sessionStorage.getItem('bookingDetails')):[])
  const dispatch=useDispatch()
  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  };

  useEffect(() => {
    let list = hotelInfo.list;
    let filteredList = list.filter((item) => item.code === hotelInfo.hotelId);
    setSelectedHotel(filteredList[0]);
    console.log("filteredList", filteredList);
  }, [hotelInfo]);

  function handleChange(event) {
    let dateFrom = "";
    let dateTo = "";

    setBookingData((bookingData) => ({
      ...bookingData,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "checkinDate") {
      dateFrom =event.target.value.split("T")[0];
      console.log("dateFrom", dateFrom);
    }
    if (event.target.name === "checkoutDate") {
      dateTo = event.target.value.split('T');
    }
    let date_1 = Date.parse(dateFrom);
    let date_2 = Date.parse(dateTo);
    const startDate = moment(date_1);
    const timeEnd = moment(date_2);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    console.log("days", diffDuration.days());
  }

  function onClickBook() {
    setShowDialog(true);
  }

  function onSubmitBooking(){
    console.log('bookingListbookingList',list)
    let bookedData={...bookingData,['hotelCode']:selectedhotel.code}
    let bookingList=[...list]
    bookingList.push(bookedData)
    console.log('bookedData',bookingList)
    dispatch(StoreBookingDetails(bookingList))
    sessionStorage.setItem('bookingDetails',JSON.stringify(bookingList))
    setToastmsg('Booking completed successfully')
    setShowToast(true)
    setShowDialog(false)
  }
  console.log("bookingData", bookingData);
  return (
    <Grid direction="column" justifyContent="center" alignItems="center">
      <h1>Hotel Details</h1>
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
            {/* <List style={flexContainer} className={classes.listItem}>
            {
                selectedhotel?.facilities.map((item)=>{return <ListItem>{item}</ListItem>})
            }
            </List> */}
            <Chip
              className={classes.chip}
              label={`${selectedhotel?.amount}/day`}
              size="large"
            />
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={onClickBook}
            >
              Book Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        className={classes.dialog}
        open={showDialog}
        // onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
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
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              name="checkinDate"
            />
            <TextField
              id="datetime-local"
              label="check-out date and time"
              type="datetime-local"
              variant="outlined"
              // defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              name="checkoutDate"
            />
            <br />
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
            <br />

            <Typography>Total Amount</Typography>

            <Chip
              className={classes.chip}
              label={`${selectedhotel?.amount}`}
              size="large"
            />
            {/* <Button variant="contained" color="primary">
              save
            </Button> */}
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
        onClose={()=>setShowToast(false)}
        message={toastMsg}
        autoHideDuration={1000}
      />
    </Grid>
  );
}
