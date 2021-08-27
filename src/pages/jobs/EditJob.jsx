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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchJobs, updateJob } from "../../actions/jobAction";
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";
import SweetAlert from "../../components/SweetAlert";

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

const EditJob = () => {
  const dispatch = useDispatch();
  const { isLoading, jobs, error, res } = useSelector((state) => state.jobs);
  const { token } = useSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();
  const { jid } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    price: 0,
    duration: 0,
  });
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");

  // fetch job details
  useEffect(() => {
    (async () => {
      await dispatch(fetchJobs({ jid }));
    })();
  }, [jid, dispatch]);

  // update job info
  useMemo(() => {
    if (jobs && jobs.length > 0) {
      setFormData({
        title: jobs[0]?.title || "",
        details: jobs[0]?.details || "",
        price: jobs[0]?.price || 0,
        duration: jobs[0]?.duration || 0,
      });

      setCategory(jobs[0]?.category || "");
      setSkills(jobs[0]?.skills || []);
    }
  }, [jobs]);

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
    }

    return () =>
      dispatch({
        type: "RESET_JOBS",
      });
  }, [res, dispatch]);

  // submit handler
  const submitHandler = async () => {
    if (!category || !skills) {
      return;
    }
    await dispatch(
      updateJob(
        jid,
        {
          ...formData,
          category,
          skills,
        },
        token
      )
    );
  };

  if (isLoading || !jobs || !jobs.length > 0) {
    return <Loading />;
  }

  return (
    <SiteLayout>
      <Container maxWidth="lg" component="section" className={classes.formContainer}>
        <Box my={3}>
          <Typography variant="h4" align="center">
            Update Job
          </Typography>
        </Box>

        {/* -------------------- form ------------------- */}
        <form onSubmit={submitHandler} className={classes.form}>
          <Box mb={3}>{error && <Alert severity="error">{error}</Alert>}</Box>

          <TextField
            label="Title"
            required
            variant="outlined"
            className={classes.formInput}
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          <TextField
            label="Details"
            required
            variant="outlined"
            multiline
            rows={6}
            className={classes.formInput}
            value={formData.details}
            onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
          />

          <TextField
            label="Price"
            required
            variant="outlined"
            type="number"
            className={classes.formInput}
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
          />

          <TextField
            label="Duration"
            required
            variant="outlined"
            type="number"
            className={classes.formInput}
            value={formData.duration}
            onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
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
    </SiteLayout>
  );
};

export default EditJob;
