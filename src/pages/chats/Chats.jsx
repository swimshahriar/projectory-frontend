import { Box, Container, Typography } from "@material-ui/core";
import React from "react";

const Chats = () => {
  const obj = {};
  return (
    <Container maxWidth="lg">
      <Box my={3}>
        <Typography variant="h4" align="center">
          Chats
        </Typography>
      </Box>
    </Container>
  );
};

export default Chats;
