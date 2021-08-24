import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";

// styles
const useStyles = makeStyles(() => ({
  mPointer: {
    cursor: "pointer",
  },
}));

const Conversations = ({ conv, uid, active, onclick }) => {
  const classes = useStyles();
  return (
    <Box
      my={2}
      className={classes.mPointer}
      border={active && 2}
      borderColor={active && "primary.main"}
      borderRadius={active && 5}
      onClick={onclick}
    >
      <Paper>
        <Box p={2}>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            {conv.userName[conv.members.find((u) => u !== uid)]}
          </Typography>

          <Typography>{conv.lastMsg}</Typography>
          <Typography color="textSecondary" align="right">
            {moment(conv.updatedAt).fromNow()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Conversations;
