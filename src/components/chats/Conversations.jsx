import { Box, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

const Conversations = () => {
  const obj = {};
  return (
    <Paper>
      <Box p={2}>
        <Typography color="textPrimary" variant="h6" gutterBottom>
          username
        </Typography>

        <Typography color="textPrimary">last msg...</Typography>
        <Typography color="textSecondary" align="right">
          {moment(moment.now() - Math.random() * 360000).fromNow()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Conversations;
