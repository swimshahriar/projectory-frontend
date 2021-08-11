import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";

const JobCard = () => (
  <Box minWidth="300px" width="100%">
    <Paper>
      <Box p={2}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="body1">Description</Typography>
        <Typography variant="body1">Category</Typography>
        <Typography variant="body1">Price</Typography>
        <Typography variant="body1">User</Typography>
      </Box>
    </Paper>
  </Box>
);

export default JobCard;
