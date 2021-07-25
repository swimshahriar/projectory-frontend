import { Container, Typography } from "@material-ui/core";
import React from "react";

const Error404 = () => (
  <Container>
    <Typography variant="h4" align="center" color="textSecondary" style={{ marginTop: "20%" }}>
      404 - Not Found!{" "}
      <Typography component="span" aria-label="sad" role="img">
        😭
      </Typography>
    </Typography>
  </Container>
);

export default Error404;
