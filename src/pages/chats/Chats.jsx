import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// internal imports
import Conversations from "../../components/chats/Conversations";

// styles
const useStyles = makeStyles(() => ({
  conversations: {
    overflowY: "scroll !important",
  },
}));

const Chats = () => {
  const classes = useStyles();
  const socket = useRef();
  const { uid } = useSelector((state) => state.auth);

  // -------------------- set socket connection -----------------
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL);
  }, []);

  // -------------------- addUser and getUsers -------------------
  useEffect(() => {
    socket.current.emit("addUser", uid);
    socket.current.on("getUsers", (users) => console.log(users));
  }, [uid]);

  return (
    <Container maxWidth="lg">
      <Box my={3}>
        <Typography variant="h4" align="center">
          Chats
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
        gridGap={10}
        my={3}
      >
        {/* ------------------ inbox ----------------- */}
        <Box
          flex={30}
          height="80vh"
          border={3}
          borderColor="secondary.main"
          borderRadius={5}
          boxShadow={2}
          p={2}
          position="relative"
          className={classes.conversations}
        >
          <Box
            bgcolor="secondary.main"
            color="#fff"
            width="260px"
            minWidth="240"
            py={1}
            borderRadius={5}
            position="fixed"
            zIndex={10}
          >
            <Typography variant="h6" align="center">
              Inbox
            </Typography>
          </Box>

          {/* --------------------- conversations ------------------ */}

          <Box display="flex" flexDirection="column" gridGap={10} mt={8}>
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
          </Box>
        </Box>

        {/* ------------------ messages --------------------- */}
        <Box
          flex={70}
          height="80vh"
          border={3}
          borderColor="primary.main"
          borderRadius={5}
          boxShadow={2}
          p={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minWidth="300px"
        >
          <Box bgcolor="primary.main" color="#fff" py={1} borderRadius={5}>
            <Typography variant="h6" align="center">
              Messages
            </Typography>
          </Box>

          {/* ------------------------ messages ------------------- */}
          <Box>Messages</Box>

          {/* --------------------------- form ---------------------- */}
          <Box display="flex" gridGap={10}>
            <TextField label="enter your message" variant="outlined" fullWidth />
            <Button variant="contained" color="primary" size="large">
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chats;
