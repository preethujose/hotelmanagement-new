import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { UserList } from "../../Data/UserList";

import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { StoreUserDetails } from "../store/Actions/action";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: 200,
  },
  error:{
    color:'red'
  }
}));
const LoginPage = (props) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const[userType,setUserType]=useState('')
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setUserDetails(userDetails => ({ ...userDetails, [event.target.name]: event.target.value }));

    // let details = {};
    // if (event.target.name === "userName") {
    //   if (event.target.value !== "") {
    //     details = {
    //       ...userDetails,
    //       name: event.target.value,
    //     };
    //   }
    // }
    if (event.target.name === "userType") {
      setUserType(event.target.value,)
      // details = {
      //   ...userDetails,
      //   type: event.target.value,
      // };
    }
    // if (event.target.name === "code") {
    //   details = {
    //     ...userDetails,
    //     code: event.target.value,
    //   };
    // }
    // console.log("details", details);
    // setUserDetails(details);
  };

  function onClickLogin() {
    if (!userDetails || !userDetails.userName || !userDetails.userType) {
      console.log("please fill all the field");
      setError("please fill all the field");
    } 
    else if(userType==='Hotel-Admin' && !userDetails.code){
      setError("please enter hotel code");

    }
   else if(userType==='User' && !(UserList.users.includes(userDetails.userName))){
      setError("user not exist");
    }
   else if(userType==='Admin' && !(UserList.admin.includes(userDetails.userName))){
      setError("user not exist");
    }
    else {
      dispatch(StoreUserDetails(userDetails));
      sessionStorage.setItem('userType',userDetails.userType)
      props.history.push("/home/list");
    }
  }
  console.log("userDetails", userDetails);
  return (
    <div style={{ padding: 30 }}>
      <Toolbar>
        <Typography>Login</Typography>
      </Toolbar>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              required
              label="Username"
              className={classes.textField}
              name="userName"
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type={"password"}
              className={classes.textField}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="userType"
                //   value={age}
                onChange={handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Hotel-Admin">Hotel-Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {
            userType==='Hotel-Admin'?
            <Grid item xs={12}>
            <TextField
              required
              label="Please enter hotel code"
              className={classes.textField}
              name="code"
              onChange={handleChange}
            ></TextField>
          </Grid>
          :
          null
          }
            {error ? <Typography className={classes.error}>{error}</Typography> : null}
         
          <Grid item xs={12}>
            <Button color="primary" variant="contained" onClick={onClickLogin}>
              {" "}
              Login{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withRouter(LoginPage);
