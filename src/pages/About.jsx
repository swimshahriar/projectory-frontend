import { Container, Typography } from "@material-ui/core";
import React from "react";
import SiteLayout from "../components/layouts/SiteLayout";

const About = () => (
  <SiteLayout>
    <Container>
      <Typography variant="h1" align="center">
        About Page
      </Typography>
    </Container>
  </SiteLayout>
);

export default About;
