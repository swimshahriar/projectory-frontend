import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Chats = () => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL);
  }, []);
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
