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

const Conversations = ({ conv, uid, active, online, onclick }) => {
  const classes = useStyles();
  return (
    <Box
      my={2}
      className={classes.mPointer}
      border={active ? 2 : 0}
      borderColor={active ? "primary.main" : ""}
      borderRadius={active ? 5 : 0}
      onClick={onclick}
    >
      <Paper>
        <Box p={2}>
          <Typography color="textPrimary" variant="h6">
            {conv.userName[conv.members.find((u) => u !== uid)]}
          </Typography>

          <Typography variant="body1">{conv.lastMsg?.slice(0, 20)}...</Typography>
          <Box display="flex" justifyContent="space-between" gridGap={5}>
            {online ? (
              <Typography color="primary" variant="subtitle2">
                online
              </Typography>
            ) : (
              <Typography color="secondary" variant="subtitle2">
                offline
              </Typography>
            )}
            <Typography color="textSecondary" variant="subtitle2">
              {moment(conv.updatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Conversations;
