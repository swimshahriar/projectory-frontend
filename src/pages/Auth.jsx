import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

// actions
import {
  loginHandler,
  registerHandler,
  forgotPassHandler,
} from "../actions/authAction";

// components
import DialogModal from "../components/DialogModal";

// styles
const useStyles = makeStyles((theme) => ({
  authContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: "80%",

    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
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
  forgotPass: {
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.secondary.main,
    },
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
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  // grab state from auth state
  const { error, isLoading, res } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(isLoginMode ? schemaLog : schemaReg) });

  const submitHandler = async (data) => {
    if (isLoginMode) {
      await dispatch(loginHandler(data));
    } else {
      await dispatch(registerHandler(data));
    }

    if (token) {
      reset();
    }
  };

  return (
    <>
      <DialogModal
        open={open}
        setOpen={setOpen}
        title="Forgot Password"
        bodyText="Enter your email to get recovery link."
        body={
          <div>
            {error && (
              <Alert className={classes.errorText} severity="error">
                {error}
              </Alert>
            )}
            <TextField
              variant="outlined"
              label="Email"
              required={true}
              value={modalEmail}
              onChange={(e) => setModalEmail(e.target.value)}
            />
          </div>
        }
        actions={
          isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch({
                    type: "CLEAR_ERROR",
                  });
                  setOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={async () => {
                  dispatch({
                    type: "CLEAR_ERROR",
                  });
                  if (modalEmail !== "") {
                    await dispatch(forgotPassHandler(modalEmail));
                    if (!isLoading && !error) {
                      setModalEmail("");
                      setOpen(false);
                    }
                  }
                }}
              >
                Send
              </Button>
            </>
          )
        }
      />

      <Container maxWidth="xl" className={classes.authContainer}>
        <Typography variant="h4" align="center">
          {!isLoginMode ? "Register" : "Login"}
        </Typography>
        {res && (
          <Alert className={classes.errorText} severity="success">
            {res}
          </Alert>
        )}
        {error && (
          <Alert className={classes.errorText} severity="error">
            {error}
          </Alert>
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
          <Typography
            className={classes.forgotPass}
            variant="body1"
            color="textSecondary"
            onClick={() => {
              dispatch({
                type: "CLEAR_ERROR",
              });
              setOpen(true);
              setModalEmail("");
            }}
          >
            forgot password?
          </Typography>
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

        <Typography
          variant="body1"
          align="center"
          className={classes.lowerHalf}
        >
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <span>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setIsLoginMode((prev) => !prev);
                reset();
                dispatch({
                  type: "CLEAR_ERROR",
                });
              }}
            >
              {isLoginMode ? "Register" : "Login"}
            </Button>
          </span>
        </Typography>
      </Container>
    </>
  );
};

export default Auth;
