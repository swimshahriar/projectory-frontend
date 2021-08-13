import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchJobs } from "../actions/jobAction";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

const Jobs = () => {
  const dispatch = useDispatch();
  const { isLoading, jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    (async () => {
      await dispatch(fetchJobs());
    })();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" align="center">
          Jobs
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" my={3}>
        <Box mt={5} flex="20%">
          <Typography variant="h6" align="center" color="textPrimary">
            Filters
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            ({jobs ? jobs.length : 0} Jobs)
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gridGap={15}
          mt={5}
          flex="80%"
          minWidth="400px"
        >
          {jobs ? (
            jobs.map((job, idx) => <JobCard job={job} key={idx} />)
          ) : (
            <Typography variant="body1" align="center">
              No Jobs Found!
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Jobs;
