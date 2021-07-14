import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillDelete } from "react-icons/ai";

// styles
const useStyles = makeStyles((theme) => ({
  formContainer: {
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
  select: {
    width: "100%",
    marginBottom: 10,
  },
}));

// form schema
const schema = yup.object().shape({
  title: yup.string().max(50).required("required"),
  about: yup.string().required("required"),
  category: yup.string().required("required"),
  basicName: yup.string().required("required"),
  basicPrice: yup.number().min(300).required("required"),
  basicDeliveryTime: yup.number().min(1).max(30).required("required(1 - 30)"),
  standardName: yup.string().required("required"),
  standardPrice: yup.number().min(300).required("required"),
  standardDeliveryTime: yup
    .number()
    .min(1)
    .max(30)
    .required("required(1 - 30)"),
  premiumName: yup.string().required("required"),
  premiumPrice: yup.number().min(300).required("required"),
  premiumDeliveryTime: yup.number().min(1).max(30).required("required(1 - 30)"),
});

const AddService = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [basicFeatures, setBasicFeatures] = useState(null);
  const [standardFeatures, setStandardFeatures] = useState(null);
  const [premiumFeatures, setPremiumFeatures] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // submit hanlder
  const submitHandler = async (data) => {};

  return (
    <Container
      maxWidth="lg"
      component="section"
      className={classes.formContainer}
    >
      <Box mt={4}>
        <Typography variant="h4" align="center">
          Add a Service
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <TextField
          {...register("title")}
          label="Title"
          helperText={errors.title?.message}
          error={errors.title ? true : false}
          variant="outlined"
          className={classes.formInput}
        />
        <TextField
          {...register("about")}
          label="About"
          helperText={errors.about?.message}
          error={errors.about ? true : false}
          variant="outlined"
          multiline
          rows={6}
          className={classes.formInput}
        />
        <FormControl variant="outlined" className={classes.select}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            {...register("category")}
            helperText={errors.category?.message}
            error={errors.category ? true : false}
            labelId="category"
            label="Category"
            variant="outlined"
            className={classes.select}
          >
            <MenuItem value="web-developement">Web Developement</MenuItem>
            <MenuItem value="mobile-developement">Mobile Developement</MenuItem>
            <MenuItem value="graphics-design">Graphics Design</MenuItem>
          </Select>
        </FormControl>
        <Box width="100%">
          <Box mb={2}>
            <Typography align="center" variant="h6">
              Package - Basic
            </Typography>
          </Box>
          <TextField
            {...register("basicName")}
            label="Basic Name"
            helperText={errors.basicName?.message}
            error={errors.basicName ? true : false}
            variant="outlined"
            className={classes.formInput}
          />
          <TextField
            {...register("basicPrice")}
            label="Basic Price"
            helperText={errors.basicDeliveryTime?.message}
            error={errors.basicDeliveryTime ? true : false}
            variant="outlined"
            className={classes.formInput}
          />
        </Box>
      </form>
    </Container>
  );
};

export default AddService;
