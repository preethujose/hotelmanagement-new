import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HotelData } from "../../Data/HotelData";
import { useDispatch, useSelector } from "react-redux";
import { StoreHotelList, StoreSelectedHotel } from "../store/Actions/action";
import { useAppDispatch, useAppSelector } from "../store/redux-hooks";

const useStyles = makeStyles((theme) => ({
  TextField: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  formControl: {
    minWidth: 200,
  },
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  name: {
    fontSize: "15px",
    color: "#9b2e7e",
  },
  location: {
    fontSize: "10px",
    margin: "10px",
  },
  listItem: {
    backgroundColor: "#e7e7ef",
    height: "50px",
    padding: "10px",
  },
  dialog: {
    // minHeight: "500px",
    minWidth: "500px",
  },
}));

export default function HotelList() {

  const hotelList = sessionStorage.getItem("hotelList")
  ? JSON.parse(sessionStorage.getItem("hotelList"))
  : HotelData;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [data, setData] = useState(hotelList);
  const [location, setLocation] = useState("");
  const locationList = [
    "Kozhikode",
    "Munnar",
    "Thrissur",
    "Kochi",
    "Trivandrum",
    "Kannur",
  ];
  const [searchedName, setSearchedName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newData, setNewData] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [toastData, setToastData] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const selectedIndex = useRef(null);
  const userType = JSON.parse(sessionStorage.getItem("userType"));
  // const hotelList = useAppSelector((state) => state.user.list);
  // sessionStorage.setItem('hotelList',JSON.stringify(HotelData) )

  const deleteStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };
  dispatch(StoreHotelList(hotelList));

  
  // useEffect(() => {
  //  if(hotelList.length)
  //   console.log("hotelList", hotelList);
  //   setData(hotelList);
  // }, []);

  function handleChange(event) {
    setLocation(event.target.value);
    filterLocation(event.target.value);
  }
  function filterLocation(location) {
    if (!location) setData(hotelList);
    else {
      console.log('hotelList',hotelList)
      let filteredList = hotelList.filter((item) => {
        return item.Location.toLowerCase() === location.toLowerCase();
      });
    console.log('filteredList',filteredList)

      setData(filteredList);
    }
  }
  function handleSearch(event) {
    setSearchedName(event.target.value);
    let query = event.target.value;
    let filteredList = hotelList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setData(filteredList);
  }

  function onClickHotel(id) {
    console.log("onClickHotel", id);
    dispatch(StoreSelectedHotel(id));
  }
  function confirmDelete() {
    let hotelList = [...data];
    hotelList.splice(selectedIndex.current, 1);
    setData(hotelList);
    sessionStorage.setItem("hotelList", JSON.stringify(hotelList));

    dispatch(StoreHotelList(hotelList));
    setIsAdded(true);
    setToastData("Deleted successfully");
  }
  function onClickDelete(index) {
    setShowConfirm(true);
    selectedIndex.current = index;
  }

  function onChangeData(event) {
    setNewData((newData) => ({
      ...newData,
      [event.target.name]: event.target.value,
    }));
  }

  function onClickAdd() {
    let listHotel = [...data];
    listHotel.push(newData);
    dispatch(StoreHotelList(listHotel));
    sessionStorage.setItem("hotelList", JSON.stringify(listHotel));
    setIsAdded(true);
    setToastData("Added successfully");

    setOpenDialog(false);
  }
  // sessionStorage.setItem('hotelList',JSON.stringify(HotelData) )

  return (
    <Grid>
      <Grid>
        <h1 data-testid="listhead">HOTEL LIST</h1>
        {userType && userType.userType === "Admin" ? (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => setOpenDialog(!openDialog)}
          >
            Add Hotels
          </Button>
        ) : null}
      </Grid>
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <TextField
          type="text"
          className={classes.TextField}
          label="Search by Name"
          onChange={handleSearch}
          value={searchedName}
          data-testid="search"
        ></TextField>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Filter By Location
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={location}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {locationList.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      <Box>
        <List className={classes.root}>
          {data.length ?
            data.map((item, index) => {
              return (
                <ListItem button onClick={() => onClickHotel(item.code)}>
                  <ListItem component={Link} to="/home/hoteldetails">
                    <ListItemText className={classes.listItem}>
                      <span className={classes.name}>{item.name}</span>{" "}
                      <span className={classes.location}>{item.Location}</span>
                    </ListItemText>
                  </ListItem>

                  {/* <ListItemText className={classes.listItem}>{item.Location}</ListItemText> */}
                  {userType && userType.userType === "Admin" ? (
                    <ListItem style={{ width: "20px" }}>
                      <ListItemText style={deleteStyle}>
                        <Delete
                          color="secondary"
                          onClick={() => onClickDelete(index)}
                          // onClick={()=>setShowConfirm(true)}
                        />
                      </ListItemText>
                    </ListItem>
                  ) : null}
                </ListItem>
              )
             
            })
            :
            <Typography variant="h6" style={{padding:'20px',color:'red'}}>No data Found</Typography>
          }
        </List>
      </Box>
      <Dialog
        className={classes.dialog}
        open={openDialog}
        // onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move", backgroundColor: "#3f51b5", color: "white" }}
          id="draggable-dialog-title"
        >
          ADD HOTELS
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <form>
            <TextField
              className={classes.TextField}
              // style={{ width: "200px", margin: "5px" }}
              type="text"
              label="Hotel Code"
              variant="outlined"
              onChange={onChangeData}
            />
            <br />
            <TextField
              className={classes.TextField}
              // style={{ width: "200px", margin: "5px" }}
              type="text"
              label="name"
              variant="outlined"
              name="name"
              onChange={onChangeData}
            />
            <br />
            <TextField
              className={classes.TextField}
              type="text"
              label="location"
              variant="outlined"
              name="Location"
              onChange={onChangeData}
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
              onChange={onChangeData}
            />
            <br />
            <TextField
              className={classes.TextField}
              type="text"
              label="Contact"
              variant="outlined"
              name="contact"
              onChange={onChangeData}
            />
            <br />
            <TextField
              className={classes.TextField}
              type="number"
              label="amount"
              variant="outlined"
              name="amount"
              onChange={onChangeData}
            />
            <br />
            <TextField
              className={classes.TextField}
              type="text"
              multiline
              label="Description"
              variant="outlined"
              name="description"
              rows={3}
              onChange={onChangeData}
            />
            <br />

            {/* <Button variant="contained" color="primary">
              save
            </Button> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setOpenDialog(!openDialog)}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={onClickAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        severity="success"
        open={isAdded}
        onClose={() => setIsAdded(false)}
        message={toastData}
        autoHideDuration={1000}
      />
      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog">Confirm the action</DialogTitle>
        <DialogContent>Do you really wants to delete the data</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setShowConfirm(false)}
            color="secondary"
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowConfirm(false);
              confirmDelete();
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
