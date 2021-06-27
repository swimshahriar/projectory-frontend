import React from "react";
import { Box, Typography } from "@material-ui/core";

const RoundedBox = ({ children }) => {
  return (
    <Box
      border={1.5}
      borderColor="textPrimary"
      borderRadius={5}
      p={0.5}
      m={0.5}
      ml={0}
    >
      <Typography variant="body1">{children}</Typography>
    </Box>
  );
};

export default RoundedBox;
