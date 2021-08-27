import { Container, Typography } from "@material-ui/core";
import React from "react";
// internal imports
import AdminLayout from "../../components/layouts/AdminLayout";

const Admin = () => {
  const ob = {};
  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Typography>Dashboard</Typography>
      </Container>
    </AdminLayout>
  );
};

export default Admin;
