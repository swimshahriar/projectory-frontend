import { Box, Button, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// internal imports
import { fetchSkillTests } from "../../actions/skillTestAction";
import Loading from "../../components/Loading";
import QuestionWithOptions from "../../components/QuestionWithOptions";

const TestPage = () => {
  const { tid } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, skillTests, error } = useSelector((state) => state.skillTest);
  const [answers, setAnswers] = useState([]);

  // ---------------------- fetch test details ------------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchSkillTests({ tid }, token));
    })();

    return () =>
      dispatch({
        type: "RESET_SKILLTEST",
      });
  }, [dispatch, tid, token]);

  // -------------------- handle submit ----------------
  const handleSubmit = () => {
    // formating data
    const finalAns = {};
    for (let i = 0; i < answers.length; i += 1) {
      const [qnum, ans] = answers[i];
      finalAns[qnum] = ans;
    }
    console.log(finalAns);
  };

  if (isLoading || !skillTests) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      {error && (
        <Box my={3}>
          <Typography variant="h6" align="center">
            {error}
          </Typography>
        </Box>
      )}

      <Box my={3}>
        <Typography variant="h4" align="center">
          {skillTests?.title}
        </Typography>
      </Box>

      {/* --------------------- timer ------------------ */}
      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Timer:
        </Typography>
        <Box>timer component</Box>
      </Box>

      {/* ---------------- questions with options -------------- */}
      <Box my={3}>
        <Typography variant="h5" gutterBottom>
          Questions:
        </Typography>
        <Box display="flex" flexDirection="column" gridGap={15} mt={3}>
          {skillTests?.questions &&
            Object.keys(skillTests.questions).map((ques) => (
              <QuestionWithOptions
                key={ques}
                qnum={ques}
                question={skillTests.questions[ques]}
                options={skillTests.options[ques]}
                setAnswers={setAnswers}
              />
            ))}
        </Box>
      </Box>

      {/* ----------------- submit btn ------------------ */}
      <Box my={3} display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default TestPage;
