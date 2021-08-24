import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
// internal imports
import Conversations from "../../components/chats/Conversations";
import Message from "../../components/chats/Message";

// styles
const useStyles = makeStyles(() => ({
  overflowy: {
    overflowY: "scroll ",
  },
}));

const Chats = () => {
  const classes = useStyles();
  const search = new URLSearchParams(useLocation().search);
  const queryCid = search.get("cid");
  const queryRid = search.get("rid");
  const history = useHistory();
  const socket = useRef();
  const scrollRef = useRef();
  const { uid, token } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [formData, setFormData] = useState("");

  // -------------------- set socket connection -----------------
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: new Date(),
      });
    });
  }, []);

  // -------------- set current chat ----------------
  useEffect(() => {
    if (queryCid) {
      const currConv = conversations.find((conv) => conv._id === queryCid);
      setCurrentChat(currConv);
    }
  }, [queryCid, conversations]);

  // ------------------- if reciever id in query -----------------
  useEffect(() => {
    if (queryRid) {
      (async () => {
        try {
          const conversation = await axios.post(
            `${import.meta.env.VITE_API_BASE_URI}/chats/conversations/${queryRid}`,
            {},
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (conversation.data?.cid) {
            history.push(`/chats?cid=${conversation.data.cid}`);
          } else if (conversation.data?.conversations._id) {
            history.push(`/chats?cid=${conversation.data.conversations._id}`);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      })();
    }
  }, [queryRid, token, history, conversations]);

  // ------------------- arrival message ---------------------
  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  // -------------------- addUser and getUsers -------------------
  useEffect(() => {
    socket.current.emit("addUser", uid);
    if (currentChat) {
      socket.current.on("getUsers", (users) => {
        const isUserActive = users.find(
          (user) => user.userId === currentChat.members.find((m) => m !== uid)
        );
        if (isUserActive) {
          setIsActive((prev) => !prev);
        }
      });
    }
  }, [uid, currentChat]);

  // ---------------- messages scroll to view -------------------
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ----------------- fetch conversations ------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URI}/chats/conversations/`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setConversations(res.data.conversations);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token]);

  // -------------------------- fetch messages ---------------------------
  useEffect(() => {
    if (!currentChat) return;
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/chats/${currentChat._id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [token, currentChat]);

  // ------------------ handle submit -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData || !currentChat) return;
    const message = {
      text: formData,
    };

    const receiverId = currentChat.members.find((member) => member !== uid);
    socket.current.emit("sendMessage", {
      senderId: uid,
      receiverId,
      text: formData,
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/chats/${currentChat._id}`,
        message,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, res.data.messages]);
      setFormData("");
    } catch (err) {
      console.log(err);
    }
  };

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
          display="flex"
          flexDirection="column"
        >
          <Box bgcolor="secondary.main" color="#fff" minWidth="240" py={1} borderRadius={5}>
            <Typography variant="h6" align="center">
              Inbox
            </Typography>
          </Box>

          {/* --------------------- conversations ------------------ */}
          <Box gridGap={10} mt={2} className={classes.overflowy}>
            {conversations?.length ? (
              conversations.map((conv) => (
                <Conversations
                  key={conv._id}
                  conv={conv}
                  uid={uid}
                  online={isActive}
                  active={conv._id === queryCid}
                  onclick={() => history.push(`/chats/?cid=${conv._id}`)}
                />
              ))
            ) : (
              <Typography>No conversation found</Typography>
            )}
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
          <Box py={1} mb={1} border={2} borderColor="primary.main" borderRadius={5}>
            {currentChat && (
              <Typography variant="h6" align="center">
                <Typography component="span" color={isActive ? "primary" : "secondary"}>
                  ({isActive ? "online" : "offline"})
                </Typography>{" "}
                {currentChat?.userName[currentChat.members.find((m) => m !== uid)]}
              </Typography>
            )}
          </Box>

          {/* ------------------------ messages ------------------- */}
          <Box flex={1} className={classes.overflowy}>
            {messages?.length ? (
              messages.map((msg, idx) => (
                <div ref={scrollRef} key={idx}>
                  <Message
                    msg={msg}
                    online={isActive}
                    me={msg.senderId === uid}
                    uid={uid}
                    conv={currentChat}
                  />
                </div>
              ))
            ) : (
              <Typography>No Messages found!</Typography>
            )}
          </Box>

          {/* --------------------------- form ---------------------- */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" gridGap={10} mt={1} zIndex={10}>
              <TextField
                label="your message"
                variant="outlined"
                fullWidth
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" size="large">
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Chats;
