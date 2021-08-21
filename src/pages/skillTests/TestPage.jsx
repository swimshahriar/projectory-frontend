import { Box, Button, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchSkillTests, giveSkillTest } from "../../actions/skillTestAction";
import Loading from "../../components/Loading";
import QuestionWithOptions from "../../components/QuestionWithOptions";
import SweetAlert from "../../components/SweetAlert";
import TestTimer from "../../components/TestTimer";

const TestPage = () => {
  const { tid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, skillTests, error, res } = useSelector((state) => state.skillTest);
  const [answers, setAnswers] = useState([]);
  const [isTimeFinish, setIsTimeFinish] = useState(false);

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
  const handleSubmit = async () => {
    // formating data
    const finalAns = {};
    for (let i = 0; i < answers.length; i += 1) {
      const [qnum, ans] = answers[i];
      finalAns[qnum] = ans;
    }
    await dispatch(giveSkillTest(finalAns, token, tid));
    setTimeout(() => {
      SweetAlert.fire({
        icon: "success",
        title: "Success",
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-left",
        toast: true,
        showConfirmButton: false,
      });
      history.push("/skill-tests");
    }, 1000);
  };

  // --------------- time finish -> handle submit --------------

  if (isTimeFinish) {
    handleSubmit();
  }

  if (isLoading || !skillTests) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" position="relative">
      {error && (
        <Box my={3}>
          <Typography variant="h6" align="center" color="secondary">
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
      <Box position="fixed" right={20} bottom={20}>
        <TestTimer time={skillTests?.duration} setIsTimeFinish={setIsTimeFinish} />
      </Box>

      {/* ---------------- questions with options -------------- */}
      <Box my={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          my={3}
        >
          <Typography variant="h5" gutterBottom>
            Questions: {skillTests?.questions && Object.keys(skillTests.questions).length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Time: {skillTests?.duration} mins.
          </Typography>
        </Box>

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
