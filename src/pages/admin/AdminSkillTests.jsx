import { Box, Button, CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { fetchSkillTests } from "../../actions/skillTestAction";
import AdminLayout from "../../components/layouts/AdminLayout";
import SkillTestCard from "../../components/SkillTestCard";

const AdminSkillTests = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);
  const { skillTests, isLoading } = useSelector((state) => state.skillTest);

  useEffect(() => {
    (async () => {
      await dispatch(fetchSkillTests({}, token));
    })();
    return () =>
      dispatch({
        type: "RESET_SKILLTEST",
      });
  }, [token, dispatch]);

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box my={2}>
          <Typography variant="h5" align="center">
            Skill Tests ({skillTests?.length || 0})
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => history.push("/admin/add-skill-test")}
          >
            Add New
          </Button>
        </Box>

        <Box
          my={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gridGap={10}
        >
          {isLoading && <CircularProgress color="primary" />}
          {skillTests?.map ? (
            skillTests?.map((test, idx) => <SkillTestCard key={idx} skillTest={test} admin />)
          ) : (
            <Typography align="center">No Tests added yet!</Typography>
          )}
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminSkillTests;
