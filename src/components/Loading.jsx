import { Box, Container, Typography } from "@material-ui/core";
import React from "react";

const Loading = () => (
  <Container>
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh" width="100vw">
      <Typography variant="h4" color="textSecondary" align="center">
        Loading...
      </Typography>
    </Box>
  </Container>
);

export default Loading;
