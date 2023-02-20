import { AppBar, CssBaseline, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
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
export default function MenuComponent() {
    const classes = useStyles();

  return (
    <AppBar position="static">
    <CssBaseline />
    <Toolbar>
      <Typography variant="h4" className={classes.logo}>
        Hotel Management
      </Typography>
        <div className={classes.navlinks}>
          <Link to="/home/list" className={classes.link}>
            Hotel List
          </Link>
          <Link to="/home/bookingdetails" className={classes.link}>
            Booking Details
          </Link>
          {/* <Link to="/contact" className={classes.link}>
            Contact
          </Link>
          <Link to="/faq" className={classes.link}>
            FAQ
          </Link> */}
        </div>
    </Toolbar>
  </AppBar>
  )
}
