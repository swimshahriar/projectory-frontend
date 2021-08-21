import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchSkillTestResults, fetchSkillTests } from "../../actions/skillTestAction";
import Loading from "../../components/Loading";
import SkillTestCard from "../../components/SkillTestCard";

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
    <Container maxWidth="lg">
      {/* ----------------------- skill tests list -------------------- */}
      <Box my={3}>
        <Typography variant="h4" align="center">
          Skill Tests
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" gridGap={15}>
        {isLoading && !skillTests ? (
          <Loading />
        ) : (
          skillTests?.map((skillTest, idx) => <SkillTestCard skillTest={skillTest} key={idx} />)
        )}
      </Box>

      {/* ---------------------- test results ------------------------- */}
      <Box my={3}>
        <Typography variant="h4" align="center">
          Your Results
        </Typography>
      </Box>
      <Box>{isLoading && !testResults && <Loading />}</Box>
    </Container>
  );
};

export default SkillTestList;
