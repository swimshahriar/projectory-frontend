import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { loginHandler, registerHandler } from "../actions/authAction";

// styles
const useStyles = makeStyles(() => ({
  authContainer: {
    marginTop: 50,
    width: "50%",
  },
  errorText: {
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      marginTop: 20,
    },
  },
  formInput: {
    marginBottom: 20,
    width: "100%",
  },
  lowerHalf: {
    marginTop: 20,

    "& button": {
      marginLeft: 15,
    },
  },
}));

// form schema
const schemaReg = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  userName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  password: yup.string().min(6).required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match!")
    .required("required"),
});

const schemaLog = yup.object().shape({
  email: yup.string().email().required("required"),
  password: yup.string().min(6).required("required"),
});

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(isLoginMode ? schemaLog : schemaReg) });

  const submitHandler = async (data) => {
    if (isLoginMode) {
      await dispatch(loginHandler(data));
      reset();
    } else {
      await dispatch(registerHandler(data));
      reset();
    }
  };

  // grab error from state
  const { error, isLoading } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="xl" className={classes.authContainer}>
      <Typography variant="h4" align="center">
        {!isLoginMode ? "Register" : "Login"}
      </Typography>
      {error && (
        <Typography
          className={classes.errorText}
          variant="body1"
          color="secondary"
          align="center"
        >
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        {!isLoginMode ? (
          <>
            <TextField
              {...register("firstName")}
              label="First Name"
              helperText={errors.firstName?.message}
              error={errors.firstName ? true : false}
              variant="outlined"
              className={classes.formInput}
            />

            <TextField
              {...register("lastName")}
              label="Last Name"
              helperText={errors.lastName?.message}
              error={errors.lastName ? true : false}
              variant="outlined"
              className={classes.formInput}
            />

            <TextField
              {...register("userName")}
              label="User Name"
              helperText={errors.userName?.message}
              error={errors.userName ? true : false}
              variant="outlined"
              className={classes.formInput}
            />

            <TextField
              {...register("email")}
              label="Email"
              helperText={errors.email?.message}
              error={errors.email ? true : false}
              variant="outlined"
              className={classes.formInput}
            />

            <TextField
              {...register("password")}
              type="password"
              label="Password"
              helperText={errors.password?.message}
              error={errors.password ? true : false}
              variant="outlined"
              className={classes.formInput}
            />

            <TextField
              {...register("confirmPassword")}
              type="password"
              label="Confirm password"
              helperText={errors.confirmPassword?.message}
              error={errors.confirmPassword ? true : false}
              variant="outlined"
              className={classes.formInput}
            />
          </>
        ) : (
          <>
            <TextField
              {...register("email")}
              label="Email"
              helperText={errors.email?.message}
              error={errors.email ? true : false}
              variant="outlined"
              className={classes.formInput}
            />

            <TextField
              {...register("password")}
              type="password"
              label="Password"
              helperText={errors.password?.message}
              error={errors.password ? true : false}
              variant="outlined"
              className={classes.formInput}
            />
          </>
        )}
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleSubmit(submitHandler)}
          >
            {!isLoginMode ? "Register" : "Login"}
          </Button>
        )}
      </form>

      <Typography variant="body1" align="center" className={classes.lowerHalf}>
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        <span>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setIsLoginMode((prev) => !prev);
              reset();
            }}
          >
            {isLoginMode ? "Register" : "Login"}
          </Button>
        </span>
      </Typography>
    </Container>
  );
};

export default Auth;
