import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
// actions
import { forgotPassHandler, resetPassHandler } from "../actions/authAction";
// components
import DialogModal from "../components/DialogModal";

// styles
const useStyles = makeStyles((theme) => ({
  authContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: "80%",

    [theme.breakpoints.up("md")]: {
      width: "50%",
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
  lowerHalf: {
    marginTop: 20,

    "& button": {
      marginLeft: 15,
    },
  },
}));

// form schema
const schema = yup.object().shape({
  password: yup.string().min(6).required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match!")
    .required("required"),
});

const ResetPass = () => {
  const { token } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");

  // grab state from auth state
  const { error, isLoading, res } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = async (data) => {
    const reqBody = { ...data, token };
    await dispatch(resetPassHandler(reqBody));
    reset();
  };

  if (res) {
    setTimeout(() => {
      dispatch({
        type: "CLEAR_RES",
      });

      history.push("/auth");
    }, 2000);
  }

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
              required
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
          Reset Password
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
          <TextField
            {...register("password")}
            type="password"
            label="New Password"
            helperText={errors.password?.message}
            error={!!errors.password}
            variant="outlined"
            className={classes.formInput}
          />
          <TextField
            {...register("confirmPassword")}
            type="password"
            label="Confirm password"
            helperText={errors.confirmPassword?.message}
            error={!!errors.confirmPassword}
            variant="outlined"
            className={classes.formInput}
          />

          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleSubmit(submitHandler)}
            >
              Reset
            </Button>
          )}
        </form>
        <Typography variant="body1" align="center" className={classes.lowerHalf}>
          Invalid or expired token?{" "}
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              dispatch({
                type: "CLEAR_ERROR",
              });
              setOpen(true);
              setModalEmail("");
            }}
          >
            New token
          </Button>
        </Typography>
      </Container>
    </>
  );
};

export default ResetPass;
