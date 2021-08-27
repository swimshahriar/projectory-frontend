import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchSkillTestResults, fetchSkillTests } from "../../actions/skillTestAction";
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";
import SkillTestCard from "../../components/SkillTestCard";
import TestResultCard from "../../components/TestResultCard";

const SkillTestList = () => {
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);
  const { skillTests, testResults, isLoading } = useSelector((state) => state.skillTest);

  // fetch available skill tests
  useEffect(() => {
    (async () => {
      await dispatch(fetchSkillTests({}, token));
      await dispatch(fetchSkillTestResults({ uid }, token));
    })();

    return () =>
      dispatch({
        type: "RESET_SKILLTEST",
      });
  }, [dispatch, token, uid]);

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        {/* ----------------------- skill tests list -------------------- */}
        <Box my={3}>
          <Typography variant="h4" align="center">
            Skill Tests
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gridGap={15}
        >
          {isLoading && !skillTests && <Loading />}
          {skillTests?.length ? (
            skillTests?.map((skillTest, idx) => <SkillTestCard skillTest={skillTest} key={idx} />)
          ) : (
            <Typography>No skill tests found!</Typography>
          )}
        </Box>

        {/* ---------------------- test results ------------------------- */}
        <Box mt={5} mb={3}>
          <Typography variant="h4" align="center">
            Your Results
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gridGap={15}
        >
          {isLoading && !testResults && <Loading />}
          {testResults ? (
            testResults.map((result, idx) => <TestResultCard result={result} key={idx} />)
          ) : (
            <Typography>You do not have any results!</Typography>
          )}
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default SkillTestList;
