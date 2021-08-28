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
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { addSkillTest } from "../../actions/skillTestAction";
import AdminLayout from "../../components/layouts/AdminLayout";

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

const AdminAddSkillTest = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, res, error } = useSelector((state) => state.skillTest);
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    duration: 0,
  });
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [newOptions, setNewOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState({});
  const [options, setOptions] = useState({});
  const [answers, setAnswers] = useState({});
  const [counter, setCounter] = useState(1);

  // --------------------- handle question submit ------------------
  const handleQuestionSubmit = () => {
    if (question === "" || newOptions?.length <= 0 || answer === "") {
    } else {
      setQuestions((prev) => (prev ? { ...prev, [counter]: question } : { [counter]: question }));
      setOptions((prev) => (prev ? { ...prev, [counter]: newOptions } : { [counter]: newOptions }));
      setAnswers((prev) => (prev ? { ...prev, [counter]: answer } : { [counter]: answer }));
      setQuestion("");
      setOption("");
      setNewOptions([]);
      setAnswer("");
      setCounter((prev) => prev + 1);
    }
  };

  // -------------------- submit handler -----------------------
  const submitHandler = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      questions,
      options,
      answers,
    };
    await dispatch(addSkillTest(finalData, token));
    history.push("/admin/skill-test");
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
            Add New Test
          </Typography>
        </Box>

        {/* ----------------------------- form -------------------------- */}
        <Box className={classes.formContainer}>
          {error && (
            <Alert color="error" variant="outlined">
              {error}
            </Alert>
          )}
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
            {/* ------------------- add new questions, options, answers ---------------- */}
            <Box width="100%" border={2} p={2} my={2} borderColor="secondary.main" borderRadius={5}>
              <TextField
                label="Question"
                variant="outlined"
                className={classes.formInput}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
                        setNewOptions((prev) => (prev ? [...prev, option] : [option]));
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
                  {newOptions &&
                    newOptions.map((op, idx) => (
                      <Chip
                        key={idx}
                        variant="outlined"
                        color={idx % 2 === 0 ? "primary" : "secondary"}
                        label={op}
                        onDelete={() => {
                          setNewOptions(newOptions.filter((opt) => opt !== op));
                        }}
                      />
                    ))}
                </Box>
              </Box>
              <TextField
                label="Answer"
                variant="outlined"
                className={classes.formInput}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="outlined" color="primary" onClick={handleQuestionSubmit}>
                  Add question
                </Button>
              </Box>
            </Box>

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
                Save New Test
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

export default AdminAddSkillTest;
