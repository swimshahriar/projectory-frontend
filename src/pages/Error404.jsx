import React from "react";
import { Container, Typography } from "@material-ui/core";

const Error404 = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        color="textSecondary"
        style={{ marginTop: "20%" }}
      >
        404 - Not Found! 😭
      </Typography>
    </Container>
  );
};

export default Error404;
