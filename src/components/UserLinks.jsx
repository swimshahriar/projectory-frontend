import { Box } from "@material-ui/core";
import React from "react";

const UserLinks = ({ children }) => (
  <Box
    mt={3}
    boxShadow={3}
    borderRadius={5}
    p={5}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexWrap="wrap"
    gridGap={10}
  >
    {children}
  </Box>
);

export default UserLinks;
