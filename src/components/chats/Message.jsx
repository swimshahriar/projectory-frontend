import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

const Message = ({ me = false, msg, conv, uid }) => (
  <Box my={2}>
    <Box marginLeft={me ? 0 : 1} marginRight={me ? 1 : 0}>
      <Typography variant="subtitle2" align={me ? "right" : "left"}>
        {conv.userName[conv.members.find((u) => (!me ? u !== uid : u === uid))]}
      </Typography>
    </Box>

    <Box
      p={1}
      bgcolor={me ? "primary.main" : "secondary.main"}
      borderRadius={5}
      marginLeft={me ? 0 : 1}
      marginRight={me ? 1 : 0}
      color="#fff"
    >
      <Typography variant="body1" align={me ? "right" : "left"}>
        {msg.text}
      </Typography>
    </Box>
    <Box marginLeft={!me ? 0 : 1} marginRight={!me ? 1 : 0}>
      <Typography variant="subtitle2" color="textSecondary" align={!me ? "right" : "left"}>
        {moment(msg.createdAt).fromNow()}
      </Typography>
    </Box>
  </Box>
);

export default Message;
