import { Container, Typography } from "@material-ui/core";
import React from "react";
// internal import
import SiteLayout from "../components/layouts/SiteLayout";

const Home = () => (
  <SiteLayout>
    <Container>
      <Typography variant="h1" align="center">
        Home Page
      </Typography>
    </Container>
  </SiteLayout>
);

export default Home;
