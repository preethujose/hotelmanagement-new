import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookingDetails from "./BookingDetails";
import HotelDetailsComponent from "./HotelDetailsComponent";
import HotelList from "./HotelList";
import MenuComponent from "./MenuComponent";
import { HotelData } from "../../Data/HotelData";
import { StoreHotelList } from "../store/Actions/action";
import { useAppDispatch } from "../store/redux-hooks";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));
export default function HomeComponent() {
  // const user = useSelector((state) => state.user.userDetails)
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <MenuComponent />

        <Grid>
          <Switch>
            <Route path="/home/list" component={HotelList} />
            <Route
              path="/home/hoteldetails"
              component={HotelDetailsComponent}
            />

            <Route path="/home/bookingdetails" component={BookingDetails} />
          </Switch>
        </Grid>
      </div>
    </>
  );
}
