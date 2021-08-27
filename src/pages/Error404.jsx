import { Container, Typography } from "@material-ui/core";
import React from "react";
import SiteLayout from "../components/layouts/SiteLayout";

const Error404 = () => (
  <SiteLayout>
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" color="textSecondary" style={{ marginTop: "20%" }}>
        404 - Not Found!{" "}
        <Typography component="span" aria-label="sad" role="img">
          😭
        </Typography>
      </Typography>
    </Container>
  </SiteLayout>
);

export default Error404;
