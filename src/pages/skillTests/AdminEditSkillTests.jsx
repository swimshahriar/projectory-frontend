import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchSkillTests, updateSkillTest } from "../../actions/skillTestAction";
import AdminLayout from "../../components/layouts/AdminLayout";
import SweetAlert from "../../components/SweetAlert";

// styles
const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: "1rem auto",
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

const AdminEditSkillTests = () => {
  const classes = useStyles();
  const { tid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, skillTests, res } = useSelector((state) => state.skillTest);
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    duration: 0,
  });
  const [questions, setQuestions] = useState({});
  const [option, setOption] = useState("");
  const [options, setOptions] = useState({});
  const [answers, setAnswers] = useState({});

  // ------------------- fetch test info --------------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchSkillTests({ tid }, token));
    })();
    return () => {
      dispatch({
        type: "RESET_SKILLTEST",
      });
    };
  }, [dispatch, tid, token]);

  // --------------------- update skill test states ----------------
  useEffect(() => {
    if (skillTests) {
      setFormData({
        title: skillTests?.title || "",
        about: skillTests?.about || "",
        duration: skillTests?.duration || 0,
      });
      setQuestions(skillTests?.questions || {});
      setOptions(skillTests?.options || {});
      setAnswers(skillTests?.answers || {});
    }
  }, [skillTests]);

  // -------------------- submit handler -----------------------
  const submitHandler = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      questions,
      options,
      answers,
    };
    await dispatch(updateSkillTest(tid, finalData, token));

    if (res) {
      SweetAlert.fire({
        icon: "success",
        title: "Success",
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-right",
        toast: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => history.push("/admin/skill-test")}
        >
          <AiOutlineArrowLeft /> Go Back
        </Button>
        <Box my={2}>
          <Typography variant="h5" align="center">
            Edit Skill Tests
          </Typography>
        </Box>

        {isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* ----------------------------- form -------------------------- */}
        <Box className={classes.formContainer}>
          <form onSubmit={submitHandler} className={classes.form}>
            <TextField
              label="Title"
              required
              variant="outlined"
              className={classes.formInput}
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />

            <TextField
              label="About"
              required
              variant="outlined"
              multiline
              rows={5}
              className={classes.formInput}
              value={formData.about}
              onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
            />

            <TextField
              type="number"
              label="Duration(mins.)"
              required
              variant="outlined"
              className={classes.formInput}
              value={formData.duration}
              onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
            />
            {/* ----------------------- questions, options, answers ---------------- */}
            {questions &&
              Object.keys(questions).map((quesNum) => (
                <Box key={quesNum} width="100%" my={2}>
                  <TextField
                    label={`Questions ${quesNum}`}
                    required
                    variant="outlined"
                    className={classes.formInput}
                    value={questions[quesNum]}
                    onChange={(e) =>
                      setQuestions((prev) => ({ ...prev, [quesNum]: e.target.value }))
                    }
                  />
                  <Box>
                    <TextField
                      label="Enter Options"
                      variant="outlined"
                      className={classes.formInput}
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <Box display="flex" justifyContent="center" mt={-2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          if (option !== "") {
                            options[quesNum].push(option);
                            setOption("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      flexWrap="wrap"
                      gridGap={10}
                      my={2}
                    >
                      {options &&
                        options[quesNum].map((op, idx) => (
                          <Chip
                            key={idx}
                            variant="outlined"
                            color={idx % 2 === 0 ? "primary" : "secondary"}
                            label={op}
                            onDelete={() => {
                              setOptions((prev) => ({
                                ...prev,
                                [quesNum]: options[quesNum].filter((opt) => opt !== op),
                              }));
                            }}
                          />
                        ))}
                    </Box>
                  </Box>
                </Box>
              ))}

            {!isLoading ? (
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </form>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminEditSkillTests;
