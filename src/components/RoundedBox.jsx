import React from "react";
import { Box, Typography } from "@material-ui/core";

const RoundedBox = ({ children, light = false }) => {
  return (
    <Box
      border={1.5}
      borderColor="textPrimary"
      borderRadius={5}
      p={1}
      m={0.5}
      ml={0}
      minWidth={30}
    >
      {light ? (
        <Typography variant="body1" color="textSecondary">
          {children}
        </Typography>
      ) : (
        <Typography variant="body1" color="textPrimary">
          {children}
        </Typography>
      )}
    </Box>
  );
};

export default RoundedBox;
