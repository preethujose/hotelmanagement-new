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
  Container,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useAppDispatch } from "../store/redux-hooks";

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
  error: {
    color: "red",
  },
  h1: {
    color: "#e916e9",
  },
  Paper: {
    border: "2px solid #e916e9",
    width: "80%",
  },
}));
const LoginPage = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");
  const [errorObj, setErrorObj] = useState({});
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleChange = (event) => {
    setUserDetails((userDetails) => ({
      ...userDetails,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "userType") {
      setUserType(event.target.value);
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
    let err = {};
    let invalid = false;
    if (!userDetails.userName) {
      err.userName = "Please fill user name";
      console.log("err", err);
      setErrorObj(err);
      invalid = true;
    }
    if (!userDetails.userType) {
      err.userType = "Please select user type";
      setErrorObj(err);
      invalid = true;
    }
    // if (!userDetails || !userDetails.userName || !userDetails.userType) {
    //   setError("please fill all the field");
    // }
    if (userType === "Hotel-Admin" && !userDetails.code) {
      err.code = "please enter hotel code";
      setErrorObj(err);
      invalid = true;
    }
    if (userType === "User" && !UserList.users.includes(userDetails.userName)) {
      setError("User does not exist");
      invalid = true;
    }
    if (
      userType === "Admin" &&
      !UserList.admin.includes(userDetails.userName)
    ) {
      setError("User does not exist");
      invalid = true;
    }
    if (!invalid) {
      // dispatch(StoreUserDetails(userDetails));
      sessionStorage.setItem("userType", JSON.stringify(userDetails));
      props.history.push("/home/list");
      setErrorObj({})
      setError('')
    }
  }

 

  console.log("errorObj", errorObj);
  return (
    <div style={{ padding: 30 }}>
      <Grid>
        <h1 data-testid="head" className={classes.h1}>
          Login
        </h1>
      </Grid>
      <Container fixed style={{ display: "flex", justifyContent: "center" }}>
        <Paper className={classes.Paper}>
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
                data-testid="Username"
                error={errorObj && errorObj.userName}
                helperText={errorObj.userName ? errorObj.userName : null}
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
                  data-testid="userType"
                  error={errorObj && errorObj.userType}
                >
                  <MenuItem data-testid="Admin" value="Admin">
                    Admin
                  </MenuItem>
                  <MenuItem data-testid="role-user" value="User">
                    User
                  </MenuItem>
                  <MenuItem value="Hotel-Admin">Hotel-Admin</MenuItem>
                </Select>
                <FormHelperText error>
                  {errorObj.userType ? errorObj.userType : null}
                </FormHelperText>
              </FormControl>
            </Grid>
            {userType === "Hotel-Admin" ? (
              <Grid item xs={12}>
                <TextField
                  required
                  label="Please enter hotel code"
                  className={classes.textField}
                  name="code"
                  onChange={handleChange}
                  error={errorObj && errorObj.code}
                  helperText={errorObj.code ? errorObj.code : null}
                ></TextField>
              </Grid>
            ) : null}
            {error ? (
              <Typography className={classes.error}>{error}</Typography>
            ) : null}

            <Grid item xs={12}>
              <Button
                color="primary"
                data-testid="button"
                variant="contained"
                onClick={onClickLogin}
                style={{ marginBottom: "10px" }}
              >
                {" "}
                Login{" "}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default withRouter(LoginPage);
