import React from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// styles
const useStyles = makeStyles(() => ({
  authContainer: {
    marginTop: 50,
    width: "50%",
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
}));

// form schema
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().min(6).required(),
});

const Auth = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xl" className={classes.authContainer}>
      <Typography variant="h4" align="center">
        Register
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <TextField
          {...register("firstName")}
          label="First Name"
          helperText="required"
          variant="outlined"
          className={classes.formInput}
        />

        <TextField
          {...register("lastName")}
          label="Last Name"
          helperText="required"
          variant="outlined"
          className={classes.formInput}
        />

        <TextField
          {...register("email")}
          label="Email"
          helperText="required"
          variant="outlined"
          className={classes.formInput}
        />
        <TextField
          {...register("password")}
          type="password"
          label="Password"
          helperText="min length 6"
          variant="outlined"
          className={classes.formInput}
        />
        <TextField
          {...register("confirmPassword")}
          type="password"
          label="Confirm password"
          helperText="retype your pass"
          variant="outlined"
          className={classes.formInput}
        />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => handleSubmit(submitHandler)}
        >
          Register
        </Button>
      </form>

      <Typography align="center">
        Already have an account? <Typography variant="span">login</Typography>
      </Typography>
    </Container>
  );
};

export default Auth;
