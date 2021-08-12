import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
// internal imports
import JobCard from "../components/JobCard";

const Jobs = () => (
  <Container maxWidth="lg">
    <Box mt={5}>
      <Typography variant="h4" align="center">
        Jobs
      </Typography>
    </Box>
    <Box display="flex" flexWrap="wrap">
      <Box mt={5} flex="20%">
        <Typography variant="h6" align="center" color="textPrimary">
          Filters
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          ({0} Jobs)
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
        <Typography variant="body1" align="center">
          No Jobs Found!
        </Typography>
        <JobCard />
      </Box>
    </Box>
  </Container>
);

export default Jobs;
