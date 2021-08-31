import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
// internal imports
import SiteLayout from "../../components/layouts/SiteLayout";

const BuyerProfile = () => {
  const obj = {};
  return (
    <SiteLayout>
      <Container>
        <Box>
          <Typography>Buyer Profile</Typography>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default BuyerProfile;
