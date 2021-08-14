import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../actions/jobAction";
// internal imports
import PostedJobsTab from "../components/PostedJobsTab";

const UserPostedJobs = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  // fetch jobs
  useEffect(() => {
    (async () => {
      await dispatch(fetchJobs({ uid }));
    })();
  }, [dispatch, uid]);

  // filter jobs
  let publicJobs;
  let activeJobs;
  let finishedJobs;
  let canceledJobs;
  if (jobs && !isLoading) {
    publicJobs = jobs.filter((job) => job.status === "public");
    activeJobs = jobs.filter((job) => job.status === "active");
    finishedJobs = jobs.filter((job) => job.status === "finished");
    canceledJobs = jobs.filter((job) => job.status === "canceled");
  }

  return (
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
  );
};

export default UserPostedJobs;
