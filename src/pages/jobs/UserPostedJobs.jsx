import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchJobs } from "../../actions/jobAction";
import SiteLayout from "../../components/layouts/SiteLayout";
import PostedJobsTab from "../../components/PostedJobsTab";

const UserPostedJobs = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  // fetch jobs
  useEffect(() => {
    (async () => {
      await dispatch(fetchJobs({ uid }));
    })();
    return async () => {
      await dispatch({
        type: "RESET_JOBS",
      });
    };
  }, [dispatch, uid]);

  // filter jobs
  let publicJobs;
  let activeJobs;
  let finishedJobs;
  let canceledJobs;
  if (jobs && jobs.length > 0 && !isLoading) {
    publicJobs = jobs.filter((job) => job.status === "public");
    activeJobs = jobs.filter((job) => job.status === "active");
    finishedJobs = jobs.filter((job) => job.status === "finished");
    canceledJobs = jobs.filter((job) => job.status === "canceled");
  }

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        <Box my={3}>
          <Typography variant="h4" align="center">
            Your Posted Jobs
          </Typography>
        </Box>

        <PostedJobsTab
          publicJobs={publicJobs}
          activeJobs={activeJobs}
          finishedJobs={finishedJobs}
          canceledJobs={canceledJobs}
        />
      </Container>
    </SiteLayout>
  );
};

export default UserPostedJobs;
