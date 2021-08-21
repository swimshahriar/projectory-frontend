import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchSkillTestResults, fetchSkillTests } from "../../actions/skillTestAction";

const SkillTestList = () => {
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);

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
      <Box my={3}>
        <Typography variant="h4" align="center">
          Skill Tests
        </Typography>
      </Box>

      <Box my={3}>
        <Typography variant="h4" align="center">
          Your Results
        </Typography>
      </Box>
    </Container>
  );
};

export default SkillTestList;
