import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
// internal imports
import AdminLayout from "../../components/layouts/AdminLayout";

const Admin = () => {
  const ob = {};
  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box my={2}>
          <Typography variant="h5" align="center">
            Dashboard
          </Typography>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default Admin;
