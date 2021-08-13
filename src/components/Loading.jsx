import { Box, Container, Typography } from "@material-ui/core";
import React from "react";

const Loading = () => (
  <Container maxWidth="lg">
    <Box display="flex" justifyContent="center" alignItems="center" height="90vh" width="100%">
      <Typography variant="h4" color="textSecondary" align="center">
        Loading...
      </Typography>
    </Box>
  </Container>
);

export default Loading;
