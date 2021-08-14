import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// internal imports
import { createJob } from "../actions/jobAction";
import SweetAlert from "../components/SweetAlert";

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
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

// form schema
const schema = yup.object().shape({
  title: yup.string().max(100).required("required"),
  details: yup.string().required("required"),
  price: yup.number().min(300).required("required"),
  duration: yup.number().required("required"),
});

const AddJob = () => {
  const dispatch = useDispatch();
  const { isLoading, error, res } = useSelector((state) => state.jobs);
  const { token } = useSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useMemo(() => {
    if (res) {
      SweetAlert.fire({
        icon: "success",
        title: "Success",
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-left",
        toast: true,
        showConfirmButton: false,
      });
      reset();
      setCategory("");
      setSkills([]);

      setTimeout(() => {
        history.push("/user-posted-jobs");
      }, 2500);
    }

    return () =>
      dispatch({
        type: "RESET_JOBS",
      });
  }, [res, history, reset, dispatch]);

  // submit handler
  const submitHandler = async (data) => {
    if (!category || !skills) {
      return;
    }
    await dispatch(
      createJob(
        {
          ...data,
          category,
          skills,
        },
        token
      )
    );
  };

  return (
    <Container maxWidth="lg" component="section" className={classes.formContainer}>
      <Box my={3}>
        <Typography variant="h4" align="center">
          Add a Job
        </Typography>
      </Box>

      {/* -------------------- form ------------------- */}
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Box mb={3}>{error && <Alert severity="error">{error}</Alert>}</Box>

        <TextField
          {...register("title")}
          label="Title"
          helperText={errors.title?.message}
          error={!!errors.title}
          variant="outlined"
          className={classes.formInput}
        />
        <TextField
          {...register("details")}
          label="Details"
          helperText={errors.details?.message}
          error={!!errors.details}
          variant="outlined"
          multiline
          rows={6}
          className={classes.formInput}
        />

        <TextField
          {...register("price")}
          label="Price"
          helperText={errors.price?.message}
          error={!!errors.price}
          variant="outlined"
          type="number"
          className={classes.formInput}
        />

        <TextField
          {...register("duration")}
          label="Duration"
          helperText={errors.duration?.message}
          error={!!errors.duration}
          variant="outlined"
          type="number"
          className={classes.formInput}
        />

        <FormControl variant="outlined" className={classes.select}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={classes.select}
          >
            <MenuItem value="web-development">Web Development</MenuItem>
            <MenuItem value="mobile-development">Mobile Development</MenuItem>
            <MenuItem value="graphics-designing">Graphics Designing</MenuItem>
            <MenuItem value="seo">SEO</MenuItem>
            <MenuItem value="digital-marketing">Digital Marketing</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <TextField
            label="Skills"
            variant="outlined"
            className={classes.formInput}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <Box ml={2} mb={5}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (skill !== "") {
                  setSkills((prev) => [...prev, skill]);
                  setSkill("");
                }
              }}
            >
              Add
            </Button>
          </Box>
        </Box>

        {/* ---------------------- skill list ----------------------- */}
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
          gridGap={10}
        >
          {skills?.length > 0 &&
            skills.map((skill, idx) => (
              <Chip
                key={idx}
                label={skill}
                color={idx % 2 === 0 ? "primary" : "secondary"}
                onDelete={() => {
                  setSkills(skills.filter((item) => item !== skill));
                }}
              />
            ))}
        </Box>

        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        )}
      </form>
    </Container>
  );
};

export default AddJob;
