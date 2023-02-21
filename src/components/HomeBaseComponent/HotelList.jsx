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
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelData } from "../../Data/HotelData";
import { useDispatch, useSelector } from "react-redux";
import { StoreHotelList, StoreSelectedHotel } from "../store/Actions/action";

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
    minHeight: "500px",
    minWidth: "500px",
  },
}));

export default function HotelList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
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
  const [toastData,setToastData]=useState('')

  const userType =JSON.parse(sessionStorage.getItem('userType'))
  const hotelList = useSelector((state) => state.user.list);
  console.log("hotelList", hotelList);
  const deleteStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  useEffect(() => {
    setData(hotelList);
  }, [hotelList]);

  function handleChange(event) {
    setLocation(event.target.value);
    filterLocation(event.target.value);
  }
  function filterLocation(location) {
    console.log("location", location);
    if (!location) setData(HotelData);
    else {
      let filteredList = HotelData.filter((item) => {
        return item.Location === location;
      });
      setData(filteredList);
      console.log("filteredList", filteredList);
    }
  }
  function handleSearch(event) {
    setSearchedName(event.target.value);
    console.log("filteredList handleSearch ", event.target.value);
    let query = event.target.value;
    let filteredList = HotelData.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    console.log("filteredList", filteredList);
    // Trigger render with updated values
    setData(filteredList);
  }

  function onClickHotel(id) {
    console.log("hotelId", id);
    dispatch(StoreSelectedHotel(id));
  }
  function onClickDelete(index) {
    let hotelList = [...data];
    hotelList.splice(index, 1);
    console.log("hotelList", hotelList);
    setData(hotelList);
    dispatch(StoreHotelList(hotelList));
    setIsAdded(true);
    setToastData('Deleted successfully')
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
    console.log("listHotel", listHotel);
    dispatch(StoreHotelList(listHotel));
    setIsAdded(true);
    setToastData('Added successfully')

    setOpenDialog(false)
  }
  console.log("newData", newData);
  return (
    <Grid>
      <Grid>
        <h1>Hotel List</h1>
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
          className={classes.TextField}
          label="Name"
          onChange={handleSearch}
          value={searchedName}
          name="code"
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
          {data.length &&
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
                        />
                      </ListItemText>
                    </ListItem>
                  ) : null}
                </ListItem>
              );
            })}
        </List>
      </Box>
      <Dialog
        className={classes.dialog}
        open={openDialog}
        // onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
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
              label="Description"
              variant="outlined"
              name="description"
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
            color="primary"
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
        onClose={()=>setIsAdded(false)}
        message={toastData}
        autoHideDuration={1000}
      />
    </Grid>
  );
}
